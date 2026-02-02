import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cursor.css';

const Cursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', moveCursor);

        // Hover effects
        const handleHover = () => gsap.to(cursor, { scale: 3, opacity: 0.5, mixBlendMode: 'difference' });
        const handleLeave = () => gsap.to(cursor, { scale: 1, opacity: 1, mixBlendMode: 'normal' });

        const hoverElements = document.querySelectorAll('a, button, .team-card, .creator-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleLeave);
        });

        // Mutation observer to handle dynamically added elements if needed, 
        // but for now simple global listener might be too heavy, simpler to re-query or use delegation.
        // Delegation approach:
        const handleDelegateHover = (e) => {
            if (e.target.closest('a, button, .team-card, .creator-card')) {
                handleHover();
            }
        };
        const handleDelegateLeave = (e) => {
            if (e.target.closest('a, button, .team-card, .creator-card')) {
                handleLeave();
            }
        };

        // Using delegation for simplicity on dynamic content
        document.addEventListener('mouseover', handleDelegateHover);
        document.addEventListener('mouseout', handleDelegateLeave);


        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleDelegateHover);
            document.removeEventListener('mouseout', handleDelegateLeave);
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor" />;
};

export default Cursor;
