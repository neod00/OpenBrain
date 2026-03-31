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
        <section ref={containerRef} className="section-padding bg-deep-black text-white overflow-visible">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    {/* Left Sticky Content */}
                    <div ref={contentRef} className="lg:w-4/12 lg:sticky lg:top-32">
                        <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                            {t('solution.title')}
                        </h2>
                        <div className="w-24 h-1 bg-neon-cyan mb-8" />
                    </div>

                    {/* Right Timeline */}
                    <div ref={cardsRef} className="lg:w-8/12 w-full">
                        <div className="flex flex-col border-l-2 border-white/10 pl-8 md:pl-16 relative">
                            {steps.map((step, index) => (
                                <div key={index} className="relative pb-20 last:pb-0 group">
                                    {/* Timeline Node */}
                                    <div className="absolute left-[-2.1rem] md:left-[-4.1rem] top-2 w-4 h-4 rounded-full bg-deep-black border-2 border-white/30 group-hover:border-neon-cyan group-hover:bg-neon-cyan transition-all duration-500" />
                                    
                                    <span className="font-display text-neon-cyan text-sm tracking-widest uppercase mb-4 block">
                                        Phase 0{index + 1}
                                    </span>
                                    
                                    <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 group-hover:text-neon-cyan transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    
                                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light mb-8 max-w-2xl">
                                        {step.description}
                                    </p>
                                    
                                    <step.icon className="w-10 h-10 text-white/20 group-hover:text-neon-cyan transition-colors duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
