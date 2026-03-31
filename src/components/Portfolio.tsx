'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
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
            preview: '/preview-insight-match.png',
            url: 'https://insight-match-ashen.vercel.app/index.html',
        },
        {
            title: 'GHG Protocol Calculation',
            description: t('portfolio.ghg.desc'),
            tech: ['Next.js', 'Supabase', 'Tailwind'],
            preview: '/preview-ghg-protocol.png',
            url: 'https://ghg-protocol-calculation.vercel.app/',
        },
        {
            title: 'Carbon Mate',
            description: t('portfolio.carbonmate.desc'),
            tech: ['React', 'Node.js', 'Data Viz'],
            preview: '/preview-carbon-mate.png',
            url: 'https://carbonmate.vercel.app/',
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
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-64 w-full relative overflow-hidden">
                                <Image
                                    src={project.preview}
                                    alt={`${project.title} preview`}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-deep-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            </a>

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
