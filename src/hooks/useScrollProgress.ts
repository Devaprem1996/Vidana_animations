import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom hook for tracking scroll progress
 * Returns a motion value from 0 to 1 based on element's scroll position
 */
export const useScrollProgress = () => {
    const scrollProgress = useMotionValue(0);
    const smoothProgress = useSpring(scrollProgress, {
        damping: 30,
        stiffness: 200
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = scrolled / scrollHeight;
            scrollProgress.set(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollProgress]);

    return smoothProgress;
};

/**
 * Custom hook for element scroll progress
 * Returns progress value (0-1) based on element's position in viewport
 */
export const useElementScrollProgress = () => {
    const ref = useRef<HTMLElement>(null);
    const scrollProgress = useMotionValue(0);
    const smoothProgress = useSpring(scrollProgress, {
        damping: 30,
        stiffness: 200
    });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate progress: 0 when element top is at viewport bottom, 1 when element bottom is at viewport top
            const scrolled = windowHeight - rect.top;
            const total = windowHeight + elementHeight;
            const progress = Math.max(0, Math.min(1, scrolled / total));

            scrollProgress.set(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollProgress]);

    return { ref, progress: smoothProgress };
};

/**
 * Custom hook for horizontal scroll progress
 * Useful for horizontal scroll sections
 */
export const useHorizontalScrollProgress = () => {
    const ref = useRef<HTMLElement>(null);
    const scrollProgress = useMotionValue(0);
    const smoothProgress = useSpring(scrollProgress, {
        damping: 30,
        stiffness: 200
    });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrollWidth = element.scrollWidth - element.clientWidth;
            const scrolled = element.scrollLeft;
            const progress = scrolled / scrollWidth;

            scrollProgress.set(progress);
        };

        element.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => element.removeEventListener('scroll', handleScroll);
    }, [scrollProgress]);

    return { ref, progress: smoothProgress };
};
