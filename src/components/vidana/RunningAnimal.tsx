import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cat } from 'lucide-react'; // Using Cat as the animal

export const RunningAnimal = () => {
    const animalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animal = animalRef.current;

        // Random movement animation
        const moveAnimal = () => {
            if (!animal) return;

            const x = Math.random() * (window.innerWidth - 50);
            const y = Math.random() * (window.innerHeight - 50);
            const duration = 2 + Math.random() * 3; // Random duration between 2-5s

            gsap.to(animal, {
                x: x,
                y: y,
                duration: duration,
                ease: "power1.inOut",
                onComplete: moveAnimal,
                rotate: Math.random() * 360 // Add some rotation for fun
            });
        };

        moveAnimal();

        // Cleanup
        return () => {
            gsap.killTweensOf(animal);
        };
    }, []);

    return (
        <div
            ref={animalRef}
            className="fixed z-50 pointer-events-none text-accent mix-blend-difference"
            style={{ left: 0, top: 0 }}
        >
            <Cat size={48} />
        </div>
    );
};
