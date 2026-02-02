import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Reveal = ({ children, className = "", delay = 0, y = 30, blur = true }) => {
    const elRef = useRef(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        gsap.fromTo(el,
            {
                y: y,
                opacity: 0,
                filter: blur ? 'blur(10px)' : 'none'
            },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                ease: "power3.out",
                delay: delay,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, [delay, y, blur]);

    return (
        <div ref={elRef} className={className} style={{ willChange: 'opacity, transform' }}>
            {children}
        </div>
    );
};

export default Reveal;
