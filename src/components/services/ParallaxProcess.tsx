import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        title: "Discovery",
        desc: "We dive deep into your business to understand your goals and challenges.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Strategy",
        desc: "We build a roadmap that aligns with your vision and market needs.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Execution",
        desc: "We bring the strategy to life with pixel-perfect design and code.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
    }
];

export const ParallaxProcess = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.process-section');

            sections.forEach((section: any) => {
                const img = section.querySelector('.process-img');
                const text = section.querySelector('.process-text');
                const number = section.querySelector('.process-number');

                // Image parallax with zoom
                gsap.fromTo(img,
                    { y: -150, scale: 1.3 },
                    {
                        y: 150,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5
                        }
                    }
                );

                // Text fade and slide in
                gsap.fromTo(text,
                    { opacity: 0, x: -100 },
                    {
                        opacity: 1,
                        x: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 40%",
                            scrub: 1
                        }
                    }
                );

                // Number scale animation
                gsap.fromTo(number,
                    { scale: 0.5, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 50%",
                            scrub: 1
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-black py-32 px-6">
            <div className="container mx-auto mb-32 text-center">
                <h2 className="text-[clamp(3rem,8vw,6rem)] font-display font-black text-white mb-8">
                    THE PROCESS
                </h2>
            </div>

            <div className="space-y-32">
                {STEPS.map((step, index) => (
                    <div key={index} className={`process-section flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
                        <div className="w-full md:w-1/2 h-[60vh] overflow-hidden rounded-[2rem] relative">
                            <img
                                src={step.image}
                                alt={step.title}
                                className="process-img w-full h-[120%] object-cover absolute top-[-10%]"
                            />
                        </div>
                        <div className="process-text w-full md:w-1/2 text-white">
                            <span className="process-number text-accent font-bold text-xl mb-4 block">0{index + 1}</span>
                            <h3 className="text-5xl md:text-7xl font-display font-bold mb-6">{step.title}</h3>
                            <p className="text-xl text-white/60 leading-relaxed max-w-lg">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
