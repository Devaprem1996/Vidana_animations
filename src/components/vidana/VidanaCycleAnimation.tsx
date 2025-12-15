import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VidanaCycleAnimationProps {
    className?: string;
}

export const VidanaCycleAnimation: React.FC<VidanaCycleAnimationProps> = ({ className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const characterRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !characterRef.current || !textRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center', // Animation starts when top of container hits center of viewport
                end: 'bottom center',
                toggleActions: 'play none none reverse', // Replays on scroll up, simple trigger
                // markers: true, // Remove in production
            }
        });

        // Initial state
        gsap.set(characterRef.current, { x: '-100vw', opacity: 0 });
        gsap.set(textRef.current, { opacity: 0, y: 20 });

        // Animation Sequence
        tl.to(characterRef.current, {
            x: '0%', // Center
            opacity: 1,
            duration: 2,
            ease: 'power2.out',
        })
            .to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
            }, '-=1') // Overlap with character arrival
            .to({}, { duration: 2 }) // Pause for 2 seconds
            .to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5
            })
            .to(characterRef.current, {
                x: '100vw', // Move to right
                opacity: 0,
                duration: 2,
                ease: 'power2.in',
            });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className={`relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-background ${className}`}>

            {/* Text Overlay */}
            <div ref={textRef} className="absolute top-1/4 left-0 w-full text-center z-10 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight">
                    Keep Moving Forward
                </h2>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground font-light tracking-widest uppercase">
                    Innovation never stops
                </p>
            </div>

            {/* Character Container */}
            <div ref={characterRef} className="relative w-[300px] md:w-[500px] h-[300px] md:h-[500px]">
                <DotLottieReact
                    src="/assets/vidana cyl.json"
                    loop
                    autoplay
                    className="w-full h-full"
                />
            </div>

            {/* Background Decor (Optional cinematic touch) */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none z-20" />

        </div>
    );
};
