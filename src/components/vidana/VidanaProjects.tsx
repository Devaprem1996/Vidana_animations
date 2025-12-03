import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: 1,
        category: "Architecture",
        title: "Urban Heights",
        year: "2024",
        tags: ["Design", "Sustainability", "Future"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        description: "Redefining vertical living with sustainable ecosystems."
    },
    {
        id: 2,
        category: "Tech Innovation",
        title: "Quantum Leap",
        year: "2024",
        tags: ["AI", "Processing", "Data"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        description: "Next-generation processing power for the AI era."
    },
    {
        id: 3,
        category: "Brand Identity",
        title: "Neon Pulse",
        year: "2023",
        tags: ["Visual", "Motion", "Identity"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        description: "A vibrant identity system for the digital nightlife."
    },
    {
        id: 4,
        category: "Digital Art",
        title: "Ether Void",
        year: "2023",
        tags: ["3D", "WebGL", "Interactive"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        description: "Immersive digital landscapes exploring the unknown."
    }
];

export const VidanaProjects = () => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const totalProjects = PROJECTS.length;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top top",
                end: `+=${totalProjects * 100}%`,
                scrub: 0.5,
                pin: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const index = Math.min(
                        Math.floor(progress * totalProjects),
                        totalProjects - 1
                    );
                    setActiveIndex(index);
                }
            }
        });

        // Custom cursor movement
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <section ref={triggerRef} className="bg-black text-white relative overflow-hidden cursor-none">
            {/* Futuristic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

                {/* Animated Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Custom Cursor */}
            <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="absolute inset-0 border border-white rounded-full scale-150 opacity-50 animate-ping" />
            </div>

            <div className="h-screen w-full flex items-center justify-center relative z-10">
                <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center relative">

                    {/* Left Side: Text Content */}
                    <div className="w-full md:w-1/2 z-20 flex flex-col justify-center h-full relative pointer-events-none">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.id}
                                className={`absolute top-1/2 -translate-y-1/2 left-0 w-full transition-all duration-1000 ease-out ${index === activeIndex
                                        ? "opacity-100 translate-x-0 blur-0"
                                        : "opacity-0 translate-x-10 blur-md"
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-6 overflow-hidden">
                                    <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] relative">
                                        <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
                                        {project.category}
                                    </span>
                                    <span className="h-[1px] w-12 bg-white/20" />
                                    <span className="text-white/40 font-mono text-sm">{project.year}</span>
                                </div>

                                <h2 className="text-[clamp(3rem,7vw,6rem)] font-display font-black leading-[0.9] mb-8 mix-blend-difference">
                                    {project.title.split('').map((char, i) => (
                                        <span key={i} className="inline-block hover:text-accent transition-colors duration-300">
                                            {char === ' ' ? '\u00A0' : char}
                                        </span>
                                    ))}
                                </h2>

                                <p className="text-xl text-white/60 max-w-md mb-8 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-3 mb-12">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full text-xs uppercase tracking-wider hover:bg-white/10 hover:border-accent/50 transition-all duration-300"
                                            style={{ transitionDelay: `${i * 50}ms` }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest pointer-events-auto">
                                    <span className="relative">
                                        View Project
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-500" />
                                    </span>
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Visual Content */}
                    <div className="w-full md:w-1/2 h-[50vh] md:h-[75vh] relative mt-8 md:mt-0 perspective-1000">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.id}
                                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${index === activeIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-3"
                                    }`}
                                style={{
                                    zIndex: index === activeIndex ? 10 : 0,
                                    clipPath: index === activeIndex
                                        ? "inset(0 0 0 0)"
                                        : "inset(0 0 100% 0)"
                                }}
                            >
                                <div className="w-full h-full relative group overflow-hidden rounded-2xl border border-white/10">
                                    {/* Glitch Overlay Effect */}
                                    <div className="absolute inset-0 bg-accent/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out filter grayscale group-hover:grayscale-0"
                                    />

                                    {/* Floating UI Elements on Image */}
                                    <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <div className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                            <Maximize2 className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20 font-mono text-xs">
                                            ID: {String(project.id).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-12 left-6 md:left-0 flex flex-col gap-4">
                        <div className="text-xs font-mono text-white/40 mb-2">0{activeIndex + 1} / 0{PROJECTS.length}</div>
                        <div className="flex gap-2">
                            {PROJECTS.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1 rounded-full transition-all duration-500 ${index === activeIndex ? "w-16 bg-accent" : "w-4 bg-white/20"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
