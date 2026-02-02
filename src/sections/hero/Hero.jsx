import './Hero.css';
import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MagneticButton = ({ children, className, href }) => {
    const btnRef = useRef(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btn.removeEventListener("mousemove", handleMouseMove);
            btn.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <a ref={btnRef} href={href} className={className}>
            <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
        </a>
    );
};

const Hero = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance
            const tl = gsap.timeline();
            tl.fromTo(titleRef.current,
                { y: 100, opacity: 0, rotateX: -20 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power4.out", delay: 0.2 }
            )
                .fromTo(subtitleRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
                    "-=0.8"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" className="hero" ref={sectionRef}>

            {/* VIDEO BACKGROUND */}
            <video
                src="/videos/hero-launch.mp4"
                className='hero-video'
                autoPlay
                muted
                loop
                playsInline
            />

            {/* AURA EFFECTS */}
            <div className="hero-aura aura-1" />
            <div className="hero-aura aura-2" />

            {/* Glass overlay   */}
            <div className="hero-overlay" />

            {/* Content */}
            <div className="hero-content">
                <h1 ref={titleRef} className="hero-title" data-text="2X Boosters">2X Boosters</h1>
                <p ref={subtitleRef} className="hero-subtitle">
                    Professional Players | Elite Creators | Competitive Legacy
                </p>

                <MagneticButton className="hero-cta" href="#team">
                    Meet The Team
                </MagneticButton>
            </div>
        </section>
    )
};

export default Hero;