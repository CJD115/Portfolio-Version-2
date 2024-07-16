import React from 'react';

const HighlightedSVG = () => {
    return (
        <div className="relative inline-block">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src="/coding.svg"
                />
            </div>
            <div className="absolute inset-0 border-4 border-yellow-500 pointer-events-none"></div>
        </div>
    );
};

export default HighlightedSVG;