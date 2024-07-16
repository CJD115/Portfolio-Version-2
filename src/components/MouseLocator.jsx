import React, { useState, useEffect } from 'react';

const MouseLocator = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Function to update mouse position in state
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.pageX, y: e.pageY });
        };

        // Add event listener for mousemove when component mounts
        document.addEventListener('mousemove', updateMousePosition);

        // Clean up: Remove event listener when component unmounts
        return () => document.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <div
            className="absolute w-7 h-7 border-2 border-blue-400 rounded-full pointer-events-none z-50"
            style={{
                left: mousePosition.x - 12, // Center horizontally: Adjusted to account for half of the total width (7px width + 2px border on each side = 11px total)
                top: mousePosition.y - 6,  // Center vertically: Adjusted to account for half of the total height (7px height + 2px border on each side = 11px total)
                boxSizing: 'border-box', // Ensure that border width is included in element's total width and height
            }}
        ></div>
    );
};

export default MouseLocator;
