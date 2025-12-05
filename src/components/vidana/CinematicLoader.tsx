import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

interface CinematicLoaderProps {
    onComplete: () => void;
}

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<SVGCircleElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const bgLayersRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        // Simulate loading with realistic progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(onComplete, 300);
                }
            });

            // 1. Fade out counter and ring with parallax
            tl.to(counterRef.current, {
                opacity: 0,
                y: 50,
                scale: 0.8,
                duration: 0.6,
                ease: "power2.in"
            })
                .to(ringRef.current, {
                    opacity: 0,
                    scale: 1.5,
                    rotation: 180,
                    duration: 0.8,
                    ease: "power2.in"
                }, "<")

                // 2. Animate background layers with parallax
                .to(bgLayersRef.current, {
                    scale: 1.2,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power2.inOut"
                }, "-=0.4")

                // 3. Logo animation - scale and move to nav position
                .to(logoRef.current, {
                    scale: 0.3,
                    y: -window.innerHeight / 2 + 50,
                    x: -window.innerWidth / 2 + 100,
                    duration: 1.2,
                    ease: "power4.inOut"
                }, "-=0.8")

                // 4. Fade out entire container with clip-path reveal
                .to(containerRef.current, {
                    clipPath: "circle(0% at 10% 10%)",
                    duration: 1,
                    ease: "power3.inOut"
                }, "-=0.6");
        }
    }, [progress, onComplete]);

    // Update ring dashoffset smoothly
    useEffect(() => {
        if (ringRef.current) {
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (progress / 100) * circumference;
            gsap.to(ringRef.current, {
                strokeDashoffset: offset,
                duration: 0.3,
                ease: "power1.out"
            });
        }
    }, [progress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            style={{ clipPath: "circle(150% at 50% 50%)" }}
        >
            {/* Parallax Background Layers */}
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        ref={el => {
                            if (el) bgLayersRef.current[i] = el;
                        }}
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at ${50 + i * 10}% ${50 - i * 10}%, rgba(244,67,54,${0.1 - i * 0.02}) 0%, transparent 70%)`,
                            zIndex: i,
                        }}
                        initial={{ scale: 1 + i * 0.1, opacity: 0 }}
                        animate={{
                            scale: 1 + i * 0.1,
                            opacity: 0.8 - i * 0.15,
                            rotate: i * 5,
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Main Background */}
            <div className="absolute inset-0 bg-background z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                {/* Animated Particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-accent/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                {/* Rotating Ring with Glow */}
                <motion.svg
                    className="w-64 h-64 absolute -rotate-90"
                    viewBox="0 0 100 100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <circle
                        className="text-white/10"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    <circle
                        ref={ringRef}
                        className="text-accent"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45}`}
                        strokeLinecap="round"
                        style={{
                            filter: "drop-shadow(0 0 10px rgba(244,67,54,0.8))"
                        }}
                    />
                </motion.svg>

                {/* Logo with Parallax */}
                <motion.div
                    ref={logoRef}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                >
                    <motion.h1
                        className="text-6xl md:text-8xl font-display font-black tracking-tighter text-primary"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(244,67,54,0.3)",
                                "0 0 40px rgba(244,67,54,0.5)",
                                "0 0 20px rgba(244,67,54,0.3)",
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        VIDANA
                    </motion.h1>
                </motion.div>

                {/* Counter with Smooth Animation */}
                <motion.div
                    ref={counterRef}
                    className="absolute top-full mt-12 text-sm font-bold uppercase tracking-widest text-accent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <motion.span
                        key={Math.floor(progress)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {Math.floor(progress)}%
                    </motion.span>
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    className="absolute bottom-20 text-xs uppercase tracking-[0.3em] text-white/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    Loading Experience
                </motion.div>
            </div>
        </div>
    );
};
