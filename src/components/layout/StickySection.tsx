import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StickySectionProps {
    children: React.ReactNode;
    className?: string;
    zIndex?: number;
    overlayOpacity?: number;
}


export const StickySection: React.FC<StickySectionProps> = ({
    children,
    className = "",
    zIndex = 1,
    overlayOpacity = 0.5
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) return;

        const ctx = gsap.context(() => {
            // Zoom out effect as the next section comes in
            // REMOVED opacity fade to keep content visible
            gsap.to(content, {
                scale: 0.95, // More subtle scale
                borderRadius: "40px", // Consistent "clip path space" look
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`relative min-h-screen w-full ${className}`}
            style={{ zIndex }}
        >
            <div
                ref={contentRef}
                className="relative w-full h-full min-h-screen bg-background will-change-transform shadow-2xl"
            >
                {children}
            </div>
        </div>
    );
};
