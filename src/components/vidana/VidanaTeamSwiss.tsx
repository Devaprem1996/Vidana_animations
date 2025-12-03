import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TEAM = [
    {
        id: 1,
        name: "P.Mohana Sankar",
        role: "CEO & Founder",
        image: "public/images/P. Mohana Sankar.jpeg",
        initial: "P",
        description: "Visionary leader driving the future of AI integration and strategic business transformation.",
        socials: { linkedin: "#", twitter: "#" }
    },
    {
        id: 2,
        name: "Sekaran Ramalingam",
        role: "CAIO",
        image: "public/images/Sekaran Ramalingam.jpeg",
        initial: "S",
        description: "Pioneering artificial intelligence architectures that redefine industry standards.",
        socials: { linkedin: "#", github: "#" }
    },
    {
        id: 3,
        name: "Tharini",
        role: "AI Strategy Lead",
        image: "public/images/person-3.png",
        initial: "T",
        description: "Crafting data-driven strategies that bridge the gap between technology and business goals.",
        socials: { linkedin: "#" }
    },
    {
        id: 4,
        name: "Rajasri",
        role: "AI Architect",
        image: "public/images/person-6.png",
        initial: "R",
        description: "Designing robust and scalable AI systems for complex enterprise environments.",
        socials: { linkedin: "#", github: "#" }
    },
    {
        id: 5,
        name: "Devaprem",
        role: "Gen AI Specialist",
        image: "public/images/Devaprem.png",
        initial: "D",
        description: "Pushing the boundaries of generative AI to create novel and impactful solutions.",
        socials: { linkedin: "#", twitter: "#" }
    },
];

export const VidanaTeamSwiss = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // Mouse movement effect for background and cursor
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !cursorRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Parallax background effect
            const moveX = (clientX - innerWidth / 2) * 0.05;
            const moveY = (clientY - innerHeight / 2) * 0.05;

            gsap.to(".parallax-bg", {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: "power2.out"
            });

            // Custom cursor
            gsap.to(cursorRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % TEAM.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + TEAM.length) % TEAM.length);
    };

    const activeMember = TEAM[activeIndex];

    return (
        <section ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden cursor-none selection:bg-accent selection:text-black">

            {/* Custom Cursor */}
            <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="absolute inset-0 border border-white rounded-full scale-150 opacity-50 animate-ping" />
            </div>

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                {/* Animated Gradient Mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] opacity-90" />

                {/* Floating Orbs */}
                <div className="parallax-bg absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="parallax-bg absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />

                {/* Digital Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                {/* Infinite Marquee Background */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
                    <div className="whitespace-nowrap animate-marquee-slow text-[20vw] font-black font-display leading-none text-white">
                        VIDANA TEAM VIDANA TEAM VIDANA TEAM
                    </div>
                </div>
            </div>

            <div className="container mx-auto h-full relative z-10 px-6 py-24 flex flex-col justify-center min-h-screen">

                {/* Header */}
                <div className="flex justify-between items-end mb-16 md:mb-24 border-b border-white/10 pb-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-accent mb-4"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span className="text-sm font-bold uppercase tracking-widest">The Minds Behind</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-display font-black leading-none">
                            OUR TEAM
                        </h2>
                    </div>

                    <div className="hidden md:flex gap-4">
                        <button onClick={handlePrev} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                            <ArrowRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button onClick={handleNext} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Image & Visuals */}
                    <div className="lg:col-span-5 relative group perspective-1000">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                initial={{ opacity: 0, rotateY: 90 * direction, x: 50 * direction }}
                                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                                exit={{ opacity: 0, rotateY: -90 * direction, x: -50 * direction }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="relative aspect-[3/4] w-full max-w-md mx-auto"
                            >
                                {/* Glitch Effect Layers */}
                                <div className="absolute inset-0 bg-accent/20 translate-x-2 translate-y-2 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-blue-500/20 -translate-x-2 -translate-y-2 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Main Image Container */}
                                <div className="relative w-full h-full overflow-hidden rounded-sm border border-white/10 bg-gray-900">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                    <img
                                        src={activeMember.image}
                                        alt={activeMember.name}
                                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />

                                    {/* Overlay Info */}
                                    <div className="absolute bottom-6 left-6 z-20">
                                        <div className="text-8xl font-display font-black text-white/10 absolute -top-20 -left-4 select-none">
                                            {activeMember.initial}
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Socials */}
                                <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                                    {Object.entries(activeMember.socials).map(([platform, link], i) => (
                                        <motion.a
                                            key={platform}
                                            href={link}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 + (i * 0.1) }}
                                            className="w-10 h-10 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300"
                                        >
                                            {platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                                            {platform === 'twitter' && <Twitter className="w-4 h-4" />}
                                            {platform === 'github' && <Github className="w-4 h-4" />}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Content & Details */}
                    <div className="lg:col-span-7 pl-0 lg:pl-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                                        {activeMember.role}
                                    </span>
                                    <span className="h-px w-12 bg-white/20" />
                                    <span className="text-white/40 font-mono text-sm">0{activeIndex + 1} / 0{TEAM.length}</span>
                                </div>

                                <h3 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                                    {activeMember.name}
                                </h3>

                                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mb-12 border-l-2 border-accent/50 pl-6">
                                    "{activeMember.description}"
                                </p>

                                {/* Skills / Tags (Mock data for visual richness) */}
                                <div className="flex flex-wrap gap-3">
                                    {["Strategy", "Leadership", "Innovation"].map((tag, i) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors cursor-default"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile Navigation */}
                        <div className="flex md:hidden gap-4 mt-12">
                            <button onClick={handlePrev} className="flex-1 py-4 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors">
                                <ArrowRight className="w-6 h-6 rotate-180" />
                            </button>
                            <button onClick={handleNext} className="flex-1 py-4 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors">
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
