import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type AnimationType =
    | "fadeIn"
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "scaleIn"
    | "scaleOut"
    | "rotateIn"
    | "rotateInLeft"
    | "rotateInRight"
    | "flipInX"
    | "flipInY"
    | "slideInUp"
    | "slideInDown"
    | "slideInLeft"
    | "slideInRight"
    | "zoomIn"
    | "zoomOut"
    | "bounceIn"
    | "fadeInScale"
    | "fadeInRotate"
    | "slideRotate";

interface RevealOnScrollProps {
    children: React.ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    threshold?: number;
    className?: string;
    once?: boolean;
}

/**
 * Wrapper component that reveals children when scrolled into view
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
    children,
    className = '',
    animation = 'fadeInUp',
    delay = 0,
    duration = 0.8,
    threshold = 0.2,
    once = true
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.disconnect();
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        observer.observe(element);

        // Fallback: ensure content becomes visible after a delay if not triggered
        const timeout = setTimeout(() => {
            if (!isVisible) {
                setIsVisible(true);
                if (once) observer.disconnect();
            }
        }, 1000); // 1 second fallback

        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, [threshold, once, isVisible]);

    const animations: Record<AnimationType, { hidden: any; visible: any }> = {
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        fadeInUp: {
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0 }
        },
        fadeInDown: {
            hidden: { opacity: 0, y: -60 },
            visible: { opacity: 1, y: 0 }
        },
        fadeInLeft: {
            hidden: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0 }
        },
        fadeInRight: {
            hidden: { opacity: 0, x: 60 },
            visible: { opacity: 1, x: 0 }
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        },
        scaleOut: {
            hidden: { opacity: 0, scale: 1.2 },
            visible: { opacity: 1, scale: 1 }
        },
        rotateIn: {
            hidden: { opacity: 0, rotate: -180, scale: 0.8 },
            visible: { opacity: 1, rotate: 0, scale: 1 }
        },
        rotateInLeft: {
            hidden: { opacity: 0, rotate: -90, x: -50 },
            visible: { opacity: 1, rotate: 0, x: 0 }
        },
        rotateInRight: {
            hidden: { opacity: 0, rotate: 90, x: 50 },
            visible: { opacity: 1, rotate: 0, x: 0 }
        },
        flipInX: {
            hidden: { opacity: 0, rotateX: -90 },
            visible: { opacity: 1, rotateX: 0 }
        },
        flipInY: {
            hidden: { opacity: 0, rotateY: -90 },
            visible: { opacity: 1, rotateY: 0 }
        },
        slideInUp: {
            hidden: { y: 100 },
            visible: { y: 0 }
        },
        slideInDown: {
            hidden: { y: -100 },
            visible: { y: 0 }
        },
        slideInLeft: {
            hidden: { x: -100 },
            visible: { x: 0 }
        },
        slideInRight: {
            hidden: { x: 100 },
            visible: { x: 0 }
        },
        zoomIn: {
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1 }
        },
        zoomOut: {
            hidden: { opacity: 0, scale: 1.5 },
            visible: { opacity: 1, scale: 1 }
        },
        bounceIn: {
            hidden: { opacity: 0, scale: 0.3, y: 50 },
            visible: { opacity: 1, scale: 1, y: 0 }
        },
        fadeInScale: {
            hidden: { opacity: 0, scale: 0.9, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 }
        },
        fadeInRotate: {
            hidden: { opacity: 0, rotate: -45, scale: 0.9 },
            visible: { opacity: 1, rotate: 0, scale: 1 }
        },
        slideRotate: {
            hidden: { x: -100, rotate: -20, opacity: 0 },
            visible: { x: 0, rotate: 0, opacity: 1 }
        }
    };

    const selectedAnimation = animations[animation];

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={selectedAnimation}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
};
