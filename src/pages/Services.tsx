import React from 'react';
import { Nav } from '@/components/vidana/Nav';
import { ServicesHero } from '@/components/services/ServicesHero';
import { HorizontalServices } from '@/components/services/HorizontalServices';
import { ParallaxProcess } from '@/components/services/ParallaxProcess';
import { VideoShowcase } from '@/components/services/VideoShowcase';
import { BrandStrip } from '@/components/vidana/BrandStrip';
import { ScrollToNext } from '@/components/animations/ScrollToNext';

const Services = () => {
    return (
        <div className="bg-black min-h-screen text-white selection:bg-accent selection:text-black overflow-x-hidden relative">
            <Nav />

            <main>
                <ServicesHero />
                <HorizontalServices />
                <VideoShowcase />
                <ParallaxProcess />
                <BrandStrip />
            </main>

            {/* Spacer to allow scrolling past page end for navigation */}
            <div className="h-96" aria-hidden="true"></div>

            <ScrollToNext />
        </div>
    );
};

export default Services;
