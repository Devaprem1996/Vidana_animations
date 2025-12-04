import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PARALLAX_SPEEDS, CINEMATIC_EASE } from '@/utils/ParallaxConfig';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
    children: ReactNode;
    speed?: number | keyof typeof PARALLAX_SPEEDS;
    direction?: 'vertical' | 'horizontal' | 'both';
    scale?: boolean;
    scaleAmount?: number;
    rotate?: boolean;
    rotateAmount?: number;
    opacity?: boolean;
    opacityRange?: [number, number];
    className?: string;
    triggerElement?: string | HTMLElement;
    start?: string;
    end?: string;
    ease?: string;
    disabled?: boolean;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
    children,
    speed = 0.5,
    direction = 'vertical',
    scale = false,
    scaleAmount = 0.2,
    rotate = false,
    rotateAmount = 5,
    opacity = false,
    opacityRange = [1, 0.5],
    className = '',
    triggerElement,
    start = 'top bottom',
    end = 'bottom top',
    ease = CINEMATIC_EASE.smooth,
    disabled = false,
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled || !elementRef.current) return;

        const element = elementRef.current;

        // Resolve speed if it's a key
        const resolvedSpeed = typeof speed === 'string'
            ? PARALLAX_SPEEDS[speed]
            : speed;

        // Calculate movement distances
        const yDistance = direction === 'vertical' || direction === 'both'
            ? (1 - resolvedSpeed) * 100
            : 0;
        const xDistance = direction === 'horizontal' || direction === 'both'
            ? (1 - resolvedSpeed) * 100
            : 0;

        // Build animation object
        const animationProps: gsap.TweenVars = {};

        if (direction === 'vertical' || direction === 'both') {
            animationProps.y = yDistance;
        }
        if (direction === 'horizontal' || direction === 'both') {
            animationProps.x = xDistance;
        }
        if (scale) {
            animationProps.scale = 1 + scaleAmount;
        }
        if (rotate) {
            animationProps.rotation = rotateAmount;
        }
        if (opacity) {
            animationProps.opacity = opacityRange[1];
        }

        // Create scroll trigger animation
        const ctx = gsap.context(() => {
            gsap.fromTo(
                element,
                {
                    y: direction === 'vertical' || direction === 'both' ? -yDistance / 2 : 0,
                    x: direction === 'horizontal' || direction === 'both' ? -xDistance / 2 : 0,
                    scale: scale ? 1 - scaleAmount / 2 : 1,
                    rotation: rotate ? -rotateAmount / 2 : 0,
                    opacity: opacity ? opacityRange[0] : 1,
                },
                {
                    ...animationProps,
                    ease,
                    scrollTrigger: {
                        trigger: triggerElement || element,
                        start,
                        end,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );
        }, element);

        return () => ctx.revert();
    }, [
        speed,
        direction,
        scale,
        scaleAmount,
        rotate,
        rotateAmount,
        opacity,
        opacityRange,
        triggerElement,
        start,
        end,
        ease,
        disabled,
    ]);

    return (
        <div ref={elementRef} className={className} style={{ willChange: 'transform' }}>
            {children}
        </div>
    );
};

// Preset parallax layers for common use cases
export const BackgroundParallax: React.FC<Omit<ParallaxLayerProps, 'speed'>> = (props) => (
    <ParallaxLayer speed="background" {...props} />
);

export const MidgroundParallax: React.FC<Omit<ParallaxLayerProps, 'speed'>> = (props) => (
    <ParallaxLayer speed="midground" {...props} />
);

export const ForegroundParallax: React.FC<Omit<ParallaxLayerProps, 'speed'>> = (props) => (
    <ParallaxLayer speed="foreground" {...props} />
);

export const SubtleParallax: React.FC<Omit<ParallaxLayerProps, 'speed'>> = (props) => (
    <ParallaxLayer speed="subtle" {...props} />
);
