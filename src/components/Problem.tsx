'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Clock, Zap } from 'lucide-react';

export default function Problem() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const problems = [
        {
            icon: AlertTriangle,
            title: 'Inefficient Workflows',
            description: 'Manual processes and disconnected systems creating bottlenecks in your daily operations.',
        },
        {
            icon: Clock,
            title: 'Resource Drain',
            description: 'Valuable time and talent wasted on repetitive tasks instead of high-value strategic work.',
        },
        {
            icon: Zap,
            title: 'Growth Stagnation',
            description: 'Inability to scale effectively due to technical debt and lack of automated systems.',
        },
    ];

    return (
        <section ref={sectionRef} className="py-32 bg-deep-black text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent opacity-30" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">
                    The <span className="text-neon-purple">Chaos</span> Holding You Back
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {problems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { if (el) cardsRef.current[index] = el; }}
                            className="group p-8 rounded-3xl bg-zinc-800 border border-white/30 hover:border-neon-purple hover:bg-zinc-700 shadow-lg hover:shadow-neon-purple/20 transition-all duration-500 hover:-translate-y-2"
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
