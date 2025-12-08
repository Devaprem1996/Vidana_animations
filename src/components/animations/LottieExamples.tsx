import React from 'react';
import { LottieScrollSection } from '@/components/animations/LottieScrollSection';

/**
 * Example usage of LottieScrollSection component with different clip path animations
 * 
 * Available clip path animations:
 * - 'hexagon': Expands from center point to hexagon shape
 * - 'circle': Expands from center point to full circle
 * - 'polygon': Slides up from bottom
 * - 'inset': Reveals from top to bottom
 * - 'ellipse': Expands from center as ellipse
 * - 'diagonal': Diagonal reveal effect
 */

export const LottieExamples = () => {
    return (
        <div className="bg-black">
            {/* Example 1: Hexagon Clip Path */}
            <LottieScrollSection
                animationPath="/assets/Office Team Work.json"
                clipPathAnimation="hexagon"
                scrollDistance={2000}
                title="Hexagon Reveal"
                subtitle="Watch as the animation reveals through a hexagon shape, creating a dynamic and modern effect."
                autoplay={true}
                loop={true}
            />

            {/* Example 2: Circle Clip Path */}
            <LottieScrollSection
                animationPath="/assets/Office Team Work.json"
                clipPathAnimation="circle"
                scrollDistance={1500}
                title="Circle Expand"
                subtitle="A smooth circular expansion that draws focus to the center of the animation."
                autoplay={true}
                loop={true}
            />

            {/* Example 3: Polygon Slide Up */}
            <LottieScrollSection
                animationPath="/assets/Office Team Work.json"
                clipPathAnimation="polygon"
                scrollDistance={1800}
                title="Slide Up Effect"
                subtitle="Classic slide-up reveal that creates a sense of upward motion and energy."
                autoplay={true}
                loop={true}
            />

            {/* Example 4: Inset Top to Bottom */}
            <LottieScrollSection
                animationPath="/assets/Office Team Work.json"
                clipPathAnimation="inset"
                scrollDistance={2000}
                title="Curtain Reveal"
                subtitle="Like opening a curtain, this effect reveals the animation from top to bottom."
                autoplay={true}
                loop={true}
            />

            {/* Example 5: Ellipse Expansion */}
            <LottieScrollSection
                animationPath="/assets/Office Team Work.json"
                clipPathAnimation="ellipse"
                scrollDistance={1600}
                title="Ellipse Growth"
                subtitle="An organic elliptical expansion that creates a soft, flowing reveal."
                autoplay={true}
                loop={true}
            />

            {/* Example 6: Diagonal Reveal */}
            <LottieScrollSection
                animationPath="/assets/Office Team Work.json"
                clipPathAnimation="diagonal"
                scrollDistance={2000}
                title="Diagonal Sweep"
                subtitle="A dynamic diagonal reveal that adds movement and direction to the animation."
                autoplay={true}
                loop={true}
            />
        </div>
    );
};

// Usage in your page:
// import { LottieExamples } from '@/components/animations/LottieExamples';
//
// function MyPage() {
//     return (
//         <div>
//             <LottieExamples />
//         </div>
//     );
// }
