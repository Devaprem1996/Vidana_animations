import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipAnimationProps {
    frontContent: React.ReactNode;
    backContent?: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    triggerOnScroll?: boolean;
    triggerOnHover?: boolean;
    delay?: number;
    duration?: number;
    className?: string;
}

export const FlipAnimation: React.FC<FlipAnimationProps> = ({
    frontContent,
    backContent,
    direction = 'horizontal',
    triggerOnScroll = true,
    triggerOnHover = false,
    delay = 0,
    duration = 0.6,
    className = ''
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const variants = {
        hidden: {
            [direction === 'horizontal' ? 'rotateY' : 'rotateX']: 90,
            opacity: 0
        },
        visible: {
            [direction === 'horizontal' ? 'rotateY' : 'rotateX']: 0,
            opacity: 1,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        },
        flipped: {
            [direction === 'horizontal' ? 'rotateY' : 'rotateX']: 180,
            transition: {
                duration,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    const handleInteraction = () => {
        if (triggerOnHover && backContent) {
            setIsFlipped(!isFlipped);
        }
    };

    return (
        <motion.div
            className={className}
            style={{
                perspective: 1200,
                transformStyle: 'preserve-3d'
            }}
            initial={triggerOnScroll ? "hidden" : "visible"}
            whileInView={triggerOnScroll ? "visible" : undefined}
            animate={isFlipped ? "flipped" : "visible"}
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            onHoverStart={handleInteraction}
            onHoverEnd={handleInteraction}
        >
            <div style={{ backfaceVisibility: 'hidden' }}>
                {frontContent}
            </div>
            {backContent && (
                <div
                    style={{
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        transform: direction === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)'
                    }}
                >
                    {backContent}
                </div>
            )}
        </motion.div>
    );
};
