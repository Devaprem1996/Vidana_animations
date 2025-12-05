import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/animations/SplitText';

gsap.registerPlugin(ScrollTrigger);

export const ServicesHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Video parallax with scale and opacity
            gsap.to(videoRef.current, {
                scale: 1.8,
                opacity: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

            // Text parallax - move up faster than scroll
            gsap.to(textRef.current, {
                y: -200,
                opacity: 0,
                scale: 0.8,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Subtitle parallax - slower movement
            gsap.to(subtitleRef.current, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0 z-0 opacity-40">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://cdn.coverr.co/videos/coverr-abstract-digital-tunnel-4504/1080p.mp4" type="video/mp4" />
                </video>
            </div>

            <div ref={textRef} className="relative z-10 text-center px-6">
                <h1 className="text-[clamp(4rem,15vw,12rem)] font-display font-black leading-[0.8] text-white mix-blend-difference">
                    <SplitText type="chars" animation="fadeInUp" staggerDelay={0.02}>
                        DIGITAL
                    </SplitText>
                    <br />
                    <SplitText type="chars" animation="fadeInUp" staggerDelay={0.02} delay={0.2}>
                        ALCHEMY
                    </SplitText>
                </h1>
                <p ref={subtitleRef} className="mt-8 text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">
                    We transmute ideas into digital gold through design and code.
                </p>
            </div>
        </div>
    );
};
