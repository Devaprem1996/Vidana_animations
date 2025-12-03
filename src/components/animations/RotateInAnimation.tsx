import React from 'react';
import { motion } from 'framer-motion';

interface RotateInAnimationProps {
    children: React.ReactNode;
    axis?: 'x' | 'y' | 'z';
    degrees?: number;
    delay?: number;
    duration?: number;
    className?: string;
    perspective?: number;
}

export const RotateInAnimation: React.FC<RotateInAnimationProps> = ({
    children,
    axis = 'y',
    degrees = 90,
    delay = 0,
    duration = 0.8,
    className = '',
    perspective = 1200
}) => {
    const getInitialRotation = () => {
        switch (axis) {
            case 'x':
                return { rotateX: degrees };
            case 'y':
                return { rotateY: degrees };
            case 'z':
                return { rotateZ: degrees };
            default:
                return { rotateY: degrees };
        }
    };

    const variants = {
        hidden: {
            ...getInitialRotation(),
            opacity: 0
        },
        visible: {
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            opacity: 1,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <motion.div
            className={className}
            style={{ perspective }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};
