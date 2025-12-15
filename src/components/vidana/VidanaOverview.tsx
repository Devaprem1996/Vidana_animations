import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundParallax, ParallaxLayer } from '@/components/animations/ParallaxLayer';
import { CINEMATIC_EASE, ZOOM_CONFIG } from '@/utils/ParallaxConfig';

gsap.registerPlugin(ScrollTrigger);

export const VidanaOverview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Zoom-in reveal effect
      gsap.fromTo(section,
        { scale: ZOOM_CONFIG.zoomIn.from, opacity: 0 },
        {
          scale: ZOOM_CONFIG.zoomIn.to,
          opacity: 1,
          ease: CINEMATIC_EASE.smooth,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );

      // SVG path animation
      const paths = section.querySelectorAll('.signature-path');
      paths.forEach((path, index) => {
        const length = (path as SVGPathElement).getTotalLength();

        gsap.fromTo(path,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
          },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: CINEMATIC_EASE.smooth,
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "top 20%",
              scrub: 1,
            },
            delay: index * 0.1,
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 bg-white text-black overflow-hidden"
      style={{
        transformOrigin: 'center center',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
      }}
    >
      {/* Background Parallax Layer */}
      <BackgroundParallax className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </BackgroundParallax>

      {/* Content with parallax */}
      <ParallaxLayer speed={0.7} className="container mx-auto relative z-10">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              (01) — Who We Are
            </span>
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-display font-black leading-none mb-6">
              VIDANA
            </h2>
          </div>

          {/* SVG Signature Animation */}
          <div className="flex justify-center mb-16">
            <svg
              width="600"
              height="300"
              viewBox="0 0 600 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-2xl"
            >
              {/* Animated signature paths */}
              <path
                className="signature-path"
                d="M 50 150 Q 100 50, 200 150 T 400 150"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                className="signature-path"
                d="M 420 100 L 450 200 L 480 100"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                className="signature-path"
                d="M 500 150 Q 520 100, 550 150"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Description */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-display font-bold mb-6">
                Transforming Ideas Into Digital Excellence
              </h3>
            </div>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                We are a digital consulting firm specializing in business process optimization,
                360° transformation, and innovative technology solutions.
              </p>
              <p>
                Our mission is to empower businesses through cutting-edge AI, RPA, and blockchain
                technologies while building sustainable talent pipelines.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { number: "150+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "15+", label: "Years Experience" },
              { number: "100%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-display font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">
                  {stat.number}
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParallaxLayer>
    </section>
  );
};
