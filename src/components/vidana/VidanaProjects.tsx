import React from 'react';
import ScrollStack, { ScrollStackItem } from '../ScrollStack';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
    {
        id: 1,
        category: "Architecture",
        title: "Urban Heights",
        year: "2024",
        tags: ["Design", "Sustainability", "Future"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        description: "Redefining vertical living with sustainable ecosystems.",
        gradient: "from-purple-900/90 to-black"
    },
    {
        id: 2,
        category: "Tech Innovation",
        title: "Quantum Leap",
        year: "2024",
        tags: ["AI", "Processing", "Data"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        description: "Next-generation processing power for the AI era.",
        gradient: "from-blue-900/90 to-black"
    },
    {
        id: 3,
        category: "Brand Identity",
        title: "Neon Pulse",
        year: "2023",
        tags: ["Visual", "Motion", "Identity"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        description: "A vibrant identity system for the digital nightlife.",
        gradient: "from-pink-900/90 to-black"
    },
    {
        id: 4,
        category: "Digital Art",
        title: "Ether Void",
        year: "2023",
        tags: ["3D", "WebGL", "Interactive"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        description: "Immersive digital landscapes exploring the unknown.",
        gradient: "from-emerald-900/90 to-black"
    }
];

export const VidanaProjects = () => {
    return (
        <section className="bg-black text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-8 text-accent">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Selected Work
                    </div>
                    <h2 className="text-[clamp(3rem,8vw,7rem)] font-display font-black leading-[0.9] mb-6">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Projects</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl">
                        Explore our portfolio of transformative digital experiences
                    </p>
                </div>
            </div>

            {/* ScrollStack Container */}
            <ScrollStack
                itemDistance={150}
                itemScale={0.05}
                itemStackDistance={40}
                stackPosition="20%"
                scaleEndPosition="10%"
                baseScale={0.85}
                rotationAmount={2}
                blurAmount={7}
                useWindowScroll={true}
            >
                {PROJECTS.map((project) => (
                    <ScrollStackItem key={project.id}>
                        <div className="relative w-full h-full overflow-hidden bg-black">
                            {/* Background Image */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-90`} />

                            {/* Content */}
                            <div className="relative h-full flex items-center">
                                <div className="container mx-auto px-8 md:px-12">
                                    <div className="max-w-3xl">
                                        {/* Category & Year */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-accent text-sm font-bold uppercase tracking-[0.2em]">
                                                <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
                                                {project.category}
                                            </span>
                                            <span className="h-[1px] w-12 bg-white/20" />
                                            <span className="text-white/40 font-mono text-sm">{project.year}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-black leading-[0.9] mb-6">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-2xl">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-3 mb-10">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-4 py-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-full text-xs uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <button className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
                                            <span className="relative">
                                                View Project
                                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
                                            </span>
                                            <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Project ID Badge */}
                            <div className="absolute top-8 right-8 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/20 font-mono text-sm">
                                {String(project.id).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                            </div>
                        </div>
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section >
    );
};
