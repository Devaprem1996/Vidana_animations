import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import { Nav } from "@/components/vidana/Nav";
import { Hero } from "@/components/vidana/Hero";
import { BrandStrip } from "@/components/vidana/BrandStrip";
import { RunningAnimal } from "@/components/vidana/RunningAnimal";
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
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ScrollToNext } from "@/components/animations/ScrollToNext";
import { AnimatedLogo } from "@/components/animations/SVGAnimation";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "NEBULA",
    category: "Digital Product",
    image: "https://images.unsplash.com/photo-1480044965905-832759667f75?q=80&w=2681&auto=format&fit=crop",
  },
  {
    title: "HORIZON",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2553&auto=format&fit=crop",
  },
  {
    title: "KINETIC",
    category: "Web Experience",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "AETHER",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNavLogo, setShowNavLogo] = useState(false);

  useEffect(() => {
    if (!isLoading) {
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

          {/* Overview – polygon clip */}
          <RevealOnScroll animation="zoomIn" delay={0.1}>
            <div className="overflow-hidden animate-clip-clipFromCorners">
              <VidanaOverview />
            </div>
          </RevealOnScroll>

          {/* Services – circle zoom reveal */}
          <RevealOnScroll animation="zoomIn" delay={0}>
            <div className="overflow-hidden animate-clip-circle-zoom">
              <VidanaServices />
            </div>
          </RevealOnScroll>

          {/* Horizontal Scroll Sections */}
          <VidanaProjects />
          <VidanaStories />



          {/* Images Gallery – hexagon clip */}
          <RevealOnScroll animation="scaleIn" delay={0}>
            <div className="overflow-hidden animate-clip-hexagon">
              <ImagesGallery />
            </div>
          </RevealOnScroll>

          {/* Team – inset reveal */}
          <RevealOnScroll animation="fadeInUp" delay={0}>
            <div className="overflow-hidden animate-clip-inset">
              <VidanaTeamSwiss />
            </div>
          </RevealOnScroll>

          {/* Brand strip – ellipse reveal */}
          <RevealOnScroll animation="fadeInUp" delay={0}>
            <div className="overflow-hidden animate-clip-ellipse">
              <BrandStrip />
            </div>
          </RevealOnScroll>

          {/* Testimonials – diagonal reveal */}
          <RevealOnScroll animation="fadeInUp" delay={0}>
            <div className="overflow-hidden animate-clip-diagonal-up">
              <VidanaTestimonials />
            </div>
          </RevealOnScroll>

          {/* Footer – angle reveal */}
          <RevealOnScroll animation="fadeInUp" delay={0}>
            <footer
              id="contact"
              className="relative py-24 px-6 bg-transparent text-primary-foreground overflow-hidden animate-clip-angle-top"
            >
              <RunningAnimal />
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
                  <RevealOnScroll animation="fadeInUp">
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
                  </RevealOnScroll>

                  <RevealOnScroll animation="fadeInLeft" delay={0.2}>
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
                  </RevealOnScroll>
                </div>

                <div className="mt-24 pt-8 border-t border-white/10 flex justify-between text-xs uppercase tracking-widest opacity-50">
                  <span>© 2024 Vidana</span>
                  <span>All Rights Reserved</span>
                </div>
              </div>

              {/* Scroll to next page */}
              <ScrollToNext nextRoute="/about" />
            </footer>
          </RevealOnScroll>
        </main>
      </div>
    </div>
  );
};

export default Index;
