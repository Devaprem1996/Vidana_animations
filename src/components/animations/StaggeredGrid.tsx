import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredGridProps {
    children: React.ReactNode[];
    pattern?: 'wave' | 'spiral' | 'random' | 'sequential';
    staggerDelay?: number;
    className?: string;
    itemClassName?: string;
}

export const StaggeredGrid: React.FC<StaggeredGridProps> = ({
    children,
    pattern = 'wave',
    staggerDelay = 0.1,
    className = '',
    itemClassName = ''
}) => {
    const getDelay = (index: number, total: number) => {
        switch (pattern) {
            case 'wave':
                return index * staggerDelay;
            case 'spiral':
                // Spiral from center outward
                const center = Math.floor(total / 2);
                return Math.abs(index - center) * staggerDelay;
            case 'random':
                return Math.random() * (total * staggerDelay);
            case 'sequential':
            default:
                return index * staggerDelay;
        }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay
            }
        }
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div
                    key={index}
                    className={itemClassName}
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 40,
                            scale: 0.9
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                                delay: getDelay(index, children.length),
                                duration: 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94] as const
                            }
                        }
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};
