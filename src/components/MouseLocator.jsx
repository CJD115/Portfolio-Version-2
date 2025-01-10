import { useState, useEffect, useRef } from 'react';

// Custom hook for mouse position tracking
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const prevMousePosition = useRef({ x: 0, y: 0 });
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newMousePosition = { x: e.clientX, y: e.clientY };
            const deltaX = newMousePosition.x - prevMousePosition.current.x;
            const deltaY = newMousePosition.y - prevMousePosition.current.y;
            const newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            setMousePosition(newMousePosition);
            setAngle(newAngle);
            prevMousePosition.current = newMousePosition;
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return { mousePosition, angle };
};

// Custom hook for scroll position tracking
const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition({ x: window.scrollX, y: window.scrollY });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initialize on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
};

// Main MouseLocator component
const MouseLocator = () => {
    const { mousePosition } = useMousePosition();
    const scrollPosition = useScrollPosition();

    return (
        <div
            className="absolute w-8 h-8 border border-blue-400 rounded-full pointer-events-none z-50 flex items-center justify-center transition-transform duration-75"
            style={{
                left: mousePosition.x + scrollPosition.x,
                top: mousePosition.y + scrollPosition.y,
                transform: 'translate(-50%, -50%)',
            }}
        >
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        </div>
    );
};

export default MouseLocator;
