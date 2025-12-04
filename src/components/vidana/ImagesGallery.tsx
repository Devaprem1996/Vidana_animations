import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Orbital configuration: distribute 26 images across 5 circles
const ORBITAL_CONFIG = [
    { radius: 120, count: 4, images: [] as typeof IMAGES },   // Innermost circle - 4 images
    { radius: 200, count: 5, images: [] as typeof IMAGES },   // Second circle - 5 images
    { radius: 280, count: 6, images: [] as typeof IMAGES },   // Third circle - 6 images
    { radius: 360, count: 6, images: [] as typeof IMAGES },   // Fourth circle - 6 images
    { radius: 440, count: 5, images: [] as typeof IMAGES },   // Outermost circle - 5 images
];

const IMAGES = [
    { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop", title: "Software Development" },
    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop", title: "Photo Editing" },
    { url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=200&fit=crop", title: "Still Moments" },
    { url: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=300&h=200&fit=crop", title: "3D Modeling" },
    { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop", title: "Design Systems" },
    { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop", title: "Video Rendering" },
    { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop", title: "Data Analytics" },
    { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop", title: "Business Growth" },
    { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=200&fit=crop", title: "Team Collaboration" },
    { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop", title: "Workspace" },
    { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop", title: "Code Development" },
    { url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop", title: "Technology" },
    { url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop", title: "Innovation" },
    { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop", title: "Digital Work" },
    { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop", title: "Strategy" },
    { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop", title: "Planning" },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop", title: "Meetings" },
    { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop", title: "Brainstorming" },
    { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop", title: "Teamwork" },
    { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop", title: "Success" },
    { url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=200&fit=crop", title: "Leadership" },
    { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=200&fit=crop", title: "Vision" },
    { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", title: "Creative" },
    { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop", title: "Professional" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop", title: "Collaboration" },
    { url: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=300&h=200&fit=crop", title: "Computing" },
];

// Distribute images across orbital paths
let imageIndex = 0;
ORBITAL_CONFIG.forEach(orbit => {
    orbit.images = IMAGES.slice(imageIndex, imageIndex + orbit.count);
    imageIndex += orbit.count;
});

interface OrbitalImage {
    url: string;
    title: string;
    orbitIndex: number;
    imageIndex: number;
    startAngle: number;
}

export const ImagesGallery = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const circlesRef = useRef<(SVGCircleElement | null)[]>([]);

    // Flatten images with orbital data
    const orbitalImages: OrbitalImage[] = [];
    ORBITAL_CONFIG.forEach((orbit, orbitIndex) => {
        orbit.images.forEach((image, imageIndex) => {
            const angleStep = (Math.PI * 2) / orbit.count;
            const startAngle = angleStep * imageIndex;
            orbitalImages.push({
                ...image,
                orbitIndex,
                imageIndex,
                startAngle
            });
        });
    });

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const ctx = gsap.context(() => {
            // Main timeline with scroll trigger - SLOW MOTION CONTROL
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=10000", // Very long scroll for slow-motion control
                    scrub: 1.5, // Slightly higher scrub for smoother slow-motion feel
                    pin: content,
                    anticipatePin: 1
                }
            });

            // Phase 1: Expand circles quickly
            circlesRef.current.forEach((circle, index) => {
                if (circle) {
                    tl.fromTo(
                        circle,
                        {
                            r: 0,
                            opacity: 0
                        },
                        {
                            r: circle.getAttribute('data-final-r'),
                            opacity: 0.5, // Increased opacity for visibility
                            duration: 0.05,
                            ease: "power2.out"
                        },
                        index * 0.01
                    );
                }
            });

            // Phase 2 & 3: Continuous slow-motion space travel - images flow one after another
            imagesRef.current.forEach((imageEl, index) => {
                if (imageEl) {
                    const orbitalData = orbitalImages[index];
                    const orbit = ORBITAL_CONFIG[orbitalData.orbitIndex];

                    // Depth-based speed multiplier
                    const depthSpeed = 1 + (4 - orbitalData.orbitIndex) * 0.5;

                    // Calculate direction vector from center
                    const directionX = Math.cos(orbitalData.startAngle);
                    const directionY = Math.sin(orbitalData.startAngle);

                    // Starting position (very close to center)
                    const startDistance = 1;
                    const startX = 50 + directionX * startDistance;
                    const startY = 50 + directionY * startDistance;

                    // Ending position (travel very far)
                    const endDistance = 100 * depthSpeed;
                    const endX = 50 + directionX * endDistance;
                    const endY = 50 + directionY * endDistance;

                    // HUGE uneven scaling - 6x to 10x!
                    const baseScale = 6 + depthSpeed * 1.5;
                    const maxScaleX = baseScale * gsap.utils.random(0.9, 1.1);
                    const maxScaleY = baseScale * gsap.utils.random(0.85, 1.15);

                    // Start ALL images AFTER circles have expanded (at 0.15)
                    // Consistent spacing for smooth continuous flow
                    const startTime = 0.15 + index * 0.04;

                    // Consistent duration for all images
                    tl.fromTo(
                        imageEl,
                        {
                            left: `${startX}%`,
                            top: `${startY}%`,
                            scaleX: 0.05, // Start much smaller
                            scaleY: 0.05, // Start much smaller
                            opacity: 0,
                            rotation: gsap.utils.random(-30, 30),
                            filter: "blur(3px)" // Less initial blur
                        },
                        {
                            left: `${endX}%`,
                            top: `${endY}%`,
                            scaleX: maxScaleX, // 6-10x scale - HUGE!
                            scaleY: maxScaleY, // 6-10x scale - HUGE!
                            opacity: 0,
                            rotation: gsap.utils.random(-90, 90),
                            filter: "blur(0px)",
                            duration: 0.22, // Consistent duration for smooth flow
                            ease: "power1.inOut",
                            // Smooth fade in and out - get sharp earlier
                            keyframes: {
                                opacity: [0, 0.5, 0.9, 1, 1, 0.8, 0.5, 0],
                                filter: ["blur(3px)", "blur(1px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(1px)", "blur(4px)", "blur(8px)"],
                                easeEach: "none"
                            }
                        },
                        startTime
                    );
                }
            });

            // Phase 4: Pulse circles as images pass through
            circlesRef.current.forEach((circle, index) => {
                if (circle) {
                    tl.to(
                        circle,
                        {
                            opacity: 0.25,
                            duration: 0.3,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: 1
                        },
                        0.2 + index * 0.1
                    );
                }
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-black text-white">
            <div ref={contentRef} className="h-screen w-full">

                {/* Full-width - SVG circles and text */}
                <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                    {/* SVG Background Circles */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                        {ORBITAL_CONFIG.map((orbit, index) => (
                            <circle
                                key={index}
                                ref={el => circlesRef.current[index] = el}
                                cx="500"
                                cy="500"
                                r="0"
                                data-final-r={orbit.radius}
                                fill="none"
                                stroke="rgba(255,255,255,0.4)"
                                strokeWidth="2"
                            />
                        ))}
                    </svg>

                    {/* Center Text */}
                    <div className="relative z-10 text-center max-w-2xl px-8 pointer-events-none">
                        <h3 className="text-4xl md:text-5xl font-display font-light mb-4 leading-tight">
                            Curiosity, friction, iteration:
                        </h3>
                        <p className="text-3xl md:text-4xl font-display font-light">
                            The machinery of my design
                        </p>
                    </div>

                    {/* Orbital Images */}
                    {orbitalImages.map((image, index) => {
                        const orbit = ORBITAL_CONFIG[image.orbitIndex];
                        // Calculate initial position
                        const centerX = 50;
                        const centerY = 50;
                        const radiusPercent = (orbit.radius / 1000) * 100;
                        const initialX = centerX + radiusPercent * Math.cos(image.startAngle);
                        const initialY = centerY + radiusPercent * Math.sin(image.startAngle);

                        return (
                            <div
                                key={index}
                                ref={el => imagesRef.current[index] = el}
                                className="absolute w-32 h-24 md:w-40 md:h-28 opacity-0"
                                style={{
                                    left: `${initialX}%`,
                                    top: `${initialY}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <div className="relative w-full h-full group">
                                    <img
                                        src={image.url}
                                        alt={image.title}
                                        className="w-full h-full object-cover rounded-lg shadow-2xl border border-white/10"
                                    />
                                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                        <p className="text-white text-xs md:text-sm font-bold px-2 text-center">
                                            {image.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
