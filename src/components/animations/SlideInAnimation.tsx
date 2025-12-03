import React from 'react';
import { motion } from 'framer-motion';

interface SlideInAnimationProps {
    children: React.ReactNode;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    stagger?: boolean;
    staggerDelay?: number;
}

export const SlideInAnimation: React.FC<SlideInAnimationProps> = ({
    children,
    direction = 'left',
    delay = 0,
    duration = 0.8,
    distance = 100,
    className = '',
    stagger = false,
    staggerDelay = 0.1
}) => {
    const directionVariants = {
        left: { x: -distance, opacity: 0 },
        right: { x: distance, opacity: 0 },
        top: { y: -distance, opacity: 0 },
        bottom: { y: distance, opacity: 0 }
    };

    const variants = {
        hidden: directionVariants[direction],
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
                ...(stagger && {
                    staggerChildren: staggerDelay,
                    delayChildren: delay
                })
            }
        }
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export const SlideInItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ''
}) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
        >
            {children}
        </motion.div>
    );
};
