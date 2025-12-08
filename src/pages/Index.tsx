import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import { Nav } from "@/components/vidana/Nav";
import { Hero } from "@/components/vidana/Hero";
import { BrandStrip } from "@/components/vidana/BrandStrip";
import { CinematicLoader } from "@/components/vidana/CinematicLoader";
import { Plasma } from "@/components/vidana/Plasma";
import { VidanaOverview } from "@/components/vidana/VidanaOverview";
import { VidanaServices } from "@/components/vidana/VidanaServices";
import { VidanaProjects } from "@/components/vidana/VidanaProjects";
import { VidanaStories } from "@/components/vidana/VidanaStories";

import { VidanaTeamSwiss } from "@/components/vidana/VidanaTeamSwiss";
import { VidanaTestimonials } from "@/components/vidana/VidanaTestimonials";
import Squares from "@/components/vidana/Squares";
import { ImagesGallery } from "@/components/vidana/ImagesGallery";

// Animations
import { ScrollToNext } from "@/components/animations/ScrollToNext";
import { AnimatedLogo } from "@/components/animations/SVGAnimation";
import { LottieScrollSection } from "@/components/animations/LottieScrollSection";
import { CarAnimationSection } from "@/components/vidana/CarAnimationSection";
import { FullWidthLottieSection } from "@/components/animations/FullWidthLottieSection";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  // Check if user has already seen the loader in this session
  const [isLoading, setIsLoading] = useState(() => {
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    return !hasSeenLoader; // Only show loader if not seen before
  });
  const [showNavLogo, setShowNavLogo] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Mark that user has seen the loader
      sessionStorage.setItem('hasSeenLoader', 'true');
      ScrollTrigger.refresh();
      setTimeout(() => setShowNavLogo(true), 800);
    }
  }, [isLoading]);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-accent-foreground overflow-x-hidden relative">
      {/* Loader Overlay */}
      {isLoading && <CinematicLoader onComplete={() => setIsLoading(false)} />}

      {/* Layered Background Effects */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <Plasma
          color="#ffffff"
          speed={4}
          direction="reverse"
          scale={1.5}
          opacity={5}
          mouseInteractive={false}
        />
      </div>

      <div className="relative z-10">
        <Nav showLogo={showNavLogo} />

        <main>
          {/* Hero */}
          <Hero />

          {/* Overview */}
          <div className="overflow-hidden">
            <VidanaOverview />
          </div>

          {/* Typing Animation Section */}
          <LottieScrollSection
            animationPath="/assets/Typing Animation.json"
            clipPathAnimation="circle"
            scrollDistance={1500}
            title="Digital Craftsmanship"
            subtitle="We meticulously craft every line of code and every pixel to create seamless digital experiences."
            autoplay={true}
            loop={true}
            className="my-32"
          />

          {/* Services */}
          <div className="overflow-hidden">
            <VidanaServices />
          </div>

          {/* Projects */}
          <div className="overflow-hidden">
            <VidanaProjects />
          </div>

          {/* Car Animation Section */}
          <CarAnimationSection
            animationPath="/assets/car vidana.json"
            title="Moving Forward"
            subtitle="Accelerating your digital transformation with speed and precision."
            className="my-32"
          />

          {/* Network Animation Section */}
          <FullWidthLottieSection
            animationPath="/assets/vidana's network.json"
            title="Global Connectivity"
            subtitle="Seamlessly connecting ideas, data, and people across the digital universe."
            className="my-32"
          />

          {/* Stories */}
          <div className="overflow-hidden">
            <VidanaStories />
          </div>

          {/* Images Gallery */}
          <div className="overflow-hidden">
            <ImagesGallery />
          </div>

          {/* Team */}
          <div className="overflow-hidden">
            <VidanaTeamSwiss />
          </div>

          {/* Brand strip */}
          <div className="overflow-hidden">
            <BrandStrip />
          </div>

          {/* Testimonials */}
          <div className="overflow-hidden">
            <VidanaTestimonials />
          </div>

          {/* Footer */}
          <footer
            id="contact"
            className="relative py-24 px-6 bg-transparent text-foreground overflow-hidden"
          >

            {/* Squares Background */}
            <div className="absolute inset-0 z-0 opacity-20">
              <Squares
                speed={0.5}
                squareSize={40}
                direction="diagonal"
                borderColor="#fff"
                hoverFillColor="#fff"
              />
            </div>

            <div className="container mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div>
                  <div className="flex items-center gap-6 mb-8">
                    <AnimatedLogo className="w-16 h-16 text-primary-foreground" />
                    <h2 className="text-[clamp(3rem,10vw,8rem)] font-display font-black leading-none">
                      LET&apos;S
                      <br />
                      TALK
                    </h2>
                  </div>
                  <a
                    href="mailto:info@vidanaconsulting.com"
                    className="text-2xl md:text-4xl hover:text-accent transition-colors"
                  >
                    info@vidanaconsulting.com
                  </a>
                </div>

                <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
                  <a href="#" className="hover:text-accent transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-accent transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-accent transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="mt-24 pt-8 border-t border-white/10 flex justify-between text-xs uppercase tracking-widest opacity-50">
                <span>© 2024 Vidana</span>
                <span>All Rights Reserved</span>
              </div>
            </div>

            {/* Spacer to allow scrolling past page end for navigation */}
            <div className="h-96" aria-hidden="true"></div>

            {/* Scroll to next page */}
            <ScrollToNext nextRoute="/about" />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
