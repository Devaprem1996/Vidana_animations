import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

interface StoryCardProps {
    client: string;
    result: string;
    resultLabel: string;
    category: string;
    description: string;
    color: string;
    index: number;
}

export const StoryCard: React.FC<StoryCardProps> = ({
    client,
    result,
    resultLabel,
    category,
    description,
    color,
    index
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [count, setCount] = useState(0);
    const targetNumber = parseFloat(result.replace(/[^0-9.]/g, ''));
    const suffix = result.replace(/[0-9.]/g, '');

    // 3D Tilt Effect (Subtle for large cards)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Reduced rotation for massive cards
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(cardRef.current, {
            rotateX,
            rotateY,
            duration: 0.8,
            ease: "power2.out",
            transformPerspective: 1000,
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        setIsHovered(false);

        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    };

    // Live Counter Animation
    useEffect(() => {
        if (isHovered) {
            let start = 0;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 4);

                setCount(start + (targetNumber - start) * ease);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        } else {
            setCount(targetNumber);
        }
    }, [isHovered, targetNumber]);

    return (
        <div
            className="w-screen h-screen flex-shrink-0 flex flex-col justify-center relative perspective-1000 snap-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className="group relative w-full h-full bg-black overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-30 transition-opacity duration-1000 blur-3xl -z-10`} />
                <div className="absolute inset-0 opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

                {/* Massive Background Typography (Parallax) */}
                <div className="absolute -right-[10vw] -bottom-[10vh] text-[30vw] font-black leading-none text-white/5 select-none pointer-events-none translate-z-10 transition-transform duration-700 group-hover:translate-x-10">
                    {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative h-full flex flex-col justify-between p-8 md:p-24 transform-style-3d">

                    {/* Top Bar */}
                    <div className="flex justify-between items-start translate-z-20 border-b border-white/10 pb-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                                Case Study
                            </span>
                            <span className="text-xl font-display font-bold text-white/80">
                                {category}
                            </span>
                        </div>

                        {/* Live Result Badge */}
                        <div className="flex flex-col items-end">
                            <div className={`text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
                                {isHovered ? count.toFixed(result.includes('.') ? 1 : 0) : targetNumber}{suffix}
                            </div>
                            <div className="text-sm font-bold uppercase tracking-widest text-white/40 mt-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                {resultLabel}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="translate-z-30 max-w-6xl">
                        <h3 className="text-[clamp(4rem,8vw,8rem)] font-display font-black leading-[0.9] mb-8 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-500">
                            {client}
                        </h3>
                        <p className="text-2xl md:text-4xl text-white/60 font-light leading-relaxed max-w-3xl group-hover:text-white/90 transition-colors duration-500">
                            {description}
                        </p>
                    </div>

                    {/* Footer / Interactive Element */}
                    <div className="translate-z-20 flex items-center gap-6 pt-8">
                        <div className="h-px w-full bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />
                        <button className="flex-shrink-0 px-10 py-5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-sm font-bold uppercase tracking-widest">
                            View Case Study
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
