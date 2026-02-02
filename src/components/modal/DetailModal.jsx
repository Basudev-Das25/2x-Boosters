import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./DetailModal.css";
import CloudinaryVideo from "../common/CloudinaryVideo";

const DetailModal = ({ isOpen, onClose, data }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const videoRef = useRef(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Reset state when data changes or opens
    useEffect(() => {
        if (isOpen) {
            setVideoEnded(false);
            setIsLoading(true);

            // Handle both traditional videoSrc and Cloudinary cloudinaryId
            const hasVideo = !!(data?.videoSrc || data?.cloudinaryId);

            if (hasVideo && videoRef.current) {
                const video = videoRef.current;
                video.currentTime = 0;

                const handleCanPlay = () => {
                    setIsLoading(false);
                    video.play().catch(() => {
                        // playback failed
                    });
                };

                // Check if already ready
                if (video.readyState >= 3) {
                    handleCanPlay();
                } else {
                    video.addEventListener('canplay', handleCanPlay);
                    video.addEventListener('loadeddata', handleCanPlay);
                }

                return () => {
                    video.removeEventListener('canplay', handleCanPlay);
                    video.removeEventListener('loadeddata', handleCanPlay);
                }
            } else if (!hasVideo) {
                setIsLoading(false);
            }
        }
    }, [isOpen, data]);

    // Entrance / Exit Animations
    useEffect(() => {
        if (!modalRef.current) return;

        if (isOpen) {
            const ctx = gsap.context(() => {
                // Overlay fade in
                gsap.fromTo(
                    modalRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.4, ease: "power2.out" }
                );

                // Content scale in
                gsap.fromTo(
                    ".modal-container",
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" }
                );
            }, modalRef);
            return () => ctx.revert();
        } else {
            // Exit animation
            gsap.to(modalRef.current, { opacity: 0, duration: 0.3 });
        }
    }, [isOpen]);

    // Cinematic Flow: Video Ends -> Blur -> Text
    const handleVideoEnd = () => {
        setVideoEnded(true);

        // Animate the blur overlay appearance
        gsap.to(".modal-glass-layer", {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        });

        // Stagger text in
        gsap.fromTo(
            ".modal-info > *",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3 }
        );
    };

    if (!isOpen || !data) return null;

    const isVideo = !!(data.videoSrc || data.cloudinaryId);

    return (
        <div className="modal-backdrop" ref={modalRef} onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
                data-cinematic={isVideo}
            >
                {/* CLOSE BUTTON */}
                <button className="modal-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* MEDIA LAYER */}
                <div className="modal-media">
                    {data.cloudinaryId ? (
                        <CloudinaryVideo
                            publicId={data.cloudinaryId}
                            videoRef={videoRef}
                            className="modal-video"
                            onEnded={handleVideoEnd}
                        />
                    ) : data.videoSrc ? (
                        <video
                            ref={videoRef}
                            src={data.videoSrc}
                            className="modal-video"
                            muted
                            playsInline
                            preload="auto"
                            onEnded={handleVideoEnd}
                        />
                    ) : (
                        <div className="modal-image" style={{ backgroundImage: `url(${data.imageSrc})` }} />
                    )}
                </div>

                {/* GLASS LAYER (Appears after video or immediately if no video) */}
                <div className={`modal-glass-layer ${!isVideo ? 'visible' : ''}`}>
                    <div className="modal-info">
                        <h2>{data.name}</h2>
                        <p className="modal-role">{data.role}</p>

                        <div className="modal-divider" />

                        <div className="modal-details">
                            {data.stats && Object.entries(data.stats).map(([key, value]) => (
                                <div key={key} className="stat-item">
                                    <span className="stat-label">{key}</span>
                                    <span className="stat-value">{value}</span>
                                </div>
                            ))}

                            {data.bio && <p className="modal-bio">{data.bio}</p>}
                        </div>

                        <div className="modal-actions">
                            <button className="modal-cta">View Profile</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailModal;
