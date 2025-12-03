import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypeWriterProps {
    text: string;
    speed?: number;
    delay?: number;
    cursor?: boolean;
    className?: string;
    onComplete?: () => void;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
    text,
    speed = 50,
    delay = 0,
    cursor = true,
    className = '',
    onComplete
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById(`typewriter-${text.substring(0, 10)}`);
        if (element) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [text, isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const delayTimeout = setTimeout(() => {
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, speed);

                return () => clearTimeout(timeout);
            } else if (onComplete) {
                onComplete();
            }
        }, delay);

        return () => clearTimeout(delayTimeout);
    }, [currentIndex, text, speed, delay, isVisible, onComplete]);

    return (
        <span id={`typewriter-${text.substring(0, 10)}`} className={className}>
            {displayedText}
            {cursor && currentIndex < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block ml-1"
                >
                    |
                </motion.span>
            )}
        </span>
    );
};

interface CharacterRevealProps {
    text: string;
    delay?: number;
    staggerDelay?: number;
    className?: string;
}

export const CharacterReveal: React.FC<CharacterRevealProps> = ({
    text,
    delay = 0,
    staggerDelay = 0.03,
    className = ''
}) => {
    const characters = text.split('');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay
            }
        }
    };

    const charVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={charVariants}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};
