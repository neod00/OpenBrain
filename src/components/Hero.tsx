'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.2,
            })
                .from(
                    subtitleRef.current,
                    {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                    },
                    '-=1'
                )
                .from(
                    scrollRef.current,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                    },
                    '-=0.5'
                );

            // Continuous animation for scroll indicator
            gsap.to(scrollRef.current, {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-deep-black text-white"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-neon-purple/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-neon-cyan/10 rounded-full blur-[120px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 leading-tight"
                >
                    From <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Chaos</span>
                    <br />
                    To <span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">Order</span>
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    OpenBrain Limited transforms complex challenges into streamlined digital solutions.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollRef}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
            >
                <span className="text-sm uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent" />
            </div>
        </section>
    );
}
