import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';
import { ParallaxLayer, BackgroundParallax, MidgroundParallax } from '@/components/animations/ParallaxLayer';
import { CINEMATIC_EASE, ZOOM_CONFIG } from '@/utils/ParallaxConfig';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        const shapes = shapesRef.current;
        const bg = bgRef.current;

        if (!container || !content || !shapes || !bg) return;

        const ctx = gsap.context(() => {
            // Mouse Move Parallax (subtle)
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5);
                const yPos = (clientY / window.innerHeight - 0.5);

                gsap.to(bg, {
                    x: xPos * 20,
                    y: yPos * 20,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                gsap.to(shapes, {
                    x: xPos * 40,
                    y: yPos * 40,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                gsap.to(content, {
                    x: xPos * 15,
                    y: yPos * 15,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            // Entrance Animation
            const tl = gsap.timeline({ delay: 0.5 });

            tl.from(".hero-text-stagger", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.12,
                ease: CINEMATIC_EASE.dramatic
            });

            // Scroll-based Zoom Out Effect
            gsap.fromTo(container,
                { scale: ZOOM_CONFIG.zoomOut.from },
                {
                    scale: ZOOM_CONFIG.zoomOut.to,
                    ease: CINEMATIC_EASE.smooth,
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    }
                }
            );

            // Fade out hero as we scroll
            gsap.to(container, {
                opacity: 0.3,
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Background gradient shift
            gsap.to(bg, {
                backgroundPosition: "50% 100%",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center px-6 pt-24 overflow-hidden parallax-container"
            style={{ transformOrigin: 'center center' }}
        >
            {/* Parallax Layer 1: Background - Slowest */}
            <BackgroundParallax className="absolute inset-0 -z-20">
                <div
                    ref={bgRef}
                    className="hero-bg absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-background scale-110"
                    style={{ backgroundSize: '200% 200%', backgroundPosition: '50% 0%' }}
                />
            </BackgroundParallax>

            {/* Parallax Layer 2: Abstract Shapes - Medium Speed */}
            <MidgroundParallax className="absolute inset-0 -z-10 pointer-events-none">
                <div ref={shapesRef} className="w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                </div>
            </MidgroundParallax>

            {/* Parallax Layer 3: Content - Faster */}
            <ParallaxLayer speed={0.8} className="container mx-auto w-full">
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div className="max-w-2xl">
                        <h1 className="hero-text-stagger text-[clamp(3.5rem,8vw,7rem)] font-display font-black leading-[0.9] tracking-tighter mb-8">
                            VIDANA<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">DIGITAL</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">SHIFT</span>
                        </h1>

                        <p className="hero-text-stagger text-xl md:text-2xl text-gray-600 mb-12 max-w-lg leading-relaxed">
                            We craft immersive digital experiences that blur the line between interface and reality.
                        </p>

                        <div className="hero-text-stagger flex flex-wrap gap-6">
                            <button className="group relative px-8 py-4 bg-black text-white rounded-full overflow-hidden transition-transform hover:scale-105">
                                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <span className="relative z-10 font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                                    Start Project <ArrowRight size={16} />
                                </span>
                            </button>

                            <button className="group px-8 py-4 border border-black/10 rounded-full hover:bg-black/5 transition-colors flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                                    <Play size={12} fill="currentColor" />
                                </div>
                                <span className="font-bold tracking-widest uppercase text-sm">Showreel</span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Space for future 3D element */}
                    <div className="hidden lg:block" />
                </div>
            </ParallaxLayer>
        </section>
    );
};
