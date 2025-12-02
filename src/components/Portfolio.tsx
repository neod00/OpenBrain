'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                    },
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: index * 0.2,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const projects = [
        {
            title: 'Insight Match',
            description: 'AI-powered consultant matching platform connecting businesses with top-tier experts.',
            url: 'https://insight-match-ashen.vercel.app/',
            color: 'from-blue-500 to-cyan-500',
            tech: ['Next.js', 'AI Analysis', 'Matching Engine'],
        },
        {
            title: 'Carbon Mate',
            description: 'Comprehensive carbon footprint tracking and management solution for sustainable business.',
            url: 'https://carbonmate.vercel.app/',
            color: 'from-green-500 to-emerald-500',
            tech: ['React', 'Data Viz', 'Sustainability'],
        },
    ];

    return (
        <section ref={sectionRef} className="py-32 bg-deep-black text-white relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Work</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => { if (el) cardsRef.current[index] = el; }}
                            className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                        >
                            {/* Project Preview (Placeholder Gradient for now) */}
                            <div className={`h-64 w-full bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 relative overflow-hidden`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-white/20 group-hover:text-white/40 transition-colors">{project.title}</span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold">{project.title}</h3>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group-hover:scale-110 duration-300"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                    </a>
                                </div>

                                <p className="text-gray-400 mb-6 h-12">{project.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
