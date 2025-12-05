'use client';

import {
    useEffect,
    useRef,
    useState,
    ReactNode,
} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc: string;
    posterSrc?: string;
    bgImageSrc: string;
    title?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
}

const ScrollExpandMedia = ({
    mediaType = 'video',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}: ScrollExpandMediaProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobileState, setIsMobileState] = useState<boolean>(false);

    // Use Framer Motion's useScroll for smooth scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth transforms using Framer Motion
    const mediaScale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.5, 0]);
    const textTranslateX = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 0, 0.5, 1]);

    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const firstWord = title ? title.split(' ')[0] : '';
    const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

    return (
        <div
            ref={containerRef}
            className='relative h-[300vh] bg-black'
        >
            {/* Sticky container */}
            <div className='sticky top-0 h-screen w-full overflow-hidden'>
                {/* Background image */}
                <motion.div
                    className='absolute inset-0 z-0'
                    style={{ opacity: bgOpacity }}
                >
                    <img
                        src={bgImageSrc}
                        alt='Background'
                        className='w-full h-full object-cover object-center'
                    />
                    <div className='absolute inset-0 bg-black/20' />
                </motion.div>

                {/* Main content container */}
                <div className='relative z-10 h-full flex flex-col items-center justify-center px-6'>
                    {/* Media container */}
                    <motion.div
                        className='relative rounded-2xl overflow-hidden shadow-2xl'
                        style={{
                            scale: mediaScale,
                            width: isMobileState ? '90vw' : '70vw',
                            height: isMobileState ? '50vh' : '70vh',
                            maxWidth: '1400px',
                        }}
                    >
                        {mediaType === 'video' ? (
                            mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be') ? (
                                <iframe
                                    width='100%'
                                    height='100%'
                                    src={
                                        mediaSrc.includes('embed')
                                            ? mediaSrc +
                                            (mediaSrc.includes('?') ? '&' : '?') +
                                            'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                                            : mediaSrc.replace('watch?v=', 'embed/') +
                                            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                                            mediaSrc.split('v=')[1]
                                    }
                                    className='w-full h-full'
                                    frameBorder='0'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={mediaSrc}
                                    poster={posterSrc}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload='auto'
                                    className='w-full h-full object-cover'
                                    controls={false}
                                    disablePictureInPicture
                                    disableRemotePlayback
                                />
                            )
                        ) : (
                            <img
                                src={mediaSrc}
                                alt={title || 'Media content'}
                                className='w-full h-full object-cover'
                            />
                        )}

                        {/* Overlay gradient */}
                        <motion.div
                            className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20'
                            style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.6, 0.2]) }}
                        />
                    </motion.div>

                    {/* Title text */}
                    <motion.div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none ${textBlend ? 'mix-blend-difference' : ''
                            }`}
                        style={{ opacity: textOpacity }}
                    >
                        <div className='flex flex-col gap-4'>
                            <motion.h2
                                className='text-5xl md:text-7xl lg:text-8xl font-bold text-white'
                                style={{ x: useTransform(textTranslateX, (x) => -x) }}
                            >
                                {firstWord}
                            </motion.h2>
                            <motion.h2
                                className='text-5xl md:text-7xl lg:text-8xl font-bold text-white'
                                style={{ x: textTranslateX }}
                            >
                                {restOfTitle}
                            </motion.h2>
                        </div>

                        {date && (
                            <motion.p
                                className='text-xl md:text-2xl text-white/80 mt-6'
                                style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
                            >
                                {date}
                            </motion.p>
                        )}

                        {scrollToExpand && (
                            <motion.p
                                className='text-sm md:text-base text-white/60 mt-4 uppercase tracking-wider'
                                style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                            >
                                {scrollToExpand}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Content that appears at the end */}
                    <motion.div
                        className='absolute bottom-0 left-0 right-0 p-8 md:p-16'
                        style={{ opacity: contentOpacity }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ScrollExpandMedia;
