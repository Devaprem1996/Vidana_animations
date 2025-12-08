import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface FullWidthLottieSectionProps {
    animationPath: string;
    className?: string;
    title?: string;
    subtitle?: string;
    loop?: boolean;
    autoplay?: boolean;
}

export const FullWidthLottieSection: React.FC<FullWidthLottieSectionProps> = ({
    animationPath,
    className = '',
    title,
    subtitle,
    loop = true,
    autoplay = true
}) => {
    return (
        <section className={`relative w-full overflow-hidden ${className}`}>
            <div className="w-full relative">
                {/* Full Width Animation Container */}
                <div className="w-full h-auto min-h-[50vh] md:min-h-[80vh] flex items-center justify-center bg-black">
                    <div className="w-full max-w-[1920px] mx-auto relative cursor-none pointer-events-none">
                        <DotLottieReact
                            src={animationPath}
                            loop={loop}
                            autoplay={autoplay}
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
