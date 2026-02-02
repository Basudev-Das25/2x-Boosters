import { useEffect, useRef } from 'react';
import gsap from "gsap";

const MagneticButton = ({ children, className = "", href, onClick, strength = 0.5 }) => {
    const btnRef = useRef(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btn.removeEventListener("mousemove", handleMouseMove);
            btn.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    if (href) {
        return (
            <a ref={btnRef} href={href} className={className} style={{ display: 'inline-block', textDecoration: 'none' }}>
                <span style={{ position: 'relative', zIndex: 2, display: 'block' }}>{children}</span>
            </a>
        );
    }

    return (
        <button ref={btnRef} className={className} onClick={onClick} style={{ display: 'inline-block', border: 'none', background: 'transparent' }}>
            <span style={{ position: 'relative', zIndex: 2, display: 'block' }}>{children}</span>
        </button>
    );
};

export default MagneticButton;
