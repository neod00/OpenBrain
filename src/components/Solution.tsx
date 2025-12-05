'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Solution() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animate Text
            gsap.from(contentRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Animate Cards
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: 'top 85%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        { icon: Search, title: t('solution.step1.title'), description: t('solution.step1.desc') },
        { icon: PenTool, title: t('solution.step2.title'), description: t('solution.step2.desc') },
        { icon: Code2, title: t('solution.step3.title'), description: t('solution.step3.desc') },
        { icon: Rocket, title: t('solution.step4.title'), description: t('solution.step4.desc') },
    ];

    return (
        <section ref={containerRef} className="py-20 md:py-32 bg-deep-black text-white overflow-visible">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Left Content */}
                <div ref={contentRef} className="md:w-1/3 mb-12 md:mb-0">
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                        {t('solution.title')}
                    </h2>
                    <div className="w-20 h-2 bg-neon-cyan mb-8" />
                </div>

                {/* Right Cards */}
                <div ref={cardsRef} className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <step.icon className="w-10 h-10 text-neon-cyan mb-4" />
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
