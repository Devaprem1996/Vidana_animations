import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { BackgroundParallax, MidgroundParallax, ParallaxLayer } from '@/components/animations/ParallaxLayer';
import { CINEMATIC_EASE } from '@/utils/ParallaxConfig';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        title: "Business Process Consulting",
        description: "Analyzing and optimizing core operations for maximum efficiency.",
        number: "01"
    },
    {
        title: "360° Transformation",
        description: "End-to-end re-engineering using RPA and AI technologies.",
        number: "02"
    },
    {
        title: "Innovative Consulting",
        description: "Expert guidance on emerging tech: AI, ML, and Blockchain.",
        number: "03"
    },
    {
        title: "Talent Investment",
        description: "Building robust talent pipelines aligned with business objectives.",
        number: "04"
    }
];

export const VidanaServices = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const circle = circleRef.current;
        const content = contentRef.current;
        const list = listRef.current;

        if (!section || !circle || !content || !list) return;

        const ctx = gsap.context(() => {
            // 1. Circular Reveal + Rotation Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "top top",
                    scrub: 1,
                }
            });

            tl.fromTo(circle,
                { scale: 0, opacity: 0, rotation: -180 },
                { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: CINEMATIC_EASE.dramatic }
            );

            // 2. Content Fade In
            gsap.fromTo(content,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: CINEMATIC_EASE.smooth,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "top top-=100",
                        scrub: 1,
                    }
                }
            );

            // 3. Service Items Stagger
            const items = list.children;
            gsap.fromTo(items,
                { y: 100, opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                {
                    y: 0,
                    opacity: 1,
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    stagger: 0.2,
                    duration: 1,
                    ease: CINEMATIC_EASE.smooth,
                    scrollTrigger: {
                        trigger: list,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1
                    }
                }
            );

            // 4. Parallax on items (alternating directions)
            Array.from(items).forEach((item, index) => {
                gsap.to(item, {
                    y: -30 * (index % 2 === 0 ? 1 : -1),
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });
            });

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen py-32 px-6 bg-black text-white overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            {/* Enhanced Circular Reveal with Glowing Dots */}
            <div
                ref={circleRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[800px] md:h-[800px] pointer-events-none"
            >
                {/* Purple Circle - Outer */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-white/5"
                    style={{ boxShadow: '0 0 80px rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.05)' }}
                    animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            '0 0 80px rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.05)',
                            '0 0 140px rgba(255,255,255,0.2), inset 0 0 60px rgba(255,255,255,0.1)',
                            '0 0 80px rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.05)'
                        ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Green Circle */}
                <motion.div
                    className="absolute inset-[12%] rounded-full bg-white/10"
                    style={{ boxShadow: '0 0 60px rgba(255,255,255,0.15), inset 0 0 30px rgba(255,255,255,0.1)' }}
                    animate={{
                        scale: [1, 1.08, 1],
                        boxShadow: [
                            '0 0 60px rgba(255,255,255,0.15), inset 0 0 30px rgba(255,255,255,0.1)',
                            '0 0 120px rgba(255,255,255,0.25), inset 0 0 50px rgba(255,255,255,0.15)',
                            '0 0 60px rgba(255,255,255,0.15), inset 0 0 30px rgba(255,255,255,0.1)'
                        ]
                    }}
                    transition={{ duration: 1.3, repeat: Infinity, delay: 0.2 }}
                />

                {/* Blue Circle */}
                <motion.div
                    className="absolute inset-[28%] rounded-full bg-white/15"
                    style={{ boxShadow: '0 0 50px rgba(255,255,255,0.2), inset 0 0 25px rgba(255,255,255,0.15)' }}
                    animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                            '0 0 50px rgba(255,255,255,0.2), inset 0 0 25px rgba(255,255,255,0.15)',
                            '0 0 100px rgba(255,255,255,0.3), inset 0 0 45px rgba(255,255,255,0.2)',
                            '0 0 50px rgba(255,255,255,0.2), inset 0 0 25px rgba(255,255,255,0.15)'
                        ]
                    }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: 0.4 }}
                />

                {/* Yellow Circle */}
                <motion.div
                    className="absolute inset-[42%] rounded-full bg-white/20"
                    style={{ boxShadow: '0 0 40px rgba(255,255,255,0.25), inset 0 0 20px rgba(255,255,255,0.2)' }}
                    animate={{
                        scale: [1, 1.12, 1],
                        boxShadow: [
                            '0 0 40px rgba(255,255,255,0.25), inset 0 0 20px rgba(255,255,255,0.2)',
                            '0 0 90px rgba(255,255,255,0.35), inset 0 0 40px rgba(255,255,255,0.3)',
                            '0 0 40px rgba(255,255,255,0.25), inset 0 0 20px rgba(255,255,255,0.2)'
                        ]
                    }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0.6 }}
                />

                {/* Center Dark Circle */}
                <div className="absolute inset-[56%] rounded-full bg-gray-900/90 shadow-[0_0_30px_rgba(0,0,0,0.9)]" />

                {/* Orbiting Dots - Purple Ring */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`purple-${i}`}
                        className="absolute w-3 h-3 bg-white rounded-full"
                        style={{
                            top: 'calc(50% - 6px)',
                            left: 'calc(50% - 6px)',
                            boxShadow: '0 0 12px rgba(255,255,255,0.8)',
                            transformOrigin: '6px 6px'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: (i / 8) * 6 }}
                    >
                        <div style={{ position: 'absolute', width: '400px', height: '1px', left: '6px', top: '6px' }} />
                    </motion.div>
                ))}

                {/* Orbiting Dots - Blue Ring */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`blue-${i}`}
                        className="absolute w-2.5 h-2.5 bg-white rounded-full"
                        style={{
                            top: 'calc(50% - 5px)',
                            left: 'calc(50% - 5px)',
                            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                            transformOrigin: '5px 5px'
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: (i / 6) * 4.5 }}
                    >
                        <div style={{ position: 'absolute', width: '280px', height: '1px', left: '5px', top: '5px' }} />
                    </motion.div>
                ))}

                {/* Orbiting Dots - Yellow Ring */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`yellow-${i}`}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                            top: 'calc(50% - 4px)',
                            left: 'calc(50% - 4px)',
                            boxShadow: '0 0 8px rgba(255,255,255,0.8)',
                            transformOrigin: '4px 4px'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: (i / 4) * 3 }}
                    >
                        <div style={{ position: 'absolute', width: '170px', height: '1px', left: '4px', top: '4px' }} />
                    </motion.div>
                ))}
            </div>

            <div ref={contentRef} className="container mx-auto relative z-10">
                {/* Header */}
                <div className="mb-24 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-8 text-accent"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        (02) — What We Do
                    </motion.span>
                    <h2 className="text-[clamp(3rem,8vw,7rem)] font-display font-black leading-none mb-6">
                        OUR<br />EXPERTISE
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Transforming businesses through innovative technology solutions
                    </p>
                </div>

                {/* Services List */}
                <div ref={listRef} className="max-w-6xl mx-auto space-y-0">
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className="service-item group relative border-t border-white/10 last:border-b"
                        >
                            <div className="relative py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative text-8xl md:text-9xl font-black text-white/5 group-hover:text-accent/10 transition-colors duration-500">
                                    {service.number}
                                </div>

                                <div className="relative flex-1">
                                    <h3 className="text-3xl md:text-5xl font-display font-bold mb-3 group-hover:translate-x-4 transition-transform duration-500">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg text-white/60 max-w-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="relative opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500">
                                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                                        <ArrowUpRight className="w-8 h-8" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent to-blue-500 group-hover:w-full transition-all duration-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Particles */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </section>
    );
};
