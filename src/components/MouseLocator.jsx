import React, { useState, useEffect } from 'react';

const MouseLocator = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
    const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            const newMousePosition = {
                x: e.clientX,
                y: e.clientY,
            };

            // Calculate direction
            const newDirection = {
                x: newMousePosition.x - previousMousePosition.x,
                y: newMousePosition.y - previousMousePosition.y,
            };

            setMousePosition(newMousePosition);
            setDirection(newDirection);
            setPreviousMousePosition(newMousePosition);
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
    }, [previousMousePosition]);

    // Calculate offset for the inner circle
    const innerCircleOffset = 1.5; // Adjust this value to control the movement sensitivity
    const innerCirclePosition = {
        x: direction.x > 0 ? innerCircleOffset : direction.x < 0 ? -innerCircleOffset : 0,
        y: direction.y > 0 ? innerCircleOffset : direction.y < 0 ? -innerCircleOffset : 0,
    };

    return (
        <div
            className="absolute w-8 h-8 border border-blue-400 rounded-full pointer-events-none z-50 flex items-center justify-center"

            // adjusts outer circle position
            style={{
                left: mousePosition.x + scrollPosition.x - 15,
                top: mousePosition.y + scrollPosition.y - 15,
                boxSizing: 'border-box',
            }}
        >
            <div
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                style={{
                    transform: `translate(${innerCirclePosition.x}px, ${innerCirclePosition.y}px)`,
                }}
            ></div>
        </div>
    );
};

export default MouseLocator;
