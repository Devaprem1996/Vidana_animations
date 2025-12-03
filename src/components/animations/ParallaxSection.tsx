import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxSectionProps {
    children: React.ReactNode;
    speed?: number;
    direction?: 'horizontal' | 'vertical';
    className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    speed = 0.5,
    direction = 'horizontal',
    className = ''
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const transform = useTransform(
        scrollYProgress,
        [0, 1],
        direction === 'horizontal'
            ? ['0%', `${-100 * speed}%`]
            : ['0%', `${100 * speed}%`]
    );

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                style={{
                    [direction === 'horizontal' ? 'x' : 'y']: transform
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

interface ParallaxItemProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

export const ParallaxItem: React.FC<ParallaxItemProps> = ({
    children,
    speed = 0.3,
    className = ''
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', `${100 * speed}%`]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
