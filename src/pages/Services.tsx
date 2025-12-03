import React, { useState } from 'react';
import { Nav } from '@/components/vidana/Nav';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { SplitText } from '@/components/animations/SplitText';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
    {
        id: '01',
        title: 'Brand Identity',
        description: 'We build brands that stand out in a crowded digital landscape. From logo design to comprehensive visual systems.',
        tags: ['Logo Design', 'Visual Systems', 'Brand Strategy', 'Typography']
    },
    {
        id: '02',
        title: 'Digital Product',
        description: 'User-centric product design that solves real problems. We create intuitive interfaces for web and mobile applications.',
        tags: ['UI/UX Design', 'Prototyping', 'Design Systems', 'User Research']
    },
    {
        id: '03',
        title: 'Web Experience',
        description: 'Immersive web experiences that captivate audiences. We combine creative design with robust engineering.',
        tags: ['Creative Development', 'WebGL', '3D Experiences', 'Motion Design']
    },
    {
        id: '04',
        title: 'Motion Design',
        description: 'Bringing stories to life through movement. We create animation systems that enhance usability and delight users.',
        tags: ['2D/3D Animation', 'Micro-interactions', 'Video Production', 'Lottie']
    }
];

const Services = () => {
    const [activeService, setActiveService] = useState<number | null>(null);

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-accent-foreground overflow-x-hidden relative">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl"
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="relative z-10">
                <Nav />

                <motion.main
                    className="pt-32 pb-24"
                    initial={{ clipPath: 'ellipse(0% 0% at 50% 50%)' }}
                    animate={{ clipPath: 'ellipse(100% 100% at 50% 50%)' }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <section className="px-6 mb-24">
                        <div className="container mx-auto">
                            <RevealOnScroll animation="fadeInUp">
                                <span className="block text-accent text-sm font-bold uppercase tracking-widest mb-6">
                                    Our Expertise
                                </span>
                            </RevealOnScroll>

                            <h1 className="text-[clamp(3rem,8vw,7rem)] font-display font-black leading-[0.9] mb-12">
                                <SplitText type="words" animation="fadeInUp" staggerDelay={0.05}>
                                    SERVICES &
                                </SplitText>
                                <br />
                                <SplitText type="words" animation="fadeInUp" staggerDelay={0.05} delay={0.3}>
                                    CAPABILITIES
                                </SplitText>
                            </h1>
                        </div>
                    </section>

                    <section className="px-6">
                        <div className="container mx-auto">
                            <div className="flex flex-col">
                                {SERVICES.map((service, index) => (
                                    <RevealOnScroll key={service.id} animation="fadeInUp" delay={index * 0.1}>
                                        <div
                                            className="border-t border-white/20 py-12 group cursor-pointer transition-colors hover:bg-white/5"
                                            onMouseEnter={() => setActiveService(index)}
                                            onMouseLeave={() => setActiveService(null)}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-start gap-8">
                                                <span className="text-sm font-bold opacity-50 font-mono">{service.id}</span>

                                                <div className="flex-1">
                                                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 flex items-center gap-4 group-hover:text-accent transition-colors">
                                                        {service.title}
                                                        <motion.span
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: activeService === index ? 1 : 0, x: activeService === index ? 0 : -20 }}
                                                        >
                                                            <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
                                                        </motion.span>
                                                    </h2>

                                                    <AnimatePresence>
                                                        {activeService === index && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <p className="text-xl opacity-80 max-w-2xl mb-6 pt-4">
                                                                    {service.description}
                                                                </p>
                                                                <div className="flex flex-wrap gap-3">
                                                                    {service.tags.map(tag => (
                                                                        <span key={tag} className="px-3 py-1 border border-white/20 rounded-full text-sm uppercase tracking-wider">
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    </RevealOnScroll>
                                ))}
                                <div className="border-t border-white/20" />
                            </div>
                        </div>
                    </section>
                </motion.main>
            </div>
        </div>
    );
};

export default Services;
