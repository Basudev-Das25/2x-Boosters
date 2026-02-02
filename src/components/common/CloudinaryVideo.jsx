import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";

// Initialize Cloudinary with your cloud name
const cld = new Cloudinary({
    cloud: {
        cloudName: "dun5g7rad",
    },
});

const CloudinaryVideo = ({ publicId, className, onEnded, videoRef, autoPlay = true, loop = false, muted = true, playsInline = true }) => {
    // Create a video instance
    const myVideo = cld.video(publicId);

    // Apply optimizations
    myVideo.delivery(quality("auto")).delivery(format("auto"));

    return (
        <AdvancedVideo
            cldVid={myVideo}
            innerRef={videoRef}
            className={className}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            onEnded={onEnded}
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
    );
};

export default CloudinaryVideo;
