import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE_IMAGES = [
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548263594-a71eaa0033aa?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520183802803-06f731a2059f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop"
];

// Double the images for better density
const images = [...BASE_IMAGES, ...BASE_IMAGES];

const ConcentricCircles = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg viewBox="0 0 1000 1000" className="w-[150vmax] h-[150vmax] animate-[spin_60s_linear_infinite]">
            <circle cx="500" cy="500" r="100" fill="none" stroke="white" strokeWidth="1" className="opacity-10" />
            <circle cx="500" cy="500" r="200" fill="none" stroke="white" strokeWidth="1" className="opacity-10" />
            <circle cx="500" cy="500" r="300" fill="none" stroke="white" strokeWidth="1" className="opacity-20" />
            <circle cx="500" cy="500" r="400" fill="none" stroke="white" strokeWidth="1" className="opacity-20" />
            <circle cx="500" cy="500" r="500" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" className="opacity-30" />
            <circle cx="500" cy="500" r="600" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="20 20" className="opacity-30" />
            <circle cx="500" cy="500" r="700" fill="none" stroke="white" strokeWidth="1" className="opacity-10" />
        </svg>
    </div>
);

export const ImagesGallery = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        const imageElements = imagesRef.current;

        if (!container || !content || imageElements.length === 0) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=5000", // Increased distance for more breathing room
                    scrub: 1.5, // Smoother scrub
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Set initial state
            gsap.set(imageElements, {
                opacity: 0,
                scale: 0,
                xPercent: -50,
                yPercent: -50,
                x: 0,
                y: 0,
                filter: "blur(10px)"
            });

            // Animate each image
            imageElements.forEach((img, i) => {
                if (!img) return;

                // Distribute angles more evenly but with some random variance
                const angleStep = (Math.PI * 2) / imageElements.length;
                const baseAngle = i * angleStep;
                const variance = (Math.random() - 0.5) * 0.5; // Small variance
                const angle = baseAngle + variance;

                const distance = window.innerWidth * 0.6; // Fly out distance

                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;

                const randomRotate = (Math.random() - 0.5) * 60;

                const imageTl = gsap.timeline();

                imageTl
                    .to(img, {
                        opacity: 1,
                        scale: 1, // Mid-flight scale
                        filter: "blur(0px)",
                        duration: 0.5,
                        ease: "power2.out"
                    })
                    .to(img, {
                        x: endX,
                        y: endY,
                        scale: 3, // Final large scale
                        rotation: randomRotate,
                        duration: 4,
                        ease: "none" // Linear movement for space travel feel
                    }, "<") // Start move same time as appearing
                    .to(img, {
                        opacity: 0,
                        filter: "blur(20px)",
                        duration: 1,
                        ease: "power1.in"
                    }, "-=1"); // Fade out near end

                // Stagger the start of each image's timeline
                tl.add(imageTl, i * 0.25);
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative bg-black h-screen w-full overflow-hidden"
        >
            {/* Pinned Content Container */}
            <div
                ref={contentRef}
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
            >
                {/* SVG Background Layer */}
                <ConcentricCircles />

                {/* Stars Layer */}
                <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:30px_30px]"></div>

                {/* Center Text */}
                <div className="absolute z-10 text-center pointer-events-none mix-blend-difference">
                    <h2 className="text-[12vw] font-black text-white leading-none tracking-tighter opacity-10 blur-sm">
                        EXPLORE
                    </h2>
                </div>

                {/* Images Layer */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    {images.map((src, i) => (
                        <div
                            key={i}
                            ref={(el) => (imagesRef.current[i] = el)}
                            className="absolute w-[30vh] aspect-[3/4] origin-center rounded-lg overflow-hidden will-change-transform bg-zinc-900 shadow-2xl"
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${i + 1}`}
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
