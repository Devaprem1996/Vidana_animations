import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Smartphone, Cloud, Brain, Palette, Zap, Database, Shield, ArrowRight } from 'lucide-react';
import { TechNetworkBackground } from '@/components/animations/TechNetworkBackground';

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE = [
    {
        id: 1,
        title: "AI & Machine Learning",
        description: "Intelligent systems that learn and adapt",
        details: "Custom AI models, neural networks, and predictive analytics that transform your data into actionable insights.",
        icon: Brain,
        color: "from-purple-500 to-pink-500",
        video: "https://cdn.pixabay.com/video/2023/10/22/186115-877653483_large.mp4"
    },
    {
        id: 2,
        title: "Web Development",
        description: "Blazing-fast, scalable web applications",
        details: "Modern web apps built with React, Next.js, and cutting-edge technologies for optimal performance.",
        icon: Code,
        color: "from-blue-500 to-cyan-400",
        video: "https://cdn.pixabay.com/video/2020/05/25/40149-424930107_large.mp4"
    },
    {
        id: 3,
        title: "Mobile Apps",
        description: "Native experiences on every device",
        details: "Cross-platform mobile applications with native performance and beautiful, intuitive interfaces.",
        icon: Smartphone,
        color: "from-emerald-400 to-teal-500",
        video: "https://cdn.pixabay.com/video/2019/04/20/22908-331590497_large.mp4"
    },
    {
        id: 4,
        title: "Cloud Architecture",
        description: "Scalable infrastructure that grows with you",
        details: "AWS, Azure, and GCP solutions designed for reliability, security, and infinite scalability.",
        icon: Cloud,
        color: "from-indigo-500 to-blue-600",
        video: "https://cdn.pixabay.com/video/2020/05/11/38459-420239611_large.mp4"
    },
    {
        id: 5,
        title: "UI/UX Design",
        description: "Interfaces that users love",
        details: "User-centered design that combines aesthetics with usability, creating memorable experiences.",
        icon: Palette,
        color: "from-amber-400 to-orange-500",
        video: "https://cdn.pixabay.com/video/2023/04/23/160109-820526019_large.mp4"
    },
    {
        id: 6,
        title: "Performance",
        description: "Lightning-fast load times",
        details: "Advanced optimization techniques to ensure your applications run at peak performance.",
        icon: Zap,
        color: "from-yellow-400 to-amber-500",
        video: "https://cdn.pixabay.com/video/2021/04/18/71457-538302066_large.mp4"
    },
    {
        id: 7,
        title: "Data Engineering",
        description: "Transform data into insights",
        details: "Big data pipelines, ETL processes, and analytics platforms that unlock business value.",
        icon: Database,
        color: "from-cyan-400 to-blue-500",
        video: "https://cdn.pixabay.com/video/2019/06/19/24663-343755913_large.mp4"
    },
    {
        id: 8,
        title: "Security & Compliance",
        description: "Enterprise-grade protection",
        details: "Comprehensive security audits, penetration testing, and compliance solutions.",
        icon: Shield,
        color: "from-red-500 to-pink-500",
        video: "https://cdn.pixabay.com/video/2021/09/21/89467-611984852_large.mp4"
    }
];

export const VidanaExpertise = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number>(1);

    useEffect(() => {
        if (!sectionRef.current) return;

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 60%",
            onEnter: () => {
                gsap.to(sectionRef.current, {
                    opacity: 1,
                    duration: 0.8
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const activeItem = EXPERTISE.find(item => item.id === activeId) || EXPERTISE[0];

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-black text-white relative overflow-hidden opacity-0">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />
            </div>

            {/* Tech Network SVG Background */}
            <TechNetworkBackground />

            <div className="container mx-auto relative z-10">
                <div className="mb-20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-6 text-accent">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Our Expertise
                    </span>
                    <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] mb-6">
                        DESIGNED FOR <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">TOMORROW</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Interactive List */}
                    <div className="flex flex-col space-y-4">
                        {EXPERTISE.map((item) => (
                            <ExpertiseItem
                                key={item.id}
                                item={item}
                                isActive={activeId === item.id}
                                onActivate={() => setActiveId(item.id)}
                            />
                        ))}
                    </div>

                    {/* Right Column: Sticky Preview */}
                    <div className="hidden lg:block relative h-[600px] w-full sticky top-32">
                        <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 relative shadow-2xl backdrop-blur-sm">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeItem.id}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    {/* Video Background */}
                                    <div className="absolute inset-0 z-0">
                                        <video
                                            src={activeItem.video}
                                            autoPlay
                                            muted
                                            loop
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeItem.color} bg-opacity-20 flex items-center justify-center mb-6 backdrop-blur-md`}>
                                                <activeItem.icon className="w-8 h-8 text-white relative z-10" />
                                                <div className="absolute inset-0 bg-white/10 blur-xl"></div>
                                            </div>
                                            <h3 className="text-4xl font-bold mb-4">{activeItem.title}</h3>
                                            <p className="text-lg text-white/70 leading-relaxed max-w-md">
                                                {activeItem.details}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Decorative blobs behind */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r ${activeItem.color} opacity-20 blur-[100px] -z-10 transition-colors duration-700`} />
                    </div>
                </div>
            </div>
        </section>
    );
};

interface ExpertiseItemProps {
    item: typeof EXPERTISE[0];
    isActive: boolean;
    onActivate: () => void;
}

const ExpertiseItem = ({ item, isActive, onActivate }: ExpertiseItemProps) => {
    return (
        <motion.div
            onMouseEnter={onActivate}
            onClick={onActivate} // For mobile tap
            className={`group relative p-8 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${isActive
                ? 'border-white/20 bg-white/5'
                : 'border-transparent hover:bg-white/5'
                }`}
            whileHover={{ x: 10 }}
        >
            {/* Focus Indicator line */}
            {isActive && (
                <motion.div
                    layoutId="activeIndicator"
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color}`}
                />
            )}

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-6">
                    <span className={`text-sm font-mono transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30'}`}>
                        {String(item.id).padStart(2, '0')}
                    </span>
                    <div>
                        <h3 className={`text-2xl font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
                            {item.title}
                        </h3>
                        <p className={`text-sm mt-2 lg:hidden ${isActive ? 'text-white/70' : 'hidden'}`}>
                            {item.description}
                        </p>
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: isActive ? 0 : -45, opacity: isActive ? 1 : 0.2 }}
                    className={`p-2 rounded-full border border-white/10 ${isActive ? 'bg-white text-black' : 'text-white'}`}
                >
                    <ArrowRight className="w-5 h-5" />
                </motion.div>
            </div>

            {/* Hover Glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        </motion.div>
    );
}
