import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import { Nav } from "@/components/vidana/Nav";
import { Hero } from "@/components/vidana/Hero";
import { BrandStrip } from "@/components/vidana/BrandStrip";
import { CinematicLoader } from "@/components/vidana/CinematicLoader";
import Squares from "@/components/vidana/Squares";
import { VidanaCycleAnimation } from "@/components/vidana/VidanaCycleAnimation";

// Animations
import { AnimatedLogo } from "@/components/animations/SVGAnimation";
import { LottieScrollSection } from "@/components/animations/LottieScrollSection";
import { CarAnimationSection } from "@/components/vidana/CarAnimationSection";
import { FullWidthLottieSection } from "@/components/animations/FullWidthLottieSection";

// Lazy load heavy components
const VidanaOverview = React.lazy(() => import("@/components/vidana/VidanaOverview").then(module => ({ default: module.VidanaOverview })));
const VidanaServices = React.lazy(() => import("@/components/vidana/VidanaServices").then(module => ({ default: module.VidanaServices })));
const VidanaProjects = React.lazy(() => import("@/components/vidana/VidanaProjects").then(module => ({ default: module.VidanaProjects })));
const VidanaStories = React.lazy(() => import("@/components/vidana/VidanaStories").then(module => ({ default: module.VidanaStories })));
const VidanaExpertise = React.lazy(() => import("@/components/vidana/VidanaExpertise").then(module => ({ default: module.VidanaExpertise })));
const VidanaTeamSwiss = React.lazy(() => import("@/components/vidana/VidanaTeamSwiss").then(module => ({ default: module.VidanaTeamSwiss })));
const VidanaTestimonials = React.lazy(() => import("@/components/vidana/VidanaTestimonials").then(module => ({ default: module.VidanaTestimonials })));
const ImagesGallery = React.lazy(() => import("@/components/vidana/ImagesGallery").then(module => ({ default: module.ImagesGallery })));


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


      <div className="relative z-10">
        <Nav showLogo={showNavLogo} />

        <main>
          {/* Hero - Kept eager for LCP */}
          <Hero />

          <React.Suspense fallback={<div className="h-screen w-full bg-black" />}>
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
              className="my-0"
            />

            {/* Services */}
            <div className="overflow-hidden">
              <VidanaExpertise />
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
              className="my-0"
            />

            {/* Network Animation Section */}
            <FullWidthLottieSection
              animationPath="/assets/vidana's network.json"
              title="Global Connectivity"
              subtitle="Seamlessly connecting ideas, data, and people across the digital universe."
              className="my-0"
            />

            {/* Stories */}
            <div className="overflow-hidden">
              <VidanaStories />
            </div>

            {/* Images Gallery */}
            <ImagesGallery />

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

            {/* Vidana Cycle Animation */}
            <VidanaCycleAnimation />

          </React.Suspense>

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
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
