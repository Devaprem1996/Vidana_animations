import React from 'react';
import { motion } from 'framer-motion';

interface BounceAnimationProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    intensity?: number;
    className?: string;
}

export const BounceAnimation: React.FC<BounceAnimationProps> = ({
    children,
    delay = 0,
    duration = 0.8,
    intensity = 1,
    className = ''
}) => {
    const variants = {
        hidden: {
            y: -60 * intensity,
            opacity: 0,
            scale: 0.8
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration,
                delay,
                ease: [0.34, 1.56, 0.64, 1] as const, // Elastic easing for bounce effect
                opacity: {
                    duration: duration * 0.5
                }
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

export const BounceInItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ''
}) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: -30, scale: 0.8 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        ease: [0.34, 1.56, 0.64, 1] as const
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};
