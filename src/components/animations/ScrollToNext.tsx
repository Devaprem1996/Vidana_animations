import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToNextProps {
    nextRoute?: string;
    threshold?: number;
}

const PAGE_ORDER = ['/', '/about', '/services', '/case-studies', '/lab'];
const PAGE_NAMES: Record<string, string> = {
    '/': 'Home',
    '/about': 'About',
    '/services': 'Services',
    '/case-studies': 'Case Studies',
    '/lab': 'Lab'
};

export const ScrollToNext: React.FC<ScrollToNextProps> = ({
    nextRoute,
    threshold = 50
}) => {
    const location = useLocation();
    const [showIndicator, setShowIndicator] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

            // Show indicator when within 300px of bottom
            setShowIndicator(distanceFromBottom <= 300);

            // Calculate progress (0-100)
            const scrollProgress = Math.max(0, Math.min(100, ((300 - distanceFromBottom) / 300) * 100));
            setProgress(scrollProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    const nextPage = nextRoute || getNextRoute(location.pathname);
    const nextPageName = nextPage ? PAGE_NAMES[nextPage] || 'Next' : null;

    return (
        <AnimatePresence>
            {showIndicator && nextPageName && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
                >
                    <div className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">
                        End of Page
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-32 h-1 bg-primary-foreground/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-accent"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-accent/50 text-xl"
                        >
                            ↓
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

function getNextRoute(currentPath: string): string | null {
    const currentIndex = PAGE_ORDER.indexOf(currentPath);
    if (currentIndex >= 0 && currentIndex < PAGE_ORDER.length - 1) {
        return PAGE_ORDER[currentIndex + 1];
    }
    return null;
}
