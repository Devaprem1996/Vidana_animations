import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Custom hook for magnetic mouse effect
 * Elements are attracted to the cursor when nearby
 */
export const useMagneticEffect = (strength: number = 0.3) => {
    const ref = useRef<HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isHovered) return;

            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = (e.clientX - centerX) * strength;
            const distanceY = (e.clientY - centerY) * strength;

            x.set(distanceX);
            y.set(distanceY);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => {
            setIsHovered(false);
            x.set(0);
            y.set(0);
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovered, strength, x, y]);

    return { ref, x: xSpring, y: ySpring };
};

/**
 * Custom hook for parallax effect based on mouse position
 */
export const useMouseParallax = (intensity: number = 20) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const distanceX = (e.clientX - centerX) / centerX;
            const distanceY = (e.clientY - centerY) / centerY;

            x.set(distanceX * intensity);
            y.set(distanceY * intensity);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [intensity, x, y]);

    return { x: xSpring, y: ySpring };
};

/**
 * Custom hook for 3D tilt effect on hover
 */
export const useTiltEffect = (maxTilt: number = 15) => {
    const ref = useRef<HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isHovered) return;

            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;
            const rotateXValue = -((e.clientY - centerY) / (rect.height / 2)) * maxTilt;

            rotateX.set(rotateXValue);
            rotateY.set(rotateYValue);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => {
            setIsHovered(false);
            rotateX.set(0);
            rotateY.set(0);
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovered, maxTilt, rotateX, rotateY]);

    return { ref, rotateX: rotateXSpring, rotateY: rotateYSpring };
};

/**
 * Custom hook for scroll-based parallax
 */
export const useScrollParallax = (speed: number = 0.5) => {
    const ref = useRef<HTMLElement>(null);
    const y = useMotionValue(0);
    const ySpring = useSpring(y, { damping: 30, stiffness: 200 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.scrollY;
            const elementTop = rect.top + scrolled;
            const windowHeight = window.innerHeight;

            const scrollProgress = (scrolled - elementTop + windowHeight) / (windowHeight + rect.height);
            const yValue = scrollProgress * speed * 100;

            y.set(yValue);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, y]);

    return { ref, y: ySpring };
};

/**
 * Custom hook for animated counter
 */
export const useCounter = (target: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView) {
                    setIsInView(true);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [isInView]);

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const startValue = 0;

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, target, duration]);

    return { ref, count };
};

/**
 * Custom hook for ripple effect on click
 */
export const useRipple = () => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const createRipple = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples(prev => [...prev, { x, y, id }]);

        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== id));
        }, 600);
    };

    return { ripples, createRipple };
};
