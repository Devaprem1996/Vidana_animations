import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const card = cardRef.current;

        if (!container || !card) return;

        // Mouse Move Parallax
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5);
            const yPos = (clientY / window.innerHeight - 0.5);

            // Use gsap.to with overwrite: 'auto' for smoother updates
            gsap.to(".hero-bg", {
                x: xPos * 30,
                y: yPos * 30,
                duration: 1.5,
                ease: "power2.out",
                overwrite: "auto"
            });

            gsap.to(shapesRef.current, {
                x: xPos * 50,
                y: yPos * 50,
                duration: 1.5,
                ease: "power2.out",
                overwrite: "auto"
            });

            gsap.to(card, {
                x: xPos * 80,
                y: yPos * 80,
                rotationY: xPos * 15,
                rotationX: -yPos * 15,
                duration: 1.5,
                ease: "power2.out",
                overwrite: "auto"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Entrance Animation (triggered by parent or on mount)
        // We'll assume the parent handles the "isLoading" state removal, 
        // so this mounts when loader is done.
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from(".hero-text-stagger", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        })
            .from(card, {
                scale: 0.9,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.8");

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            tl.kill();
        };
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center px-6 pt-24 overflow-hidden perspective-1000">
            {/* Parallax Layer 1: Background */}
            <div className="hero-bg absolute inset-0 -z-20 bg-gradient-to-br from-background via-secondary/10 to-background scale-110" />

            {/* Parallax Layer 2: Abstract Shapes */}
            <div ref={shapesRef} className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Content */}
                <div ref={contentRef} className="max-w-2xl">
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

                {/* Right: 3D Mockup */}


            </div>
        </section>
    );
};
