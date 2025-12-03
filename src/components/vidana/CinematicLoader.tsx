import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

interface CinematicLoaderProps {
    onComplete: () => void;
}

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<SVGCircleElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulate loading
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Non-linear progress for realism
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                }
            });

            // 1. Fade out counter and ring
            tl.to([counterRef.current, ringRef.current], {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "power2.in"
            })
                // 2. Animate Logo to Nav position (FLIP will be handled in parent/Nav, 
                // but here we just prepare the exit or animate the container out)
                // Actually, for the "cinematic transition", we want the background to reveal the hero.

                // Let's animate the container clip-path to reveal the hero underneath
                .to(containerRef.current, {
                    clipPath: "circle(0% at 50% 50%)", // Shrink to center? Or expand? 
                    // User asked for: "Scale down + fade out into the top-left corner" OR "clip-path reveal"
                    // Let's do the "Scale down + fade out into top-left" for the logo, 
                    // and fade out the background.

                    // Actually, let's fade out the background while keeping the logo visible for the FLIP
                    backgroundColor: "transparent",
                    duration: 0.8,
                    ease: "power2.inOut"
                }, "-=0.2");

            // The actual FLIP of the logo needs to happen in the parent context where both 
            // the loader logo and nav logo exist. 
            // For now, we'll just signal completion and let the parent handle the FLIP 
            // or we can animate this logo to the top-left coordinates blindly if we know them.
            // A safer bet for "cinematic" feel without complex FLIP state sharing is:
            // Animate this logo to top-left, then swap.

            const isMobile = window.innerWidth < 768;
            const targetX = isMobile ? 24 : 48; // approx padding-left
            const targetY = isMobile ? 24 : 40; // approx padding-top

            tl.to(logoRef.current, {
                top: targetY,
                left: targetX,
                xPercent: 0,
                yPercent: 0,
                scale: 0.4, // Scale down to nav size
                transformOrigin: "top left",
                duration: 1,
                ease: "power4.inOut"
            }, "<");

        }
    }, [progress, onComplete]);

    // Update ring dashoffset
    useEffect(() => {
        if (ringRef.current) {
            const circumference = 2 * Math.PI * 45; // r=45
            const offset = circumference - (progress / 100) * circumference;
            gsap.to(ringRef.current, {
                strokeDashoffset: offset,
                duration: 0.3,
                ease: "power1.out"
            });
        }
    }, [progress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        >
            {/* Background Layer - Handles the reveal animation */}
            <div
                className="loader-bg absolute inset-0 bg-background z-0"
                style={{ clipPath: "circle(150% at 50% 50%)" }}
            >
                <div className="absolute inset-0 bg-secondary/30" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">

                {/* Rotating Ring */}
                <svg className="w-64 h-64 absolute -rotate-90" viewBox="0 0 100 100">
                    <circle
                        className="text-white/10"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    <circle
                        ref={ringRef}
                        className="text-accent drop-shadow-[0_0_10px_rgba(244,67,54,0.5)]"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45}`}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Logo */}
                <div
                    ref={logoRef}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                    <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-primary">
                        VIDANA
                    </h1>
                </div>

                {/* Counter */}
                <div
                    ref={counterRef}
                    className="absolute top-full mt-12 text-sm font-bold uppercase tracking-widest text-accent"
                >
                    {Math.floor(progress)}%
                </div>
            </div>
        </div>
    );
};
