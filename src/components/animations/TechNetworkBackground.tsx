import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TechNetworkBackground = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const circles = svgRef.current.querySelectorAll('.node');
        const paths = svgRef.current.querySelectorAll('.connection');

        // Pulse animation for nodes (continuous)
        circles.forEach((circle, i) => {
            gsap.to(circle, {
                r: '+=3', // Pulse size
                opacity: 1,
                duration: 1.5 + Math.random(),
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: i * 0.2
            });
        });

        // Draw lines on scroll
        gsap.set(paths, { strokeDasharray: 2000, strokeDashoffset: 2000 });

        gsap.to(paths, {
            strokeDashoffset: 0,
            duration: 2,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: svgRef.current,
                start: "top 80%", // Start animating when top of SVG hits 80% viewport
                end: "bottom 20%",
                scrub: 1 // Smooth scrubbing
            }
        });

    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                        <stop offset="50%" stopColor="rgba(147, 51, 234, 0.5)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Connections (drawn first to be behind nodes) */}
                <g stroke="url(#line-gradient)" strokeWidth="1.5" fill="none" className="connections">
                    {/* Complex network paths */}
                    <path className="connection" d="M100,100 Q400,50 600,200 T1100,150" />
                    <path className="connection" d="M100,100 L200,400 L500,500 L800,300" />
                    <path className="connection" d="M600,200 L500,500 L900,600 L1100,150" />
                    <path className="connection" d="M200,400 Q400,700 700,650 T1100,700" />
                    <path className="connection" d="M50,300 L200,400" />
                    <path className="connection" d="M1150,400 L900,600" />
                    <path className="connection" d="M300,50 L600,200 L900,50" />
                    <path className="connection" d="M800,300 L900,600" />
                </g>

                {/* Nodes */}
                <g fill="#fff" filter="url(#glow)">
                    <circle cx="100" cy="100" r="4" className="node" opacity="0.6" />
                    <circle cx="600" cy="200" r="6" className="node" opacity="0.6" />
                    <circle cx="1100" cy="150" r="4" className="node" opacity="0.6" />
                    <circle cx="200" cy="400" r="5" className="node" opacity="0.6" />
                    <circle cx="500" cy="500" r="7" className="node" opacity="0.6" />
                    <circle cx="800" cy="300" r="5" className="node" opacity="0.6" />
                    <circle cx="900" cy="600" r="6" className="node" opacity="0.6" />
                    <circle cx="1100" cy="700" r="4" className="node" opacity="0.6" />
                    <circle cx="700" cy="650" r="4" className="node" opacity="0.6" />
                    <circle cx="50" cy="300" r="3" className="node" opacity="0.6" />
                    <circle cx="1150" cy="400" r="3" className="node" opacity="0.6" />
                    <circle cx="300" cy="50" r="3" className="node" opacity="0.6" />
                    <circle cx="900" cy="50" r="3" className="node" opacity="0.6" />
                </g>
            </svg>
        </div>
    );
};
