import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

interface CustomCursorProps {
    enabled?: boolean;
}

/**
 * Custom animated cursor that follows the mouse
 */
export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled = true }) => {
    const [cursorState, setCursorState] = useState<'default' | 'hover' | 'click'>('default');

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (!enabled || window.innerWidth < 768) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setCursorState('click');
        const handleMouseUp = () => setCursorState('default');

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover')
            ) {
                setCursorState('hover');
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover')
            ) {
                setCursorState('default');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        // Hide default cursor
        document.body.style.cursor = 'none';
        document.body.classList.add('custom-cursor-active');

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
            document.body.style.cursor = '';
            document.body.classList.remove('custom-cursor-active');
        };
    }, [enabled, cursorX, cursorY]);

    if (!enabled || window.innerWidth < 768) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="custom-cursor-dot"
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    x: '-50%',
                    y: '-50%'
                }}
                animate={{
                    scale: cursorState === 'click' ? 0.8 : cursorState === 'hover' ? 0.5 : 1
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Outer cursor ring */}
            <motion.div
                className="custom-cursor-ring"
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    x: '-50%',
                    y: '-50%'
                }}
                animate={{
                    scale: cursorState === 'hover' ? 1.5 : 1,
                    opacity: cursorState === 'click' ? 0.5 : 1
                }}
                transition={{ duration: 0.3 }}
            />
        </>
    );
};
