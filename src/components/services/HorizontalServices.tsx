import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: '01',
        title: 'Brand Identity',
        desc: 'Crafting visual languages that speak louder than words.',
        tags: ['Strategy', 'Logo', 'System']
    },
    {
        id: '02',
        title: 'UI/UX Design',
        desc: 'Designing intuitive interfaces for complex problems.',
        tags: ['Research', 'Wireframe', 'Prototype']
    },
    {
        id: '03',
        title: 'Development',
        desc: 'Building robust, scalable, and performant applications.',
        tags: ['Frontend', 'Backend', 'DevOps']
    },
    {
        id: '04',
        title: 'Motion',
        desc: 'Adding life and character through fluid animation.',
        tags: ['2D', '3D', 'Interaction']
    }
];

export const HorizontalServices = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const trigger = triggerRef.current;

            if (section && trigger) {
                const scrollWidth = section.scrollWidth - window.innerWidth;

                // Main horizontal scroll
                gsap.to(section, {
                    x: -scrollWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: trigger,
                        start: "top top",
                        end: `+=${scrollWidth + 1000}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    }
                });

                // Individual card parallax effects
                const cards = section.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    // Subtle vertical movement for each card
                    gsap.to(card, {
                        y: index % 2 === 0 ? -30 : 30,
                        scrollTrigger: {
                            trigger: trigger,
                            start: "top top",
                            end: `+=${scrollWidth + 1000}`,
                            scrub: 2,
                        }
                    });

                    // Scale effect on scroll
                    gsap.fromTo(card,
                        { scale: 0.9, opacity: 0.5 },
                        {
                            scale: 1,
                            opacity: 1,
                            scrollTrigger: {
                                trigger: trigger,
                                start: "top top",
                                end: `+=${scrollWidth / cards.length * (index + 1)}`,
                                scrub: 1,
                            }
                        }
                    );
                });
            }
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={triggerRef} className="overflow-hidden bg-zinc-950">
            <div ref={sectionRef} className="flex h-screen items-center px-20 w-fit gap-20">
                <div className="flex-shrink-0 w-[400px] text-white">
                    <h2 className="text-6xl font-display font-bold leading-tight">
                        OUR<br />SERVICES
                    </h2>
                    <p className="mt-6 text-white/60 text-lg">
                        Swipe to explore how we can help you grow.
                    </p>
                </div>

                {SERVICES.map((service, index) => (
                    <div
                        key={service.id}
                        className="service-card flex-shrink-0 w-[600px] h-[70vh] bg-zinc-900 border border-white/10 rounded-[3rem] p-12 flex flex-col justify-between group hover:bg-zinc-800 hover:border-accent/50 transition-all duration-500"
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-6xl font-display font-bold text-white/20 group-hover:text-accent transition-colors duration-500">
                                {service.id}
                            </span>
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                                <ArrowUpRight className="w-8 h-8 text-white group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-5xl font-display font-bold text-white mb-6 group-hover:translate-x-2 transition-transform duration-300">
                                {service.title}
                            </h3>
                            <p className="text-xl text-white/60 mb-8 group-hover:text-white/80 transition-colors duration-300">
                                {service.desc}
                            </p>
                            <div className="flex gap-3">
                                {service.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/40 uppercase tracking-wider group-hover:border-accent/50 group-hover:text-accent transition-all duration-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex-shrink-0 w-[200px]" /> {/* Spacer */}
            </div>
        </div>
    );
};
