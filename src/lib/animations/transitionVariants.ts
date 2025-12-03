import { Variants } from 'framer-motion';

/**
 * Framer Motion animation variants library
 * Reusable animation configurations for consistent motion design
 */

// Fade animations
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Scale animations
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const scaleUp: Variants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 15
        }
    }
};

// Stagger container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

export const staggerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

// Stagger items
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Slide animations
export const slideInLeft: Variants = {
    hidden: { x: '-100%' },
    visible: {
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        x: '-100%',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const slideInRight: Variants = {
    hidden: { x: '100%' },
    visible: {
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        x: '100%',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Page transitions
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const curtainTransition: Variants = {
    initial: { scaleY: 0, originY: 0 },
    animate: {
        scaleY: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        scaleY: 0,
        originY: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Hover animations
export const hoverScale: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    }
};

export const hoverLift: Variants = {
    rest: { y: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hover: {
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    }
};

// 3D rotation
export const rotate3D: Variants = {
    rest: { rotateY: 0 },
    hover: {
        rotateY: 180,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Elastic animation
export const elasticIn: Variants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 10
        }
    }
};

// Reveal animations
export const revealLeft: Variants = {
    hidden: { x: '-100%' },
    visible: {
        x: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const revealUp: Variants = {
    hidden: { y: '100%' },
    visible: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Text reveal
export const textReveal: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};

// Easing functions
export const easings = {
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutExpo: [0.19, 1, 0.22, 1],
    custom: [0.22, 1, 0.36, 1]
} as const;
