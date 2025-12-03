import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Smartphone, Cloud, Brain, Palette, Zap, Database, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE = [
    {
        id: 1,
        title: "AI & Machine Learning",
        description: "Intelligent systems that learn and adapt",
        details: "Custom AI models, neural networks, and predictive analytics that transform your data into actionable insights.",
        icon: Brain,
        color: "from-purple-500 to-pink-500",
        size: "large", // large, medium, small
        video: "https://cdn.pixabay.com/video/2022/11/28/141182-777581476_tiny.mp4"
    },
    {
        id: 2,
        title: "Web Development",
        description: "Blazing-fast, scalable web applications",
        details: "Modern web apps built with React, Next.js, and cutting-edge technologies for optimal performance.",
        icon: Code,
        color: "from-blue-500 to-cyan-400",
        size: "medium"
    },
    {
        id: 3,
        title: "Mobile Apps",
        description: "Native experiences on every device",
        details: "Cross-platform mobile applications with native performance and beautiful, intuitive interfaces.",
        icon: Smartphone,
        color: "from-emerald-400 to-teal-500",
        size: "medium"
    },
    {
        id: 4,
        title: "Cloud Architecture",
        description: "Scalable infrastructure that grows with you",
        details: "AWS, Azure, and GCP solutions designed for reliability, security, and infinite scalability.",
        icon: Cloud,
        color: "from-indigo-500 to-blue-600",
        size: "large"
    },
    {
        id: 5,
        title: "UI/UX Design",
        description: "Interfaces that users love",
        details: "User-centered design that combines aesthetics with usability, creating memorable experiences.",
        icon: Palette,
        color: "from-amber-400 to-orange-500",
        size: "small"
    },
    {
        id: 6,
        title: "Performance Optimization",
        description: "Lightning-fast load times",
        details: "Advanced optimization techniques to ensure your applications run at peak performance.",
        icon: Zap,
        color: "from-yellow-400 to-amber-500",
        size: "small"
    },
    {
        id: 7,
        title: "Data Engineering",
        description: "Transform data into insights",
        details: "Big data pipelines, ETL processes, and analytics platforms that unlock business value.",
        icon: Database,
        color: "from-cyan-400 to-blue-500",
        size: "medium"
    },
    {
        id: 8,
        title: "Security & Compliance",
        description: "Enterprise-grade protection",
        details: "Comprehensive security audits, penetration testing, and compliance solutions.",
        icon: Shield,
        color: "from-red-500 to-pink-500",
        size: "small"
    }
];

export const VidanaExpertise = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.expertise-card');

        gsap.fromTo(cards,
            {
                y: 100,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom-=100",
                    end: "top center",
                    scrub: 1,
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const getGridClass = (size: string) => {
        switch (size) {
            case 'large':
                return 'md:col-span-2 md:row-span-2';
            case 'medium':
                return 'md:col-span-1 md:row-span-1';
            case 'small':
                return 'md:col-span-1 md:row-span-1';
            default:
                return 'md:col-span-1 md:row-span-1';
        }
    };

    return (
        <section ref={sectionRef} className="relative py-32 px-6 bg-black text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
                <motion.div
                    className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-6 text-accent">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        What We Do
                    </span>
                    <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] mb-6">
                        Our Expertise
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl">
                        Cutting-edge solutions across the full technology spectrum
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-4">
                    {EXPERTISE.map((item) => (
                        <ExpertiseCard
                            key={item.id}
                            item={item}
                            gridClass={getGridClass(item.size)}
                            isExpanded={expandedId === item.id}
                            isHovered={hoveredId === item.id}
                            onExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
                            onHover={() => setHoveredId(item.id)}
                            onLeave={() => setHoveredId(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface ExpertiseCardProps {
    item: typeof EXPERTISE[0];
    gridClass: string;
    isExpanded: boolean;
    isHovered: boolean;
    onExpand: () => void;
    onHover: () => void;
    onLeave: () => void;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
    item,
    gridClass,
    isExpanded,
    isHovered,
    onExpand,
    onHover,
    onLeave
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        onLeave();
    };

    const Icon = item.icon;

    return (
        <motion.div
            ref={cardRef}
            className={`expertise-card ${gridClass} relative group cursor-pointer`}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={onHover}
            onMouseLeave={handleMouseLeave}
            onClick={onExpand}
            whileHover={{ scale: 1.02 }}
            layout
        >
            {/* Glassmorphism Card */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
                {/* Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />

                {/* Border Gradient */}
                <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} style={{ padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div>
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-7 h-7 text-white" />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
                            {item.title}
                        </h3>

                        <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                            {item.description}
                        </p>
                    </div>

                    {/* Expanded Details */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            height: isExpanded ? 'auto' : 0
                        }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-4 border-t border-white/10">
                            <p className="text-sm text-white/70 leading-relaxed">
                                {item.details}
                            </p>
                        </div>
                    </motion.div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                            <span className="text-xs">→</span>
                        </div>
                    </div>
                </div>

                {/* Particle Effect */}
                {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                initial={{
                                    x: Math.random() * 100 + '%',
                                    y: Math.random() * 100 + '%',
                                    opacity: 0
                                }}
                                animate={{
                                    y: [null, '-100%'],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
