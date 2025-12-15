import React, { useRef, useEffect } from 'react';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VidanaCTA = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        const heading = headingRef.current;

        if (!section || !content || !heading) return;

        const ctx = gsap.context(() => {
            gsap.from(heading, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            });

            gsap.from(".cta-btn-stagger", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32 bg-black text-white overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div ref={contentRef} className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-12 text-accent">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Start Your Journey
                    </div>

                    <h2 ref={headingRef} className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] mb-12 mix-blend-difference">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Transform</span><br />
                        Your Digital Presence?
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="cta-btn-stagger group relative px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform duration-300">
                            <span className="relative z-10 flex items-center gap-3">
                                Start a Project <ArrowRight className="w-4 h-4" />
                            </span>
                            <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                        </button>

                        <button className="cta-btn-stagger group px-8 py-4 border border-white/20 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center gap-3 backdrop-blur-md">
                            <Mail className="w-4 h-4" />
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
