import { motion } from 'framer-motion';

interface SVGAnimationProps {
    type?: 'draw' | 'morph' | 'float';
    children: React.ReactNode;
    duration?: number;
    delay?: number;
}

export const SVGAnimation: React.FC<SVGAnimationProps> = ({
    type = 'draw',
    children,
    duration = 2,
    delay = 0
}) => {
    const variants = {
        draw: {
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { duration, ease: 'easeInOut', delay },
                    opacity: { duration: 0.5, delay }
                }
            }
        },
        float: {
            hidden: { y: 0 },
            visible: {
                y: [-10, 10, -10],
                transition: {
                    duration: duration * 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay
                }
            }
        }
    };

    if (type === 'draw') {
        return (
            <motion.g
                variants={variants.draw}
                initial="hidden"
                animate="visible"
            >
                {children}
            </motion.g>
        );
    }

    if (type === 'float') {
        return (
            <motion.g
                variants={variants.float}
                initial="hidden"
                animate="visible"
            >
                {children}
            </motion.g>
        );
    }

    return <>{children}</>;
};

// Animated SVG Logo Component
export const AnimatedLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <SVGAnimation type="draw" duration={1.5}>
                <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                />
            </SVGAnimation>

            <SVGAnimation type="draw" duration={1.5} delay={0.5}>
                <motion.path
                    d="M 60 80 L 100 140 L 140 80"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </SVGAnimation>

            <SVGAnimation type="float" duration={3}>
                <motion.circle
                    cx="100"
                    cy="60"
                    r="5"
                    fill="currentColor"
                />
            </SVGAnimation>
        </svg>
    );
};
