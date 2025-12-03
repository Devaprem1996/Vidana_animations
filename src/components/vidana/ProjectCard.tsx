import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTiltEffect } from '@/hooks/useAnimations';

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    className?: string;
}

export const ProjectCard = ({ title, category, image, className }: ProjectCardProps) => {
    const { ref, rotateX, rotateY } = useTiltEffect(10);

    return (
        <motion.div
            ref={ref as any}
            className={cn("group relative aspect-[4/5] overflow-hidden cursor-pointer bg-secondary", className)}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image with parallax effect */}
            <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
                style={{
                    transform: 'translateZ(20px)'
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Gradient overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            />

            {/* Shimmer effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            {/* Content */}
            <motion.div
                className="absolute bottom-0 left-0 p-8 z-10"
                style={{
                    transform: 'translateZ(40px)'
                }}
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <motion.span
                    className="block text-accent text-sm font-bold tracking-widest uppercase mb-2"
                    initial={{ x: -20, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                >
                    {category}
                </motion.span>
                <motion.h3
                    className="text-3xl font-display font-bold text-white"
                    initial={{ x: -20, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    {title}
                </motion.h3>
            </motion.div>

            {/* Corner accent */}
            <motion.div
                className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};
