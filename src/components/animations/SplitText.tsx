import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
    children: string;
    className?: string;
    type?: 'chars' | 'words' | 'lines';
    delay?: number;
    staggerDelay?: number;
    animation?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'rotateIn';
    once?: boolean;
}

/**
 * Component that splits text and animates each part individually
 */
export const SplitText: React.FC<SplitTextProps> = ({
    children,
    className = '',
    type = 'chars',
    delay = 0,
    staggerDelay = 0.03,
    animation = 'fadeInUp',
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
            { threshold: 0.2 }
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
    }, [once]);

    const splitText = () => {
        if (type === 'chars') {
            return children.split('').map((char, i) => (
                <span key={i} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                    {char}
                </span>
            ));
        } else if (type === 'words') {
            return children.split(' ').map((word, i) => (
                <span key={i} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                    {word}
                </span>
            ));
        } else {
            // lines
            return children.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                    {line}
                </span>
            ));
        }
    };

    const animations = {
        fadeInUp: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 }
        },
        rotateIn: {
            hidden: { opacity: 0, rotateX: -90 },
            visible: { opacity: 1, rotateX: 0 }
        }
    };

    const selectedAnimation = animations[animation];

    return (
        <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
            {splitText().map((part, i) => (
                <motion.span
                    key={i}
                    style={{ display: 'inline-block' }}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                    variants={selectedAnimation}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * staggerDelay,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    {part}
                </motion.span>
            ))}
        </div>
    );
};
