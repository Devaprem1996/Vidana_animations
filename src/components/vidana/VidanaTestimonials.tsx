import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
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
        role: "People Operations Lead at Worldsensing",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
        color: "bg-gradient-to-br from-[#FDE68A] via-[#FEF3C7] to-[#FDE68A]"
    },
    {
        id: 2,
        company: "TECHFLOW",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
        stat: "3x",
        statLabel: "faster deployment",
        quote: "The seamless integration and design system accelerated our product launch significantly.",
        author: "Sarah Chen",
        role: "CTO at TechFlow",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
        color: "bg-gradient-to-br from-[#BFDBFE] via-[#DBEAFE] to-[#BFDBFE]"
    },
    {
        id: 3,
        company: "NEXUS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
        stat: "40%",
        statLabel: "increase in retention",
        quote: "Our user engagement metrics skyrocketed after implementing the new interface designs.",
        author: "Michael Ross",
        role: "Product Director at Nexus",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
        color: "bg-gradient-to-br from-[#BBF7D0] via-[#D1FAE5] to-[#BBF7D0]"
    },
    {
        id: 4,
        company: "AURA",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
        stat: "10k+",
        statLabel: "new active users",
        quote: "The cinematic experience created a viral loop that we hadn't anticipated.",
        author: "Emily Watson",
        role: "CMO at Aura",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2790&auto=format&fit=crop",
        color: "bg-gradient-to-br from-[#FBCFE8] via-[#FCE7F3] to-[#FBCFE8]"
    },
    {
        id: 5,
        company: "STRATUM",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
        stat: "99.9%",
        statLabel: "uptime reliability",
        quote: "Robust architecture meets stunning visuals. A rare combination in today's market.",
        author: "David Kim",
        role: "VP of Engineering at Stratum",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop",
        color: "bg-gradient-to-br from-[#E9D5FF] via-[#F3E8FF] to-[#E9D5FF]"
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
    const particlesRef = useRef<HTMLDivElement>(null);

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

        // Parallax background effect
        if (sectionRef.current) {
            const bg = sectionRef.current.querySelector('.bg-gradient');
            if (bg) {
                gsap.to(bg, {
                    y: -150,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                    ease: 'none',
                });
            }
        }

        // Accordion entrance animation
        if (accordionRef.current) {
            gsap.fromTo(
                accordionRef.current,
                {
                    y: 80,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: accordionRef.current,
                        start: 'top bottom-=50',
                        end: 'top center+=100',
                        scrub: 1,
                    },
                    ease: 'power2.out',
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-background overflow-hidden relative">
            {/* Cinematic Background Gradient */}
            <div className="bg-gradient absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/10 to-background opacity-50" />

            {/* Animated Particles */}
            <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-accent/30 rounded-full"
                        initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [
                                Math.random() * 100 + '%',
                                Math.random() * 100 + '%',
                                Math.random() * 100 + '%',
                            ],
                            x: [
                                Math.random() * 100 + '%',
                                Math.random() * 100 + '%',
                                Math.random() * 100 + '%',
                            ],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="container mx-auto relative z-10">
                {/* Cinematic Title */}
                <div className="text-center mb-24 relative">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: 'backOut' }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 backdrop-blur-sm rounded-full mb-8 border border-accent/20"
                    >
                        <Sparkles className="w-5 h-5 text-accent" />
                        <span className="text-sm font-bold uppercase tracking-widest text-accent">Proven Results</span>
                    </motion.div>

                    <h2
                        ref={titleRef}
                        className="text-[clamp(2.5rem,6vw,5rem)] font-display font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-foreground"
                    >
                        See how companies like yours<br />succeed with Vidana
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 0.7, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-xl mt-6 max-w-2xl mx-auto"
                    >
                        Join hundreds of forward-thinking companies transforming their digital presence
                    </motion.p>
                </div>

                {/* Cinematic Accordion Section */}
                <div ref={accordionRef} className="flex flex-col lg:flex-row gap-4 h-[800px] lg:h-[700px] mb-32">
                    {TESTIMONIALS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layout
                            onClick={() => setActiveId(item.id)}
                            className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 ease-out ${activeId === item.id ? 'flex-[3] shadow-2xl' : 'flex-[0.5] hover:flex-[0.7] shadow-lg'
                                }`}
                            style={{
                                isolation: 'isolate',
                            }}
                            whileHover={{ scale: activeId === item.id ? 1 : 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Background Image (visible when inactive) */}
                            <div className={`absolute inset-0 transition-all duration-700 ${activeId === item.id ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
                                <img
                                    src={item.image}
                                    alt={item.author}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                {/* Inactive Label */}
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="text-white font-bold text-xl mb-2">{item.company}</div>
                                    <div className="text-white/80 text-sm">{item.author}</div>
                                </div>
                            </div>

                            {/* Active Content */}
                            <AnimatePresence mode="wait">
                                {activeId === item.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className={`absolute inset-0 ${item.color} p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center backdrop-blur-sm`}
                                    >
                                        {/* Animated Background Pattern */}
                                        <div className="absolute inset-0 opacity-10">
                                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <pattern id={`pattern-${item.id}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                                                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill={`url(#pattern-${item.id})`} />
                                            </svg>
                                        </div>

                                        {/* Left Content */}
                                        <motion.div
                                            className="flex-1 flex flex-col justify-center h-full z-10"
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.6 }}
                                        >
                                            <div className="mb-auto">
                                                <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-black/40 rounded-full animate-pulse" />
                                                    {item.company}
                                                </div>
                                            </div>

                                            <motion.div
                                                className="mb-8"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                            >
                                                <div className="text-7xl md:text-9xl font-display font-black mb-2 text-black bg-clip-text">
                                                    {item.stat}
                                                </div>
                                                <div className="text-xl font-bold text-black/70">
                                                    {item.statLabel}
                                                </div>
                                            </motion.div>

                                            <motion.blockquote
                                                className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-black relative"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5, duration: 0.6 }}
                                            >
                                                <span className="text-6xl absolute -top-4 -left-2 opacity-20">"</span>
                                                {item.quote}
                                            </motion.blockquote>

                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.6, duration: 0.6 }}
                                            >
                                                <div className="font-bold text-black text-lg">{item.author}</div>
                                                <div className="text-sm text-black/60">{item.role}</div>
                                            </motion.div>

                                            <motion.div
                                                className="mt-auto pt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black cursor-pointer group"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.7, duration: 0.6 }}
                                                whileHover={{ x: 10 }}
                                            >
                                                Read the Full Story
                                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                            </motion.div>
                                        </motion.div>

                                        {/* Right Image (Portrait) */}
                                        <motion.div
                                            className="w-full md:w-[40%] h-64 md:h-full rounded-3xl overflow-hidden relative shadow-2xl"
                                            initial={{ x: 50, opacity: 0, scale: 0.9 }}
                                            animate={{ x: 0, opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.author}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Cinematic Marquee Section */}
                <motion.div
                    className="relative w-full bg-gradient-to-br from-white via-gray-50 to-white rounded-[3rem] p-12 shadow-2xl overflow-hidden border border-white/20"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
                    </div>

                    <div className="flex items-center justify-between mb-12 border-b border-gray-200 pb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <motion.div
                                className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                G2
                            </motion.div>
                            <div>
                                <div className="font-bold text-black text-xl">Global Employment</div>
                                <div className="text-gray-500">Platform Leader</div>
                            </div>
                        </div>
                        <motion.button
                            className="bg-gradient-to-r from-[#333] to-black text-white px-8 py-4 rounded-xl text-sm font-bold hover:shadow-xl transition-all relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">See all G2 Reviews →</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                    </div>

                    {/* Enhanced Marquee */}
                    <div className="relative flex overflow-hidden mask-linear-fade">
                        <div className="flex animate-marquee gap-12 min-w-full">
                            {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex-shrink-0 w-[450px] bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="font-bold text-black mb-4 text-lg">{review.author}</div>
                                    <div className="flex gap-1 mb-4 text-[#F44336]">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={22} fill="currentColor" className="drop-shadow-sm" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        "{review.text}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
