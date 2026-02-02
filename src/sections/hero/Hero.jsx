import './Hero.css';
import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import MagneticButton from '../../components/common/MagneticButton';
import CloudinaryVideo from '../../components/common/CloudinaryVideo';

const Hero = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const lightRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!lightRef.current) return;
            const { clientX, clientY } = e;
            gsap.to(lightRef.current, {
                x: clientX,
                y: clientY,
                duration: 1.5,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

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

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section id="hero" className="hero" ref={sectionRef}>
            <div ref={lightRef} className="hero-light-follow" />

            {/* VIDEO BACKGROUND */}
            <CloudinaryVideo
                publicId="hero-launch_m46mas"
                className="hero-video"
                loop={true}
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