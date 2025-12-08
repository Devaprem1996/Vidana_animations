import React, { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useInView } from 'framer-motion';

interface CarAnimationSectionProps {
    animationPath: string;
    className?: string;
    title?: string;
    subtitle?: string;
}

export const CarAnimationSection: React.FC<CarAnimationSectionProps> = ({
    animationPath,
    className = '',
    title,
    subtitle
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dotLottie, setDotLottie] = useState<any>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initial play when in view
    useEffect(() => {
        if (isInView && dotLottie) {
            dotLottie.play();
        } else if (!isInView && dotLottie) {
            dotLottie.pause();
        }
    }, [isInView, dotLottie]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleComplete = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Wait 5 seconds then play again
        timeoutRef.current = setTimeout(() => {
            if (dotLottie) {
                dotLottie.seek(0);
                dotLottie.play();
            }
        }, 5000);
    };

    const dotLottieRefCallback = (dotLottieInstance: any) => {
        setDotLottie(dotLottieInstance);
    };

    // Handle complete event via listener
    useEffect(() => {
        if (!dotLottie) return;

        const onComplete = () => {
            handleComplete();
        };

        dotLottie.addEventListener('complete', onComplete);

        return () => {
            dotLottie.removeEventListener('complete', onComplete);
        };
    }, [dotLottie]);

    return (
        <section ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
            <div className="w-full relative">
                {/* Full Width Animation Container */}
                <div className="w-full h-auto min-h-[50vh] md:min-h-[80vh] flex items-center justify-center bg-black">
                    <div className="w-full max-w-[1920px] mx-auto relative cursor-none pointer-events-none">
                        <DotLottieReact
                            src={animationPath}
                            loop={false}
                            autoplay={false}
                            dotLottieRefCallback={dotLottieRefCallback}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Optional Overlay Text */}
                {(title || subtitle) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center">
                        {title && (
                            <h2 className="text-4xl md:text-6xl lg:text-8xl font-display font-black text-white/90 mb-4 mix-blend-difference">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg md:text-2xl text-white/80 max-w-2xl mix-blend-difference font-light">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
