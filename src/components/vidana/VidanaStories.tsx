import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import ColorBends from './ColorBends';
import { StoryCard } from './StoryCard';

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
    {
        client: "Global Manufacturing Corp",
        result: "40%",
        resultLabel: "Efficiency Increase",
        category: "Transformation",
        description: "Complete digital overhaul of legacy systems leading to unprecedented operational efficiency.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        client: "Retail Innovation Ltd",
        result: "300%",
        resultLabel: "Traffic Growth",
        category: "E-commerce",
        description: "Strategic platform migration and UX redesign that revolutionized the customer journey.",
        color: "from-purple-500 to-pink-400"
    },
    {
        client: "Healthcare Systems Inc",
        result: "70%",
        resultLabel: "Automation",
        category: "AI & BI",
        description: "Implementation of intelligent workflows reducing manual processing time significantly.",
        color: "from-amber-400 to-orange-500"
    },
    {
        client: "FinTech Solutions",
        result: "2M+",
        resultLabel: "Daily Users",
        category: "Scale",
        description: "Architecture modernization to support massive scale and real-time transaction processing.",
        color: "from-emerald-400 to-teal-500"
    },
    {
        client: "EcoEnergy Future",
        result: "99.9%",
        resultLabel: "Uptime",
        category: "Infrastructure",
        description: "Cloud-native migration ensuring high availability for critical energy systems.",
        color: "from-indigo-500 to-blue-600"
    }
];

export const VidanaStories = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [activeStory, setActiveStory] = useState(0);

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
                onUpdate: (self) => {
                    // Calculate active story based on scroll progress
                    const progress = self.progress;
                    const totalStories = STORIES.length;
                    const currentIndex = Math.min(
                        Math.floor(progress * totalStories),
                        totalStories - 1
                    );
                    setActiveStory(currentIndex);
                }
            }
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section className="bg-black text-white overflow-hidden relative">
            {/* Infinite Animated Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <ColorBends
                    className="absolute inset-0"
                    colors={["#000000", "#1a1a1a", "#000000"]}
                    rotation={45}
                    speed={0.2}
                    scale={1.5}
                    frequency={1.0}
                    warpStrength={0.8}
                    mouseInfluence={0.5}
                    parallax={0.3}
                    noise={0.1}
                    transparent
                />
            </div>

            {/* Wrapper that gets pinned */}
            <div ref={triggerRef} className="h-screen w-full overflow-hidden flex items-center relative z-10">

                {/* Horizontal Container */}
                <div ref={sectionRef} className="flex flex-nowrap h-full items-center">

                    {/* Intro Card - Full Screen */}
                    <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-center items-center relative z-20 snap-center">
                        <div className="relative text-center max-w-4xl px-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-8 text-accent">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                Success Stories
                            </span>

                            <h2 className="text-[clamp(4rem,10vw,10rem)] font-display font-black leading-[0.9] mb-8 mix-blend-difference">
                                Proven<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Results</span>
                            </h2>
                            <div className="flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest text-white/40">
                                <div className="w-12 h-px bg-white/20"></div>
                                <span>Scroll to explore</span>
                                <ArrowRight className="w-4 h-4 animate-bounce-x" />
                            </div>
                        </div>
                    </div>

                    {/* Story Cards */}
                    {STORIES.map((story, index) => (
                        <StoryCard
                            key={index}
                            {...story}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
