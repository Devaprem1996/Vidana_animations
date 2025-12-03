import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateInAnimation } from '@/components/animations/RotateInAnimation';

gsap.registerPlugin(ScrollTrigger);

export const VidanaOverview = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const stats = statsRef.current;

    const ctx = gsap.context(() => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      gsap.from(stats, {
        scrollTrigger: {
          trigger: stats,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      });

      // Counter animations
      gsap.from(stat2Ref.current, {
        scrollTrigger: {
          trigger: stats,
          start: "top 80%",
        },
        textContent: 0,
        duration: 2,
        delay: 0.6,
        snap: { textContent: 1 },
        onUpdate: function () {
          stat2Ref.current.textContent = Math.ceil(this.targets()[0].textContent) + "+";
        }
      });

      gsap.from(stat3Ref.current, {
        scrollTrigger: {
          trigger: stats,
          start: "top 80%",
        },
        textContent: 0,
        duration: 2,
        delay: 0.8,
        snap: { textContent: 1 },
        onUpdate: function () {
          stat3Ref.current.textContent = Math.ceil(this.targets()[0].textContent) + "%";
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Side - SVG Signature */}
          <div className="md:col-span-4 flex items-center justify-center">
            <svg
              width="300"
              height="160"
              viewBox="0 0 300 160"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-sm"
            >
              <style>
                {`
                  .signature {
                    fill: none;
                    stroke: #00c6ff;
                    stroke-width: 3;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-dasharray: 800;
                    stroke-dashoffset: 800;
                    animation: draw 4s ease-out forwards;
                  }

                  .glow {
                    filter: drop-shadow(0 0 8px rgba(0, 198, 255, 0.6));
                  }

                  .title {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro", "Inter", sans-serif;
                    font-size: 32px;
                    font-weight: 600;
                    letter-spacing: 0.16em;
                    fill: #f9fafb;
                  }

                  @keyframes draw {
                    0% {
                      stroke-dashoffset: 800;
                    }
                    80% {
                      stroke-dashoffset: 0;
                    }
                    100% {
                      stroke-dashoffset: 0;
                    }
                  }
                `}
              </style>

              {/* Text */}
              <text x="20" y="60" className="title">VIDANA</text>
              <text x="20" y="90" className="title" style={{ fontSize: '14px', opacity: 0.6 }}>
                FUTURE SYSTEMS LAB
              </text>

              {/* Signature / underline path */}
              <path
                className="signature glow"
                d="M20 105
                   Q 60 120 95 110
                   T 165 105
                   Q 190 103 210 115
                   T 260 105
                   Q 275 100 290 110"
              />
            </svg>
          </div>

          {/* Right Side - Content */}
          <div className="md:col-span-8">
            <h2 ref={titleRef} className="text-[clamp(2rem,5vw,4rem)] font-display font-bold leading-[1.1] mb-12">
              VIDANA IS A DIGITAL CONSULTANCY DRIVING TRANSFORMATION THROUGH DESIGN AND TECHNOLOGY.
            </h2>
            <div ref={textRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg leading-relaxed text-gray-500">
              <p>
                We were founded with a singular mission: to bridge the gap between complex business processes and elegant digital solutions. We don't just build software; we craft ecosystems.
              </p>
              <p>
                From our roots in RPA and AI to our expansion into global markets, our journey has been defined by a relentless pursuit of quality and innovation.
              </p>
            </div>

            <div ref={statsRef} className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-12 justify-between items-center">
              <RotateInAnimation axis="y" delay={0.6} duration={0.8}>
                <div>
                  <span ref={stat1Ref} className="block text-4xl font-display font-bold">2015</span>
                  <span className="text-sm uppercase tracking-widest">Founded</span>
                </div>
              </RotateInAnimation>
              <RotateInAnimation axis="y" delay={0.8} duration={0.8}>
                <div>
                  <span ref={stat2Ref} className="block text-4xl font-display font-bold">50+</span>
                  <span className="text-sm uppercase tracking-widest">Global Clients</span>
                </div>
              </RotateInAnimation>
              <RotateInAnimation axis="y" delay={1.0} duration={0.8}>
                <div>
                  <span ref={stat3Ref} className="block text-4xl font-display font-bold">200</span>
                  <span className="text-sm uppercase tracking-widest">Growth</span>
                </div>
              </RotateInAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
