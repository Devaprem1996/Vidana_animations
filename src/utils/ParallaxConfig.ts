/**
 * Global Parallax Configuration
 * Defines speeds, easing, and settings for elegant parallax effects
 */

export const PARALLAX_SPEEDS = {
    // Background layers - slowest for maximum depth
    background: 0.3,
    backgroundSlow: 0.2,

    // Midground layers - medium speed
    midground: 0.6,
    midgroundSlow: 0.5,
    midgroundFast: 0.7,

    // Foreground layers - fastest, closest to user
    foreground: 1.2,
    foregroundFast: 1.4,

    // Special effects
    subtle: 0.15,
    dramatic: 0.8,
} as const;

export const CINEMATIC_EASE = {
    // Smooth, elegant transitions
    smooth: "power2.out",
    smoothIn: "power2.in",
    smoothInOut: "power2.inOut",

    // Dramatic, impactful
    dramatic: "power3.inOut",
    dramaticOut: "power3.out",

    // Gentle, subtle
    gentle: "power1.inOut",
    gentleOut: "power1.out",

    // Elastic, bouncy
    elastic: "elastic.out(1, 0.5)",

    // Back easing for overshoot
    back: "back.out(1.2)",
    backDramatic: "back.out(1.7)",
} as const;

export const SCROLL_CONFIG = {
    // Smooth scroll settings
    smoothness: 1.2, // Higher = smoother but slower response
    lerp: 0.08, // Linear interpolation factor (0-1)

    // Scroll trigger defaults
    scrub: 1, // Smooth scrubbing
    anticipatePin: 1,

    // Performance
    refreshPriority: 1,

    // Mobile optimizations
    mobile: {
        smoothness: 1.0,
        lerp: 0.1,
        reducedMotion: false, // Keep full effects on mobile
    },
} as const;

export const ZOOM_CONFIG = {
    // Zoom in effects
    zoomIn: {
        from: 0.8,
        to: 1.0,
        ease: CINEMATIC_EASE.smooth,
    },
    zoomInDramatic: {
        from: 0.6,
        to: 1.0,
        ease: CINEMATIC_EASE.dramatic,
    },

    // Zoom out effects
    zoomOut: {
        from: 1.2,
        to: 1.0,
        ease: CINEMATIC_EASE.smooth,
    },
    zoomOutDramatic: {
        from: 1.5,
        to: 1.0,
        ease: CINEMATIC_EASE.dramatic,
    },

    // Continuous zoom
    continuousZoom: {
        from: 1.0,
        to: 1.1,
        ease: CINEMATIC_EASE.gentle,
    },
} as const;

export const TRANSITION_CONFIG = {
    // Section overlap for smooth transitions
    overlapDistance: 150, // pixels

    // Fade transitions
    fadeDistance: 200,

    // Default durations (in seconds)
    duration: {
        fast: 0.3,
        normal: 0.6,
        slow: 1.0,
        cinematic: 1.5,
    },

    // Stagger timings
    stagger: {
        fast: 0.05,
        normal: 0.1,
        slow: 0.2,
    },
} as const;

export const LAYER_DEPTHS = {
    background: -3,
    midground: -2,
    content: -1,
    foreground: 0,
    overlay: 1,
} as const;

// Helper function to get parallax speed based on depth
export const getParallaxSpeed = (depth: keyof typeof LAYER_DEPTHS): number => {
    const depthValue = LAYER_DEPTHS[depth];

    switch (depthValue) {
        case -3: return PARALLAX_SPEEDS.background;
        case -2: return PARALLAX_SPEEDS.midground;
        case -1: return PARALLAX_SPEEDS.midgroundFast;
        case 0: return PARALLAX_SPEEDS.foreground;
        case 1: return PARALLAX_SPEEDS.foregroundFast;
        default: return 1;
    }
};

// Helper to check if device prefers reduced motion
export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Helper to get appropriate config for device
export const getDeviceConfig = () => {
    if (typeof window === 'undefined') return SCROLL_CONFIG;

    const isMobile = window.innerWidth < 768;

    return {
        ...SCROLL_CONFIG,
        ...(isMobile ? SCROLL_CONFIG.mobile : {}),
    };
};
