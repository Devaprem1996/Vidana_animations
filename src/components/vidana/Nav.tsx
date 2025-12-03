import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { MagneticButton } from '@/components/animations/MagneticButton';

export const Nav = ({ showLogo = true }: { showLogo?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to('.menu-overlay', {
                clipPath: 'circle(150% at calc(100% - 40px) 40px)',
                duration: 0.8,
                ease: 'power3.inOut'
            });
            gsap.fromTo('.menu-link',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.3 }
            );
        } else {
            document.body.style.overflow = '';
            gsap.to('.menu-overlay', {
                clipPath: 'circle(0% at calc(100% - 40px) 40px)',
                duration: 0.6,
                ease: 'power3.inOut'
            });
        }
    }, [isOpen]);

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Case Studies', href: '/case-studies' },
    ];

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center transition-all duration-300",
                    isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent mix-blend-difference text-white"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Logo */}
                <motion.div
                    className="cursor-pointer relative overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{ opacity: showLogo ? 1 : 0, pointerEvents: showLogo ? 'auto' : 'none', transition: 'opacity 0.5s ease-in-out' }}
                >
                    <motion.div
                        className="text-2xl font-bold tracking-tighter uppercase"
                        animate={{ y: isHovered ? -30 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        VIDANA
                    </motion.div>
                    <motion.div
                        className="text-2xl font-bold tracking-tighter uppercase absolute top-0 left-0"
                        initial={{ y: 30 }}
                        animate={{ y: isHovered ? 0 : 30 }}
                        transition={{ duration: 0.3 }}
                    >
                        VIDANA
                    </motion.div>
                </motion.div>

                {/* Desktop Menu Links */}
                <div className="hidden md:flex gap-8 items-center">
                    {menuItems.map((item, i) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors relative group"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            {item.label}
                            <motion.span
                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"
                            />
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <MagneticButton
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 md:hidden bg-transparent border-none cursor-hover"
                    strength={0.3}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isOpen ? 'close' : 'menu'}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isOpen ? <X size={32} /> : <Menu size={32} />}
                        </motion.div>
                    </AnimatePresence>
                </MagneticButton>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <div
                className="menu-overlay fixed inset-0 bg-primary z-40 flex items-center justify-center md:hidden"
                style={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            >
                <div className="flex flex-col gap-8 text-center">
                    {menuItems.map((item, i) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            className="menu-link text-6xl md:text-8xl font-display font-bold text-primary-foreground hover:text-accent transition-colors relative group"
                            onClick={() => setIsOpen(false)}
                            whileHover={{ scale: 1.1, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="relative">
                                {item.label}
                                <motion.span
                                    className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-1 bg-accent opacity-0 group-hover:opacity-100"
                                    initial={{ x: -10 }}
                                    whileHover={{ x: 0 }}
                                />
                            </span>
                        </motion.a>
                    ))}
                </div>

                {/* Menu background animation */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 1 }}
                />
            </div>
        </>
    );
};
