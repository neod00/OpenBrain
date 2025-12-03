'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Clock, Zap } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export default function Problem() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(cardsRef.current.filter(Boolean),
                {
                    y: 50,
                    opacity: 0,
                    autoAlpha: 0,
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    y: 0,
                    opacity: 1,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const problems = [
        {
            icon: AlertTriangle,
            title: t('problem.card1.title'),
            description: t('problem.card1.desc'),
        },
        {
            icon: Clock,
            title: t('problem.card2.title'),
            description: t('problem.card2.desc'),
        },
        {
            icon: Zap,
            title: t('problem.card3.title'),
            description: t('problem.card3.desc'),
        },
    ];

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-deep-black text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent opacity-30" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-6xl font-bold mb-12 md:mb-20 text-center">
                    {t('problem.title')} <span className="text-neon-purple">{t('problem.chaos_highlight')}</span> {t('problem.title_suffix')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {problems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { if (el) cardsRef.current[index] = el; }}
                            className="group p-8 rounded-3xl bg-zinc-800 border border-white/40 hover:border-neon-purple hover:bg-zinc-700 shadow-lg hover:shadow-neon-purple/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <item.icon className="w-8 h-8 text-neon-purple" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-purple transition-colors duration-300">
                                {item.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
