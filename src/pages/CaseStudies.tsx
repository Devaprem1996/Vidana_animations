import React, { useEffect, useRef } from 'react';
import { Nav } from '@/components/vidana/Nav';
import { BrandStrip } from '@/components/vidana/BrandStrip';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { SplitText } from '@/components/animations/SplitText';
import { ProjectCard } from '@/components/vidana/ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToNext } from '@/components/animations/ScrollToNext';

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
    {
        title: "NEBULA",
        category: "Digital Product",
        image: "https://images.unsplash.com/photo-1480044965905-832759667f75?q=80&w=2681&auto=format&fit=crop",
        excerpt: "Redefining space exploration interfaces for the next generation of astronauts."
    },
    {
        title: "HORIZON",
        category: "Brand Identity",
        image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2553&auto=format&fit=crop",
        excerpt: "A sustainable energy brand that connects humanity with nature through design."
    },
    {
        title: "KINETIC",
        category: "Web Experience",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        excerpt: "Immersive web experience for a leading automotive manufacturer's EV launch."
    },
    {
        title: "AETHER",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        excerpt: "Mental health application focusing on calm, fluid interactions and privacy."
    }
];

const CaseStudies = () => {
    const curlRefs = useRef<(SVGSVGElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const categoryRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Cinematic SVG curl animations
        curlRefs.current.forEach((curl, index) => {
            if (!curl) return;

            const direction = index % 2 === 0 ? 1 : -1;
            const distance = 400 * direction;

            gsap.fromTo(
                curl,
                {
                    x: -distance,
                    y: 50,
                    opacity: 0,
                    rotation: direction * -20,
                    scale: 0.8,
                },
                {
                    x: 0,
                    y: 0,
                    opacity: 0.7,
                    rotation: 0,
                    scale: 1,
                    scrollTrigger: {
                        trigger: curl,
                        start: 'top bottom-=50',
                        end: 'bottom top+=50',
                        scrub: 2,
                        toggleActions: 'play none none reverse',
                    },
                    ease: 'power2.out',
                }
            );
        });

        // Cinematic image parallax and scale
        imageRefs.current.forEach((image, index) => {
            if (!image) return;

            // Parallax effect
            gsap.to(image, {
                y: -80,
                scrollTrigger: {
                    trigger: image,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
                ease: 'none',
            });

            // Scale and clip-path reveal
            const imageInner = image.querySelector('.project-image');
            if (imageInner) {
                gsap.fromTo(
                    imageInner,
                    {
                        scale: 1.3,
                        clipPath: 'inset(20% 20% 20% 20%)',
                    },
                    {
                        scale: 1,
                        clipPath: 'inset(0% 0% 0% 0%)',
                        scrollTrigger: {
                            trigger: image,
                            start: 'top bottom-=100',
                            end: 'top center',
                            scrub: 1,
                        },
                        ease: 'power3.out',
                    }
                );
            }
        });

        // Cinematic text reveals
        textRefs.current.forEach((text, index) => {
            if (!text) return;

            const title = text.querySelector('h2');
            const excerpt = text.querySelector('p');
            const cta = text.querySelector('.cta-link');

            // Title reveal with clip-path
            if (title) {
                gsap.fromTo(
                    title,
                    {
                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                        x: -50,
                    },
                    {
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        x: 0,
                        scrollTrigger: {
                            trigger: title,
                            start: 'top bottom-=50',
                            end: 'top center+=100',
                            scrub: 1,
                        },
                        ease: 'power3.out',
                    }
                );
            }

            // Excerpt fade and slide
            if (excerpt) {
                gsap.fromTo(
                    excerpt,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 0.7,
                        y: 0,
                        scrollTrigger: {
                            trigger: excerpt,
                            start: 'top bottom-=100',
                            end: 'top center+=50',
                            scrub: 1,
                        },
                        ease: 'power2.out',
                    }
                );
            }

            // CTA link reveal
            if (cta) {
                gsap.fromTo(
                    cta,
                    {
                        opacity: 0,
                        x: -20,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scrollTrigger: {
                            trigger: cta,
                            start: 'top bottom-=50',
                            end: 'top center+=100',
                            scrub: 1,
                        },
                        ease: 'power2.out',
                    }
                );
            }
        });

        // Category badge animations
        categoryRefs.current.forEach((category, index) => {
            if (!category) return;

            gsap.fromTo(
                category,
                {
                    opacity: 0,
                    scale: 0.8,
                    y: -20,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: category,
                        start: 'top bottom-=100',
                        end: 'top center+=150',
                        scrub: 1,
                    },
                    ease: 'back.out(1.7)',
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-accent-foreground overflow-x-hidden relative">
            <Nav />

            {/* Cinematic vignette overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-gradient-radial from-transparent via-transparent to-black/30" />

            <main className="pt-32 pb-24">
                {/* Hero Section with Cinematic Reveal */}
                <section className="px-6 mb-32">
                    <div className="container mx-auto">
                        <RevealOnScroll animation="fadeInUp">
                            <span className="block text-accent text-sm font-bold uppercase tracking-widest mb-6">
                                Selected Work
                            </span>
                        </RevealOnScroll>

                        <h1 className="text-[clamp(3rem,8vw,7rem)] font-display font-black leading-[0.9] mb-12">
                            <SplitText type="chars" animation="fadeInUp" staggerDelay={0.03}>
                                CASE STUDIES
                            </SplitText>
                        </h1>

                        <RevealOnScroll animation="fadeInUp" delay={0.4}>
                            <p className="text-xl md:text-2xl opacity-60 max-w-3xl">
                                Explore our portfolio of transformative digital experiences that push the boundaries of design and technology.
                            </p>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Case Studies with Cinematic Animations */}
                <section ref={sectionRef} className="px-6 relative">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-48">
                            {CASE_STUDIES.map((study, index) => (
                                <div key={index} className="relative">
                                    {/* Animated SVG Curl Decoration */}
                                    <svg
                                        ref={el => curlRefs.current[index] = el}
                                        className={`absolute ${index % 2 === 0 ? '-left-16 md:-left-32' : '-right-16 md:-right-32'} top-1/2 -translate-y-1/2 w-40 h-40 md:w-64 md:h-64 pointer-events-none z-0`}
                                        viewBox="0 0 200 200"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="currentColor" className="text-accent" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0.2" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M20 100 Q 50 20, 100 50 T 180 100 Q 150 180, 100 150 T 20 100"
                                            stroke={`url(#gradient-${index})`}
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M40 100 Q 60 40, 100 70 T 160 100 Q 140 160, 100 130 T 40 100"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            className="text-primary/15"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="100" cy="50" r="4" fill="currentColor" className="text-accent/60">
                                            <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="180" cy="100" r="4" fill="currentColor" className="text-accent/60">
                                            <animate attributeName="r" values="4;6;4" dur="3s" begin="0.5s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="100" cy="150" r="4" fill="currentColor" className="text-accent/60">
                                            <animate attributeName="r" values="4;6;4" dur="3s" begin="1s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="20" cy="100" r="4" fill="currentColor" className="text-accent/60">
                                            <animate attributeName="r" values="4;6;4" dur="3s" begin="1.5s" repeatCount="indefinite" />
                                        </circle>
                                    </svg>

                                    {/* Case Study Content */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center group cursor-pointer relative z-10">
                                        {/* Image with Parallax */}
                                        <div
                                            ref={el => imageRefs.current[index] = el}
                                            className={`order-2 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'} overflow-hidden`}
                                        >
                                            <div className="project-image aspect-video overflow-hidden rounded-lg relative">
                                                <img
                                                    src={study.image}
                                                    alt={study.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                {/* Overlay gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>
                                        </div>

                                        {/* Text Content */}
                                        <div
                                            ref={el => textRefs.current[index] = el}
                                            className={`order-1 ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'} space-y-6`}
                                        >
                                            <span
                                                ref={el => categoryRefs.current[index] = el}
                                                className="inline-block text-accent text-sm font-bold uppercase tracking-widest px-4 py-2 border border-accent/30 rounded-full backdrop-blur-sm"
                                            >
                                                {study.category}
                                            </span>

                                            <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] group-hover:text-accent transition-colors duration-500">
                                                {study.title}
                                            </h2>

                                            <p className="text-xl md:text-2xl leading-relaxed max-w-md">
                                                {study.excerpt}
                                            </p>

                                            <div className="cta-link mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-widest group-hover:gap-6 transition-all duration-300">
                                                <span className="relative">
                                                    Read Case Study
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
                                                </span>
                                                <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative line */}
                                    {index < CASE_STUDIES.length - 1 && (
                                        <div className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="mt-32">
                    <BrandStrip />
                </div>
            </main>

            {/* Spacer to allow scrolling past page end for navigation */}
            <div className="h-96" aria-hidden="true"></div>

            <ScrollToNext />
        </div>
    );
};

export default CaseStudies;
