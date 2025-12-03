import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger animation configurations
 * Reusable scroll-based animation utilities
 */

export interface ScrollAnimationConfig {
    trigger: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    once?: boolean;
}

/**
 * Fade in element on scroll
 */
export const fadeInOnScroll = (
    element: string | HTMLElement,
    config?: Partial<ScrollAnimationConfig>
) => {
    return gsap.from(element, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: config?.trigger || element,
            start: config?.start || 'top 80%',
            end: config?.end || 'top 50%',
            toggleActions: 'play none none reverse',
            markers: config?.markers || false,
            ...config
        }
    });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerOnScroll = (
    elements: string | HTMLElement | HTMLElement[],
    config?: Partial<ScrollAnimationConfig>
) => {
    return gsap.from(elements, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: config?.trigger || elements,
            start: config?.start || 'top 80%',
            toggleActions: 'play none none reverse',
            markers: config?.markers || false,
            ...config
        }
    });
};

/**
 * Parallax effect
 */
export const parallaxScroll = (
    element: string | HTMLElement,
    speed: number = 0.5,
    config?: Partial<ScrollAnimationConfig>
) => {
    return gsap.to(element, {
        y: `${speed * 100}%`,
        ease: 'none',
        scrollTrigger: {
            trigger: config?.trigger || element,
            start: config?.start || 'top bottom',
            end: config?.end || 'bottom top',
            scrub: true,
            markers: config?.markers || false,
            ...config
        }
    });
};

/**
 * Scale on scroll
 */
export const scaleOnScroll = (
    element: string | HTMLElement,
    from: number = 0.8,
    to: number = 1,
    config?: Partial<ScrollAnimationConfig>
) => {
    return gsap.fromTo(
        element,
        { scale: from },
        {
            scale: to,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: config?.trigger || element,
                start: config?.start || 'top 80%',
                end: config?.end || 'top 30%',
                scrub: config?.scrub || false,
                markers: config?.markers || false,
                ...config
            }
        }
    );
};

/**
 * Horizontal scroll section
 */
export const horizontalScroll = (
    container: string | HTMLElement,
    sections: string | HTMLElement[],
    config?: Partial<ScrollAnimationConfig>
) => {
    const element = typeof container === 'string' ? document.querySelector(container) : container;
    if (!element) return;

    const scrollWidth = element.scrollWidth - window.innerWidth;

    return gsap.to(sections, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            start: config?.start || 'top top',
            end: config?.end || `+=${scrollWidth}`,
            scrub: 1,
            pin: config?.pin !== false,
            markers: config?.markers || false,
            ...config
        }
    });
};

/**
 * Pin section while scrolling
 */
export const pinSection = (
    element: string | HTMLElement,
    duration?: string,
    config?: Partial<ScrollAnimationConfig>
) => {
    return ScrollTrigger.create({
        trigger: element,
        start: config?.start || 'top top',
        end: config?.end || duration || '+=100%',
        pin: true,
        markers: config?.markers || false,
        ...config
    });
};

/**
 * Reveal text by lines
 */
export const revealTextLines = (
    element: string | HTMLElement,
    config?: Partial<ScrollAnimationConfig>
) => {
    return gsap.from(element, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: 'top center',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: config?.trigger || element,
            start: config?.start || 'top 80%',
            toggleActions: 'play none none reverse',
            markers: config?.markers || false,
            ...config
        }
    });
};

/**
 * Image reveal with clip-path
 */
export const imageReveal = (
    image: string | HTMLElement,
    direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom',
    config?: Partial<ScrollAnimationConfig>
) => {
    const clipPaths = {
        left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
        right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
        top: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
        bottom: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' }
    };

    return gsap.fromTo(
        image,
        { clipPath: clipPaths[direction].from },
        {
            clipPath: clipPaths[direction].to,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: config?.trigger || image,
                start: config?.start || 'top 75%',
                toggleActions: 'play none none reverse',
                markers: config?.markers || false,
                ...config
            }
        }
    );
};

/**
 * Count up numbers animation
 */
export const countUp = (
    element: string | HTMLElement,
    from: number,
    to: number,
    config?: Partial<ScrollAnimationConfig>
) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    return gsap.from({ value: from }, {
        value: to,
        duration: 2,
        ease: 'power1.out',
        onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].value).toString();
        },
        scrollTrigger: {
            trigger: config?.trigger || element,
            start: config?.start || 'top 80%',
            toggleActions: 'play none none reverse',
            markers: config?.markers || false,
            ...config
        }
    });
};

/**
 * Slide in from direction
 */
export const slideIn = (
    element: string | HTMLElement,
    direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
    distance: number = 100,
    config?: Partial<ScrollAnimationConfig>
) => {
    const props: any = { opacity: 0, duration: 1, ease: 'power3.out' };

    switch (direction) {
        case 'left':
            props.x = -distance;
            break;
        case 'right':
            props.x = distance;
            break;
        case 'top':
            props.y = -distance;
            break;
        case 'bottom':
            props.y = distance;
            break;
    }

    return gsap.from(element, {
        ...props,
        scrollTrigger: {
            trigger: config?.trigger || element,
            start: config?.start || 'top 80%',
            toggleActions: 'play none none reverse',
            markers: config?.markers || false,
            ...config
        }
    });
};

/**
 * Refresh all ScrollTriggers
 */
export const refreshScrollTriggers = () => {
    ScrollTrigger.refresh();
};

/**
 * Kill all ScrollTriggers
 */
export const killAllScrollTriggers = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};
