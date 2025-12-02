'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight } from 'lucide-react';

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-deep-black text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div ref={contentRef} className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        Ready to Bring <span className="text-neon-cyan">Order</span> to Your Chaos?
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Let&apos;s discuss how OpenBrain can transform your digital landscape.
                    </p>

                    <a
                        href="mailto:contact@openbrain.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-deep-black rounded-full font-bold text-lg hover:bg-neon-cyan hover:scale-105 transition-all duration-300 group"
                    >
                        <Mail className="w-5 h-5" />
                        Start a Project
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 w-full py-8 text-center text-gray-600 text-sm">
                <p>&copy; {new Date().getFullYear()} OpenBrain. All rights reserved.</p>
            </footer>
        </section>
    );
}
