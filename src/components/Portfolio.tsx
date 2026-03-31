'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Portfolio() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: index * 0.2,
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const projects = [
        {
            title: 'Insight Match',
            description: t('portfolio.insightmatch.desc'),
            tech: ['Next.js', 'Python', 'AI'],
            color: 'from-blue-500 to-cyan-500',
            url: 'https://insight-match-ashen.vercel.app/index.html',
            previewUrl: 'https://insight-match-ashen.vercel.app/index.html'
        },
        {
            title: 'GHG Protocol Calculation',
            description: t('portfolio.ghg.desc'),
            tech: ['Next.js', 'Supabase', 'Tailwind'],
            color: 'from-green-600 to-teal-600',
            url: 'https://ghg-protocol-calculation.vercel.app/',
            previewUrl: 'https://ghg-protocol-calculation.vercel.app/'
        },
        {
            title: 'Carbon Mate',
            description: t('portfolio.carbonmate.desc'),
            tech: ['React', 'Node.js', 'Data Viz'],
            color: 'from-green-500 to-emerald-500',
            url: 'https://carbonmate.vercel.app/',
            previewUrl: 'https://carbonmate.vercel.app/'
        }
    ];

    return (
        <section ref={sectionRef} className="section-padding bg-deep-black text-white">
            <div className="container mx-auto px-6">
                <h2 className="font-display text-4xl md:text-7xl font-bold mb-16 md:mb-24 text-center">
                    {t('portfolio.title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => { if (el) cardsRef.current[index] = el; }}
                            className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                        >
                            <div className={`h-64 w-full relative overflow-hidden bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                                <div className="absolute inset-0 bg-deep-black/20 mix-blend-overlay" />
                                <span className="font-display text-white/30 font-bold text-4xl tracking-widest uppercase mix-blend-overlay">Preview</span>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-display text-2xl md:text-3xl font-bold">{project.title}</h3>
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
