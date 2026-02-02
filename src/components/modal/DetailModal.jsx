import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./DetailModal.css";

const DetailModal = ({ isOpen, onClose, data }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const videoRef = useRef(null);
    const [videoEnded, setVideoEnded] = useState(false);

    // Reset state when data changes or opens
    useEffect(() => {
        if (isOpen) {
            setVideoEnded(false);
            // If there's a video, play it
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
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
            // Exit animation handled locally or just fade out by unmounting if managed by parent
            // but good to have nice exit
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

    return (
        <div className="modal-backdrop" ref={modalRef} onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
                data-cinematic={!!data.videoSrc}
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
                    {data.videoSrc ? (
                        <video
                            ref={videoRef}
                            src={data.videoSrc}
                            className="modal-video"
                            muted
                            playsInline
                            onEnded={handleVideoEnd}
                        />
                    ) : (
                        <div className="modal-image" style={{ backgroundImage: `url(${data.imageSrc})` }} />
                    )}
                </div>

                {/* GLASS LAYER (Appears after video or immediately if no video) */}
                <div className={`modal-glass-layer ${!data.videoSrc ? 'visible' : ''}`}>
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
