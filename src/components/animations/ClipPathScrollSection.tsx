import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClipPathScrollSectionProps {
    children: ReactNode;
    clipPathAnimation: 'polygon' | 'circle' | 'hexagon' | 'inset' | 'ellipse' | 'diagonal' | 'corners' | 'angle';
    scrollDistance?: number;
    className?: string;
}

export const ClipPathScrollSection: React.FC<ClipPathScrollSectionProps> = ({
    children,
    clipPathAnimation,
    scrollDistance = 2000,
    className = ''
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const getClipPathValues = () => {
            switch (clipPathAnimation) {
                case 'polygon':
                    return {
                        from: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                        to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    };
                case 'circle':
                    return {
                        from: 'circle(0% at 50% 50%)',
                        to: 'circle(150% at 50% 50%)'
                    };
                case 'hexagon':
                    return {
                        from: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
                        to: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    };
                case 'inset':
                    return {
                        from: 'inset(100% 0 0 0)',
                        to: 'inset(0 0 0 0)'
                    };
                case 'ellipse':
                    return {
                        from: 'ellipse(0% 0% at 50% 50%)',
                        to: 'ellipse(100% 100% at 50% 50%)'
                    };
                case 'diagonal':
                    return {
                        from: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                        to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    };
                case 'corners':
                    return {
                        from: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                        to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    };
                case 'angle':
                    return {
                        from: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                        to: 'polygon(0 5%, 100% 0, 100% 100%, 0 100%)'
                    };
                default:
                    return {
                        from: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                        to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    };
            }
        };

        const clipPaths = getClipPathValues();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: `+=${scrollDistance}`,
                    scrub: 1,
                    pin: content,
                    anticipatePin: 1
                }
            });

            tl.fromTo(
                content,
                {
                    clipPath: clipPaths.from
                },
                {
                    clipPath: clipPaths.to,
                    duration: 1,
                    ease: 'power2.out'
                }
            );
        }, container);

        return () => ctx.revert();
    }, [clipPathAnimation, scrollDistance]);

    return (
        <section ref={containerRef} className={`relative ${className}`}>
            <div ref={contentRef}>
                {children}
            </div>
        </section>
    );
};
