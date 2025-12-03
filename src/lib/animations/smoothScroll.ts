import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

/**
 * Initialize Lenis smooth scroll
 */
export const initSmoothScroll = (options?: {
    duration?: number;
    easing?: (t: number) => number;
    smoothWheel?: boolean;
}) => {
    if (lenisInstance) return lenisInstance;

    lenisInstance = new Lenis({
        duration: options?.duration || 1.2,
        easing: options?.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        smoothWheel: options?.smoothWheel !== false,
        touchMultiplier: 2
    });

    function raf(time: number) {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return lenisInstance;
};

/**
 * Destroy Lenis instance
 */
export const destroySmoothScroll = () => {
    if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
    }
};

/**
 * Get current Lenis instance
 */
export const getSmoothScrollInstance = () => lenisInstance;

/**
 * Scroll to element smoothly
 */
export const scrollToElement = (target: string | HTMLElement, options?: {
    offset?: number;
    duration?: number;
}) => {
    if (!lenisInstance) return;

    lenisInstance.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration,
        lock: true
    });
};

/**
 * React hook for smooth scroll
 */
export const useSmoothScroll = (enabled: boolean = true) => {
    useEffect(() => {
        if (!enabled) return;

        const lenis = initSmoothScroll();

        return () => {
            destroySmoothScroll();
        };
    }, [enabled]);

    return lenisInstance;
};
