import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VideoShowcase = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const videoContainer = videoContainerRef.current;
            const video = videoRef.current;
            const title = titleRef.current;

            if (!section || !videoContainer || !video || !title) return;

            // Create timeline for the video expansion
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // Animate video container from small to full viewport width
            tl.fromTo(videoContainer,
                {
                    width: "60%",
                    height: "60vh",
                    borderRadius: "2rem",
                },
                {
                    width: "100vw",
                    height: "100vh",
                    borderRadius: "0rem",
                    ease: "power2.inOut",
                },
                0
            );

            // Fade out title as video expands
            tl.to(title,
                {
                    opacity: 0,
                    y: -100,
                    ease: "power2.out",
                },
                0
            );

            // Add subtle zoom to video
            tl.fromTo(video,
                {
                    scale: 1.2,
                },
                {
                    scale: 1,
                    ease: "power2.inOut",
                },
                0
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="relative h-[200vh] bg-black"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Title overlay */}
                <div
                    ref={titleRef}
                    className="absolute z-20 text-center pointer-events-none"
                >
                    <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-4">
                        IMMERSIVE
                    </h2>
                    <h2 className="text-6xl md:text-8xl font-display font-black text-white">
                        REALITY
                    </h2>
                    <p className="mt-6 text-xl text-white/60 uppercase tracking-wider">
                        Scroll to Experience
                    </p>
                </div>

                {/* Video container */}
                <div
                    ref={videoContainerRef}
                    className="relative overflow-hidden shadow-2xl"
                    style={{
                        width: "60%",
                        height: "60vh",
                        borderRadius: "2rem",
                    }}
                >
                    <video
                        ref={videoRef}
                        src="https://www.pexels.com/download/video/30125806/"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        style={{
                            transform: "scale(1.2)",
                        }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};
