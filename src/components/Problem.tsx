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
        <section ref={sectionRef} className="section-padding bg-deep-black text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent opacity-30" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    {/* Sticky Sidebar Header */}
                    <div className="lg:w-5/12 lg:sticky lg:top-32">
                        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            {t('problem.title')} <br className="hidden lg:block" /><span className="text-neon-purple">{t('problem.chaos_highlight')}</span> {t('problem.title_suffix')}
                        </h2>
                    </div>

                    {/* Vertical List */}
                    <div className="lg:w-7/12 flex flex-col w-full">
                        {problems.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                                className="group flex flex-col sm:flex-row gap-6 sm:gap-10 items-start py-12 border-b border-white/10 first:pt-0 last:border-0"
                            >
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-neon-purple/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-neon-purple/20 transition-all duration-500">
                                    <item.icon className="w-8 h-8 text-neon-purple" />
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-neon-purple transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
