import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Sparkles, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        id: 1,
        company: "WORLDSENSING",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
        stat: "25%",
        statLabel: "growth year-over-year",
        quote: "Vidana has allowed us to expand our workforce into the critical locations we needed to drive business growth.",
        author: "Giuseppe Marrone",
        role: "People Operations Lead",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
        color: "from-purple-900/90 to-black"
    },
    {
        id: 2,
        company: "TECHFLOW",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
        stat: "3x",
        statLabel: "faster deployment",
        quote: "The seamless integration and design system accelerated our product launch significantly.",
        author: "Sarah Chen",
        role: "CTO",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
        color: "from-blue-900/90 to-black"
    },
    {
        id: 3,
        company: "NEXUS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
        stat: "40%",
        statLabel: "increase in retention",
        quote: "Our user engagement metrics skyrocketed after implementing the new interface designs.",
        author: "Michael Ross",
        role: "Product Director",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
        color: "from-emerald-900/90 to-black"
    },
    {
        id: 4,
        company: "AURA",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
        stat: "10k+",
        statLabel: "new active users",
        quote: "The cinematic experience created a viral loop that we hadn't anticipated.",
        author: "Emily Watson",
        role: "CMO",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2790&auto=format&fit=crop",
        color: "from-rose-900/90 to-black"
    },
    {
        id: 5,
        company: "STRATUM",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
        stat: "99.9%",
        statLabel: "uptime reliability",
        quote: "Robust architecture meets stunning visuals. A rare combination in today's market.",
        author: "David Kim",
        role: "VP of Engineering",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop",
        color: "from-amber-900/90 to-black"
    }
];

const REVIEWS = [
    {
        text: "We switched from Deel and haven't looked back since! As regular users, we've found the platform to be perfect for our EOR needs.",
        author: "Verified User in Computer Software"
    },
    {
        text: "Having switched from a small, partner-dependant provider, Vidana just feels so easy – they understand the local labour laws.",
        author: "Verified User in Computer Software"
    },
    {
        text: "The platform's automation features save a significant amount of time and reduce the likelihood of errors. Customer support is responsive.",
        author: "Verified User in Computer Games"
    },
    {
        text: "Incredible attention to detail and a design philosophy that truly elevates our brand perception.",
        author: "Verified User in FinTech"
    },
    {
        text: "The best agency we've worked with. They delivered on time and exceeded all expectations.",
        author: "Verified User in Healthcare"
    }
];

export const VidanaTestimonials = () => {
    const [activeId, setActiveId] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Cinematic title reveal
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.9,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top bottom-=100',
                        end: 'top center',
                        scrub: 1,
                    },
                    ease: 'power3.out',
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 px-0 md:px-6 bg-black text-white overflow-hidden relative">

            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_70%)]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6 border border-white/10"
                    >
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-accent">Success Stories</span>
                    </motion.div>

                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-tight mb-6"
                    >
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Industry Leaders</span>
                    </h2>
                </div>

                {/* Mobile: Horizontal Scroll Snap Carousel */}
                <div className="lg:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 px-6 pb-12 scrollbar-hide">
                    {TESTIMONIALS.map((item) => (
                        <div
                            key={item.id}
                            className="snap-center shrink-0 w-[85vw] h-[60vh] relative rounded-3xl overflow-hidden group"
                        >
                            {/* Background Image */}
                            <img
                                src={item.image}
                                alt={item.author}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-90`} />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="mb-auto pt-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">{item.company}</h3>
                                </div>

                                <div className="mb-6">
                                    <div className="text-5xl font-display font-black mb-1">{item.stat}</div>
                                    <div className="text-sm font-medium opacity-80">{item.statLabel}</div>
                                </div>

                                <blockquote className="text-lg font-medium leading-relaxed mb-6 relative">
                                    <Quote className="absolute -top-4 -left-2 w-6 h-6 text-white/20 rotate-180" />
                                    "{item.quote}"
                                </blockquote>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                                        {item.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{item.author}</div>
                                        <div className="text-xs opacity-60">{item.role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: Cinematic Accordion */}
                <div ref={accordionRef} className="hidden lg:flex gap-4 h-[700px] mb-32 px-6">
                    {TESTIMONIALS.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            onClick={() => setActiveId(item.id)}
                            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${activeId === item.id ? 'flex-[3]' : 'flex-[0.5] hover:flex-[0.7]'
                                }`}
                        >
                            {/* Background Image */}
                            <img
                                src={item.image}
                                alt={item.author}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${activeId === item.id
                                    ? `bg-gradient-to-r ${item.color} opacity-95`
                                    : 'from-black/60 via-black/40 to-black/80'
                                } transition-all duration-500`} />

                            {/* Inactive State Content (Vertical Text) */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeId === item.id ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                }`}>
                                <h3 className="text-2xl font-bold tracking-widest uppercase -rotate-90 whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity">
                                    {item.company}
                                </h3>
                            </div>

                            {/* Active State Content */}
                            <div className={`absolute inset-0 p-12 flex flex-col justify-between transition-all duration-500 ${activeId === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}>
                                <div className="flex justify-between items-start">
                                    <div className="text-sm font-bold uppercase tracking-widest opacity-60 border border-white/20 px-3 py-1 rounded-full">
                                        {item.company}
                                    </div>
                                    <ArrowRight className="w-6 h-6 opacity-40" />
                                </div>

                                <div className="grid grid-cols-2 gap-12 items-end">
                                    <div>
                                        <div className="text-8xl font-display font-black mb-2 tracking-tighter">
                                            {item.stat}
                                        </div>
                                        <div className="text-xl font-medium opacity-70 mb-8">
                                            {item.statLabel}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden">
                                                <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.author}</div>
                                                <div className="text-sm opacity-60">{item.role}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <blockquote className="text-2xl font-medium leading-relaxed relative">
                                        <Quote className="absolute -top-8 -left-4 w-12 h-12 text-white/10 rotate-180" />
                                        "{item.quote}"
                                    </blockquote>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Marquee Section */}
                <div className="relative w-full overflow-hidden py-12 border-y border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="flex animate-marquee gap-8 min-w-full px-4">
                        {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-[85vw] md:w-[400px] bg-black/40 p-8 rounded-2xl border border-white/10"
                            >
                                <div className="flex gap-1 mb-4 text-accent">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={16} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    "{review.text}"
                                </p>
                                <div className="text-sm font-bold text-white/60">
                                    {review.author}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
