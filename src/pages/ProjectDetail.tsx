import React from 'react';
import { Nav } from '@/components/vidana/Nav';
import { BrandStrip } from '@/components/vidana/BrandStrip';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { SplitText } from '@/components/animations/SplitText';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
    const { id } = useParams();
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
            <Nav />

            <main>
                {/* Hero Section */}
                <section className="h-screen relative overflow-hidden flex items-end pb-24 px-6">
                    <motion.div
                        className="absolute inset-0 z-0"
                        style={{ scale }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1480044965905-832759667f75?q=80&w=2681&auto=format&fit=crop"
                            alt="Project Hero"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </motion.div>

                    <div className="container mx-auto relative z-10">
                        <RevealOnScroll animation="fadeInUp">
                            <span className="block text-accent text-sm font-bold uppercase tracking-widest mb-6">
                                Digital Product
                            </span>
                        </RevealOnScroll>

                        <h1 className="text-[clamp(4rem,15vw,12rem)] font-display font-black leading-[0.8] mb-12">
                            <SplitText type="chars" animation="fadeInUp" staggerDelay={0.02}>
                                NEBULA
                            </SplitText>
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/20 pt-8">
                            <RevealOnScroll animation="fadeInUp" delay={0.2}>
                                <div>
                                    <h3 className="text-sm font-bold uppercase opacity-50 mb-2">Client</h3>
                                    <p className="text-lg">Nebula Space Systems</p>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll animation="fadeInUp" delay={0.3}>
                                <div>
                                    <h3 className="text-sm font-bold uppercase opacity-50 mb-2">Services</h3>
                                    <p className="text-lg">UI/UX, 3D Design</p>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll animation="fadeInUp" delay={0.4}>
                                <div>
                                    <h3 className="text-sm font-bold uppercase opacity-50 mb-2">Year</h3>
                                    <p className="text-lg">2024</p>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll animation="fadeInUp" delay={0.5}>
                                <div>
                                    <h3 className="text-sm font-bold uppercase opacity-50 mb-2">Role</h3>
                                    <p className="text-lg">Lead Design Agency</p>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-32 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <RevealOnScroll animation="fadeInUp">
                            <p className="text-2xl md:text-4xl leading-relaxed font-medium mb-16">
                                Redefining the interface for next-generation space exploration. We created a design system that balances technical precision with human-centric usability.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll animation="fadeInUp" delay={0.2}>
                            <div className="prose prose-invert prose-lg max-w-none opacity-80">
                                <p>
                                    The challenge was to create an interface that could handle complex data streams while remaining intuitive for astronauts under high-stress conditions. We utilized a dark mode-first approach with high-contrast elements and clear typographic hierarchy.
                                </p>
                                <p>
                                    Our team worked closely with engineers to understand the constraints and requirements of zero-gravity environments, resulting in a unique interaction model that minimizes physical effort.
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-12 px-6">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <RevealOnScroll animation="scaleIn">
                                <img
                                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
                                    alt="Project detail 1"
                                    className="w-full rounded-lg"
                                />
                            </RevealOnScroll>
                            <RevealOnScroll animation="scaleIn" delay={0.2}>
                                <img
                                    src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2670&auto=format&fit=crop"
                                    alt="Project detail 2"
                                    className="w-full rounded-lg md:mt-32"
                                />
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Next Project */}
                <section className="py-32 px-6 bg-secondary">
                    <div className="container mx-auto text-center">
                        <RevealOnScroll animation="fadeInUp">
                            <span className="block text-sm font-bold uppercase tracking-widest mb-8 opacity-50">
                                Next Project
                            </span>
                            <Link to="/project/horizon" className="group inline-flex items-center gap-4 text-[clamp(3rem,8vw,6rem)] font-display font-black leading-none hover:text-accent transition-colors">
                                HORIZON
                                <motion.span
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowRight className="w-12 h-12 md:w-24 md:h-24" />
                                </motion.span>
                            </Link>
                        </RevealOnScroll>
                    </div>
                </section>

                <BrandStrip />
            </main>
        </div>
    );
};

export default ProjectDetail;
