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
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=200%',
                    scrub: 1,
                    pin: true,
                },
            });

            tl.from(contentRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
            })
                .from(cardsRef.current, {
                    y: 50,
                    opacity: 0,
                    stagger: 0.5,
                    duration: 2,
                })
                .to(contentRef.current, {
                    scale: 1.05,
                    duration: 2,
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
        <section ref={containerRef} className="h-screen bg-deep-black text-white flex items-center overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Left Content */}
                <div ref={contentRef} className="md:w-1/3">
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
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
