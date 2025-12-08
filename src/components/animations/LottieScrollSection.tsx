import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LottieScrollSectionProps {
    animationPath: string;
    clipPathAnimation?: 'polygon' | 'circle' | 'hexagon' | 'inset' | 'ellipse' | 'diagonal';
    scrollDistance?: number;
    className?: string;
    title?: string;
    subtitle?: string;
    autoplay?: boolean;
    loop?: boolean;
}

export const LottieScrollSection: React.FC<LottieScrollSectionProps> = ({
    animationPath,
    clipPathAnimation = 'hexagon',
    scrollDistance = 2000,
    className = '',
    title,
    subtitle,
    autoplay = true,
    loop = true
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const lottieRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        const lottie = lottieRef.current;

        if (!container || !content || !lottie) return;

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
                        from: 'polygon(0 100%, 0 100%, 0 100%, 0 100%)',
                        to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    };
                default:
                    return {
                        from: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
                        to: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
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

            // Clip path animation
            tl.fromTo(
                lottie,
                {
                    clipPath: clipPaths.from,
                    scale: 0.8,
                    opacity: 0
                },
                {
                    clipPath: clipPaths.to,
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                }
            );

            // Additional scale and rotation animation
            tl.to(
                lottie,
                {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.5,
                    ease: 'power1.inOut'
                },
                '-=0.3'
            );

            tl.to(
                lottie,
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: 'power1.inOut'
                }
            );
        }, container);

        return () => ctx.revert();
    }, [clipPathAnimation, scrollDistance]);

    return (
        <section ref={containerRef} className={`relative ${className}`}>
            <div ref={contentRef} className="min-h-screen flex items-center justify-center bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        {(title || subtitle) && (
                            <div className="space-y-6 z-10">
                                {title && (
                                    <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                                        {title}
                                    </h2>
                                )}
                                {subtitle && (
                                    <p className="text-xl text-white/60 leading-relaxed">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Lottie Animation */}
                        <div
                            ref={lottieRef}
                            className="relative w-full aspect-square max-w-2xl mx-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-full blur-3xl opacity-50" />
                            <DotLottieReact
                                src={animationPath}
                                loop={loop}
                                autoplay={autoplay}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
