import React, { useEffect, useRef } from 'react';
import { Nav } from '@/components/vidana/Nav';
import { BrandStrip } from '@/components/vidana/BrandStrip';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { AnomalousMatterHero } from '@/components/ui/anomalous-matter-hero';
import { WavyBackground } from '@/components/ui/wavy-background';
import { ScrollToNext } from '@/components/animations/ScrollToNext';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        title: "Innovation",
        desc: "Pushing boundaries with every pixel, creating experiences that set new industry standards.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        title: "Precision",
        desc: "Attention to detail is our obsession. Every element crafted with surgical precision.",
        color: "from-purple-500 to-pink-400"
    },
    {
        title: "Motion",
        desc: "Bringing static interfaces to life with fluid, purposeful animations that captivate.",
        color: "from-amber-400 to-orange-500"
    }
];

const STATS = [
    { value: "150+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Team Members" },
    { value: "12", label: "Countries Served" }
];

const About = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero parallax
        if (heroRef.current) {
            gsap.to(heroRef.current, {
                y: 100,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        }

        // Image reveal
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                {
                    clipPath: "inset(100% 0% 0% 0%)",
                    scale: 1.2
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    scale: 1,
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top bottom-=100",
                        end: "top center",
                        scrub: 1,
                    }
                }
            );
        }

        // Values stagger
        if (valuesRef.current) {
            const cards = valuesRef.current.querySelectorAll('.value-card');
            gsap.fromTo(cards,
                {
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: "top bottom-=100",
                        end: "top center",
                        scrub: 1,
                    }
                }
            );
        }

        // Stats counter animation
        if (statsRef.current) {
            const statElements = statsRef.current.querySelectorAll('.stat-value');
            statElements.forEach((stat) => {
                const target = stat.textContent || '0';
                const isPercentage = target.includes('%');
                const isPlus = target.includes('+');
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

                ScrollTrigger.create({
                    trigger: stat,
                    start: "top bottom-=50",
                    onEnter: () => {
                        gsap.to(stat, {
                            textContent: numericValue,
                            duration: 2,
                            ease: "power1.out",
                            snap: { textContent: 1 },
                            onUpdate: function () {
                                const current = Math.round(parseFloat(stat.textContent || '0'));
                                stat.textContent = current + (isPercentage ? '%' : isPlus ? '+' : '');
                            }
                        });
                    }
                });
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-accent selection:text-black overflow-x-hidden relative">
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Animated Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />

                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[120px]"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                <Nav />

                <main className="pt-32">
                    {/* Hero Section */}
                    <div className="relative h-screen mb-32">
                        <AnomalousMatterHero
                            title="Who We Are"
                            subtitle="WE CRAFT DIGITAL EXPERIENCES THAT DEFY GRAVITY."
                            description="Vidana is a forward-thinking design studio operating at the intersection of art, technology, and commerce. We believe in the power of motion to tell compelling stories."
                        />
                    </div>

                    {/* Image Section */}
                    <section className="px-6 mb-32">
                        <div className="container mx-auto">
                            <div ref={imageRef} className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                <motion.img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                                    alt="Team working"
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8 }}
                                />
                                <div className="absolute bottom-8 left-8 z-20">
                                    <p className="text-2xl font-bold mb-2">Our Team in Action</p>
                                    <p className="text-white/60">Crafting the future, one pixel at a time</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section ref={statsRef} className="px-6 mb-32">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {STATS.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="stat-value text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm uppercase tracking-widest text-white/40">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Values Section */}
                    <section ref={valuesRef} className="px-6 mb-32">
                        <div className="container mx-auto">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-7xl font-display font-black mb-16"
                            >
                                Our Values
                            </motion.h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {VALUES.map((value, index) => (
                                    <div
                                        key={index}
                                        className="value-card group relative p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:scale-[1.02]"
                                    >
                                        <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`} />

                                        <h3 className="text-3xl font-display font-bold mb-4">{value.title}</h3>
                                        <p className="text-lg text-white/60 leading-relaxed">{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <BrandStrip />

                    {/* Footer CTA */}
                    <footer className="relative overflow-hidden">
                        <WavyBackground className="max-w-4xl mx-auto pb-40">
                            <div className="container mx-auto relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <h2 className="text-[clamp(3rem,10vw,10rem)] font-display font-black leading-none mb-8 text-white">
                                        JOIN<br />US
                                    </h2>
                                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                                        Ready to create something extraordinary? Let's build the future together.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-accent transition-colors duration-300"
                                    >
                                        Get in Touch
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.div>

                                <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-white/40">
                                    <span>© 2024 Vidana</span>
                                    <span>Crafted with Precision</span>
                                </div>
                            </div>
                        </WavyBackground>
                    </footer>
                </main>
            </div>

            {/* Spacer to allow scrolling past page end for navigation */}
            <div className="h-96" aria-hidden="true"></div>

            <ScrollToNext />
        </div>
    );
};

export default About;
