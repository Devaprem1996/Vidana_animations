import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp, Activity, Zap, Globe, Layers } from 'lucide-react';
import ColorBends from './ColorBends';

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
    {
        client: "Global Manufacturing Corp",
        result: "40%",
        resultLabel: "Efficiency Increase",
        category: "Transformation",
        description: "Complete digital overhaul of legacy systems leading to unprecedented operational efficiency.",
        icon: Activity,
        color: "from-blue-500 to-cyan-400"
    },
    {
        client: "Retail Innovation Ltd",
        result: "300%",
        resultLabel: "Traffic Growth",
        category: "E-commerce",
        description: "Strategic platform migration and UX redesign that revolutionized the customer journey.",
        icon: TrendingUp,
        color: "from-purple-500 to-pink-400"
    },
    {
        client: "Healthcare Systems Inc",
        result: "70%",
        resultLabel: "Automation",
        category: "AI & BI",
        description: "Implementation of intelligent workflows reducing manual processing time significantly.",
        icon: Zap,
        color: "from-amber-400 to-orange-500"
    },
    {
        client: "FinTech Solutions",
        result: "2M+",
        resultLabel: "Daily Users",
        category: "Scale",
        description: "Architecture modernization to support massive scale and real-time transaction processing.",
        icon: Globe,
        color: "from-emerald-400 to-teal-500"
    },
    {
        client: "EcoEnergy Future",
        result: "99.9%",
        resultLabel: "Uptime",
        category: "Infrastructure",
        description: "Cloud-native migration ensuring high availability for critical energy systems.",
        icon: Layers,
        color: "from-indigo-500 to-blue-600"
    }
];

export const VidanaStories = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        // Horizontal Scroll Animation
        const scrollTween = gsap.to(section, {
            x: () => -(section.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: trigger,
                start: "top top",
                end: () => `+=${section.scrollWidth - window.innerWidth}`,
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            }
        });

        // Parallax effect for cards
        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            gsap.to(card, {
                y: i % 2 === 0 ? 50 : -50,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                }
            });
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section className="bg-black text-white overflow-hidden relative">
            {/* Infinite Animated Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <ColorBends
                    className="absolute inset-0"
                    colors={["#ffffff", "#ffffff", "#ffffff"]}
                    rotation={30}
                    speed={0.3}
                    scale={1.2}
                    frequency={1.4}
                    warpStrength={1.2}
                    mouseInfluence={0.8}
                    parallax={0.6}
                    noise={0.08}
                    transparent
                />

            </div>

            {/* Wrapper that gets pinned */}
            <div ref={triggerRef} className="h-screen w-full overflow-hidden flex items-center relative z-10">

                {/* Horizontal Container */}
                <div ref={sectionRef} className="flex flex-nowrap h-full items-center pl-[10vw]">

                    {/* Intro Section */}
                    <div className="w-[80vw] md:w-[40vw] flex-shrink-0 pr-24 flex flex-col justify-center h-full relative z-20">
                        <div className="absolute -left-[10vw] top-0 bottom-0 w-[50vw] bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />

                        <div className="relative">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-8 text-accent">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                Records
                            </span>

                            <h2 className="text-[clamp(3rem,6vw,7rem)] font-display font-black leading-[0.9] mb-8 mix-blend-difference">
                                Proven<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Results</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-white/60 max-w-md leading-relaxed mb-12">
                                We deliver measurable impact through strategic innovation and technical excellence.
                            </p>

                            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white/40">
                                <div className="w-12 h-px bg-white/20"></div>
                                <span>Scroll to explore</span>
                                <ArrowRight className="w-4 h-4 animate-bounce-x" />
                            </div>
                        </div>
                    </div>

                    {/* Case Study Cards */}
                    {STORIES.map((story, index) => {
                        const Icon = story.icon;
                        return (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className="w-[85vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0 pr-12 md:pr-24 flex flex-col justify-center h-full"
                            >
                                <div className="group relative p-10 md:p-14 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/10">
                                    {/* Gradient Glow */}
                                    <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${story.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`} />

                                    <div className="flex flex-col h-full justify-between gap-12">
                                        <div>
                                            <div className="flex justify-between items-start mb-8">
                                                <span className="text-xs font-bold uppercase tracking-widest opacity-40 font-mono">
                                                    {String(index + 1).padStart(2, '0')} — {story.category}
                                                </span>
                                                <div className={`p-3 rounded-xl bg-gradient-to-br ${story.color} bg-opacity-10`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>

                                            <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
                                                {story.client}
                                            </h3>

                                            <p className="text-lg text-white/50 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                                                {story.description}
                                            </p>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute -left-14 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 to-transparent" />
                                            <div className="text-sm font-bold uppercase tracking-widest mb-2 opacity-40">Result</div>
                                            <div className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${story.color}`}>
                                                {story.result}
                                            </div>
                                            <div className="text-lg font-medium text-white/60 mt-2">
                                                {story.resultLabel}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* End Spacer */}
                    <div className="w-[20vw] flex-shrink-0"></div>
                </div>
            </div>
        </section>
    );
};
