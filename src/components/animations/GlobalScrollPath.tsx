import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GlobalScrollPath = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const path = pathRef.current;
        const svg = svgRef.current;

        if (!path || !svg) return;

        // Set initial path length
        const length = path.getTotalLength();
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0.3
        });

        // Animate path drawing based on total scroll height
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
            }
        });

    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay">
            <svg
                ref={svgRef}
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    ref={pathRef}
                    d="M50,0 C60,10 40,20 50,30 S60,50 50,60 S40,80 50,100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.2"
                    className="text-accent"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
};
