'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight, Layers, Cpu } from 'lucide-react';

export default function Solution() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: '+=300%',
                    scrub: 1,
                    pin: true,
                },
            });

            // Phase 1: Slide in main concept
            tl.from(contentRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
            })
                // Phase 2: Reveal steps
                .from(cardsRef.current, {
                    y: 50,
                    opacity: 0,
                    stagger: 0.5,
                    duration: 2,
                })
                // Phase 3: Final polish (scale up slightly)
                .to(contentRef.current, {
                    scale: 1.05,
                    duration: 2,
                });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        {
            icon: Layers,
            title: 'Structure',
            description: 'We analyze your chaos and build a solid digital foundation.',
        },
        {
            icon: Cpu,
            title: 'Automation',
            description: 'Intelligent systems replace manual effort, freeing your team.',
        },
        {
            icon: CheckCircle2,
            title: 'Optimization',
            description: 'Continuous refinement for peak performance and scalability.',
        },
    ];

    return (
        <section ref={sectionRef} className="bg-deep-black text-white relative">
            <div ref={triggerRef} className="h-screen flex items-center justify-center overflow-hidden">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                    {/* Main Content */}
                    <div ref={contentRef} className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            Bringing <span className="text-neon-cyan">Order</span> to Your Business
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-lg">
                            Our systematic approach transforms complexity into clarity, turning your digital presence into a powerful asset.
                        </p>
                        <button className="group flex items-center gap-2 text-neon-cyan font-semibold hover:text-white transition-colors">
                            Learn about our process <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Steps Cards */}
                    <div className="flex-1 grid gap-6 w-full max-w-md">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors"
                            >
                                <div className="p-3 rounded-xl bg-neon-cyan/10 text-neon-cyan">
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-400 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Background Gradient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none -z-10" />
            </div>
        </section>
    );
}
