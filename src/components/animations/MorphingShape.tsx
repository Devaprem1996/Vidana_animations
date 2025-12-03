import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MorphingShapeProps {
    shapes?: string[];
    duration?: number;
    loop?: boolean;
    className?: string;
    color?: string;
}

const defaultShapes = [
    "M50,10 L90,90 L10,90 Z", // Triangle
    "M10,50 L50,10 L90,50 L50,90 Z", // Diamond
    "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 Z", // Circle
    "M10,10 L90,10 L90,90 L10,90 Z" // Square
];

export const MorphingShape: React.FC<MorphingShapeProps> = ({
    shapes = defaultShapes,
    duration = 2,
    loop = true,
    className = '',
    color = 'currentColor'
}) => {
    const [currentShapeIndex, setCurrentShapeIndex] = useState(0);

    useEffect(() => {
        if (!loop && currentShapeIndex >= shapes.length - 1) return;

        const interval = setInterval(() => {
            setCurrentShapeIndex(prev =>
                loop ? (prev + 1) % shapes.length : Math.min(prev + 1, shapes.length - 1)
            );
        }, duration * 1000);

        return () => clearInterval(interval);
    }, [currentShapeIndex, shapes.length, duration, loop]);

    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            style={{ overflow: 'visible' }}
        >
            <motion.path
                d={shapes[currentShapeIndex]}
                fill={color}
                animate={{ d: shapes[currentShapeIndex] }}
                transition={{
                    duration,
                    ease: [0.45, 0, 0.55, 1]
                }}
            />
        </svg>
    );
};

interface FloatingShapeProps {
    children: React.ReactNode;
    intensity?: number;
    duration?: number;
    className?: string;
}

export const FloatingShape: React.FC<FloatingShapeProps> = ({
    children,
    intensity = 20,
    duration = 3,
    className = ''
}) => {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-intensity, intensity, -intensity],
                x: [-intensity / 2, intensity / 2, -intensity / 2],
                rotate: [-5, 5, -5]
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    );
};
