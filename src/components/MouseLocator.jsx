import React, { useState, useEffect, useRef } from 'react';

const MouseLocator = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        const updateScrollPosition = () => {
            setScrollPosition({
                x: window.scrollX,
                y: window.scrollY,
            });
        };

        // Add event listeners for mousemove and scroll when component mounts
        document.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('scroll', updateScrollPosition);

        // Initial scroll position
        updateScrollPosition();

        // Clean up: Remove event listeners when component unmounts
        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('scroll', updateScrollPosition);
        };
    }, []);

    return (
        <div
            className="absolute w-8 h-8 border border-blue-400 rounded-full pointer-events-none z-50 flex items-center justify-center transition-transform duration-75"
            // adjusts outer circle position
            style={{
                left: mousePosition.x + scrollPosition.x - 0,
                top: mousePosition.y + scrollPosition.y - 0,
                boxSizing: 'border-box',
                transform: `translate(-50%, -50%)`,
            }}
        >
            <div
                className="w-1.5 h-1.5 bg-blue-400 rounded-full transition-transform duration-75"
            ></div>
        </div>
    );
};

export default MouseLocator;