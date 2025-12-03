import React from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useAnimations';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

/**
 * Button with magnetic cursor attraction effect
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = '',
    strength = 0.3,
    onClick,
    type = 'button'
}) => {
    const { ref, x, y } = useMagneticEffect(strength);

    return (
        <motion.button
            ref={ref as any}
            type={type}
            className={className}
            onClick={onClick}
            style={{ x, y }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
            }}
        >
            {children}
        </motion.button>
    );
};
