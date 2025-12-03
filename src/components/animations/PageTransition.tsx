import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageTransitionProps {
    children: React.ReactNode;
    type?: 'fade' | 'slide' | 'scale' | 'curtain';
}

// Route order for determining slide direction
const ROUTE_ORDER = ['/', '/about', '/services', '/case-studies', '/lab'];

/**
 * Wrapper component for page transitions with directional awareness
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
    children,
    type = 'slide'
}) => {
    const location = useLocation();
    const prefersReducedMotion = useReducedMotion();
    const previousPath = useRef(location.pathname);
    const direction = useRef<'forward' | 'backward'>('forward');

    useEffect(() => {
        const prevIndex = ROUTE_ORDER.indexOf(previousPath.current);
        const currentIndex = ROUTE_ORDER.indexOf(location.pathname);

        if (prevIndex !== -1 && currentIndex !== -1) {
            direction.current = currentIndex > prevIndex ? 'forward' : 'backward';
        }

        previousPath.current = location.pathname;
    }, [location.pathname]);

    const transitions = {
        fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
        },
        slide: {
            initial: {
                x: direction.current === 'forward' ? '100%' : '-100%',
                opacity: 0
            },
            animate: { x: 0, opacity: 1 },
            exit: {
                x: direction.current === 'forward' ? '-100%' : '100%',
                opacity: 0
            },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
        },
        scale: {
            initial: { scale: 0.95, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 1.05, opacity: 0 },
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
        },
        curtain: {
            initial: { scaleY: 0, transformOrigin: 'top' },
            animate: { scaleY: 1 },
            exit: { scaleY: 0, transformOrigin: 'bottom' },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
        }
    };

    // Use fade for reduced motion preference
    const selectedTransition = prefersReducedMotion ? transitions.fade : transitions[type];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={selectedTransition.initial}
                animate={selectedTransition.animate}
                exit={selectedTransition.exit}
                transition={selectedTransition.transition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
