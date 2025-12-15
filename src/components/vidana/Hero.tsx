
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        const title = titleRef.current;

        if (!container || !content) return;

        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline({ delay: 0.2 });

            tl.from(".hero-text-stagger", {
                y: 100,
                filter: "blur(20px)",
                opacity: 0,
                duration: 1.5,
                stagger: 0.15,
                ease: "power4.out"
            });

            // Button entrance - slightly delayed
            tl.from(".hero-btn-stagger", {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.5");

            // Scroll-based Parallax & Fade
            gsap.to(content, {
                y: -150, // Move up as we scroll down
                opacity: 0,
                filter: "blur(10px)",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Title spread effect on scroll
            if (title) {
                gsap.to(title, {
                    letterSpacing: "0.1em",
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden"
        >
            <WebGLShader />

            {/* Content Container */}
            <div ref={contentRef} className="container mx-auto w-full relative z-10 flex flex-col items-center justify-center text-center">
                <h1 ref={titleRef} className="hero-text-stagger text-[clamp(3.5rem,10vw,9rem)] font-display font-black leading-[0.9] tracking-tighter mb-8 text-white mix-blend-difference">
                    VIDANA<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/40">DIGITAL</span><br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/40">SHIFT</span>
                </h1>

                <p className="hero-text-stagger text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed mix-blend-difference font-light tracking-wide">
                    We craft immersive digital experiences that blur the line between interface and reality.
                </p>

                <div className="flex flex-wrap gap-6 items-center justify-center hero-btn-stagger">
                    <button
                        onClick={() => setIsVideoOpen(true)}
                        className="hero-btn-stagger group px-10 py-5 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-3 text-white backdrop-blur-md uppercase tracking-widest font-bold text-sm"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                            <Play size={12} fill="currentColor" />
                        </div>
                        <span>Showreel</span>
                    </button>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="w-full h-full flex items-center justify-center text-white/50">
                                {/* Placeholder for actual video implementation */}
                                <div className="text-center">
                                    <Play size={64} className="mx-auto mb-4 opacity-50" />
                                    <p>Video Placeholder</p>
                                    <p className="text-sm mt-2">Source will be provided later</p>
                                </div>
                                {/* <video src="/path/to/video.mp4" controls autoPlay className="w-full h-full object-cover" /> */}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

