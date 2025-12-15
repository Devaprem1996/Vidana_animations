import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface ScrollToNextProps {
    nextRoute?: string;
    threshold?: number;
}

const PAGE_ORDER = ['/', '/about', '/services', '/case-studies', '/']; // Loop back to home
const PAGE_NAMES: Record<string, string> = {
    '/': 'Home',
    '/about': 'About',
    '/services': 'Services',
    '/case-studies': 'Case Studies',
};

export const ScrollToNext: React.FC<ScrollToNextProps> = ({
    nextRoute,
    threshold = 50, // USER REQUEST: Reduced threshold to 50px (must scroll very deep) to fix "odds" of accidental trigger
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showIndicator, setShowIndicator] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (isTransitioning) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

            // Show indicator when within 500px of bottom
            setShowIndicator(distanceFromBottom <= 500);

            // Calculate progress (0-100)
            const scrollProgress = Math.max(0, Math.min(100, ((500 - distanceFromBottom) / 500) * 100));
            setProgress(scrollProgress);

            // Trigger transition when scrolled past threshold
            if (distanceFromBottom <= threshold && !isTransitioning) {
                const nextPage = nextRoute || getNextRoute(location.pathname);
                if (nextPage) {
                    triggerTransition(nextPage);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname, isTransitioning, threshold, nextRoute]);

    const triggerTransition = (nextPage: string) => {
        setIsTransitioning(true);

        if (nextPage.startsWith('#')) {
            // Hash navigation (Smooth Scroll)
            const targetId = nextPage.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Scroll immediately or with small delay for effect? Immediately for responsiveness.
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Reset state after scroll
                setTimeout(() => setIsTransitioning(false), 1000);
            } else {
                setIsTransitioning(false);
            }
            return;
        }

        // Cinematic transition animation for route change
        const tl = gsap.timeline({
            onComplete: () => {
                navigate(nextPage);
                setIsTransitioning(false);
            }
        });

        tl.to(transitionRef.current, {
            clipPath: "circle(150% at 50% 100%)",
            duration: 1.2,
            ease: "power4.inOut"
        });
    };

    const nextPage = nextRoute || getNextRoute(location.pathname);
    const nextPageName = nextPage ? PAGE_NAMES[nextPage] || 'Next' : null;

    return (
        <>
            {/* Transition Overlay */}
            <div
                ref={transitionRef}
                className="fixed inset-0 bg-black z-[9998] pointer-events-none"
                style={{ clipPath: "circle(0% at 50% 100%)" }}
            />

            {/* Scroll Indicator */}
            <AnimatePresence>
                {showIndicator && nextPageName && !isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.6, ease: "backOut" }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4"
                    >
                        {/* Next Page Label */}
                        <motion.div
                            className="text-center"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-2">
                                Continue Scrolling
                            </div>
                            <div className="text-2xl font-display font-bold text-white">
                                {nextPageName}
                            </div>
                        </motion.div>

                        {/* Progress Circle */}
                        <div className="relative w-20 h-20">
                            {/* Background Circle */}
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    className="text-white/10"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="45"
                                    cx="50"
                                    cy="50"
                                />
                                <motion.circle
                                    className="text-accent"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="45"
                                    cx="50"
                                    cy="50"
                                    strokeDasharray={`${2 * Math.PI * 45}`}
                                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                                    strokeLinecap="round"
                                    style={{
                                        filter: "drop-shadow(0 0 8px rgba(244,67,54,0.6))"
                                    }}
                                />
                            </svg>

                            {/* Animated Arrow */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg
                                    className="w-8 h-8 text-accent"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Progress Percentage */}
                        <motion.div
                            className="text-sm font-bold text-accent"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {Math.floor(progress)}%
                        </motion.div>

                        {/* Hint Text */}
                        <motion.div
                            className="text-xs uppercase tracking-wider text-white/30"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Scroll to Navigate
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

function getNextRoute(currentPath: string): string | null {
    const currentIndex = PAGE_ORDER.indexOf(currentPath);
    if (currentIndex >= 0 && currentIndex < PAGE_ORDER.length - 1) {
        return PAGE_ORDER[currentIndex + 1];
    }
    return null;
}
