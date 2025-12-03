'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    'hero.from': 'From',
    'hero.to': 'To',
    'hero.subtitle': 'OpenBrain transforms complex challenges into streamlined digital solutions.',
    'hero.scroll': 'SCROLL',

    // Problem
    'problem.title': 'The',
    'problem.chaos_highlight': 'Chaos',
    'problem.title_suffix': 'Holding You Back',
    'problem.card1.title': 'Inefficient Workflows',
    'problem.card1.desc': 'Manual processes and disconnected systems creating bottlenecks in your daily operations.',
    'problem.card2.title': 'Resource Drain',
    'problem.card2.desc': 'Valuable time and talent wasted on repetitive tasks instead of high-value strategic work.',
    'problem.card3.title': 'Growth Stagnation',
    'problem.card3.desc': 'Inability to scale effectively due to technical debt and lack of automated systems.',

    // Solution
    'solution.title': 'The Path to Order',
    'solution.step1.title': 'Analyze',
    'solution.step1.desc': 'Deep dive diagnosis of current chaos.',
    'solution.step2.title': 'Architect',
    'solution.step2.desc': 'Designing optimized custom solutions.',
    'solution.step3.title': 'Implement',
    'solution.step3.desc': 'Building robust and scalable systems.',
    'solution.step4.title': 'Evolve',
    'solution.step4.desc': 'Continuous improvement for the future.',

    // Portfolio
    'portfolio.title': 'Selected Works',
    'portfolio.insightmatch.desc': 'AI-powered intelligent matching platform.',
    'portfolio.carbonmate.desc': 'Carbon footprint tracker for a sustainable future.',

    // CTA
    'cta.title': 'Ready to Bring',
    'cta.order_highlight': 'Order',
    'cta.title_suffix': 'to Your Chaos?',
    'cta.subtitle': 'Let\'s discuss how OpenBrain can transform your digital landscape.',
    'cta.button': 'Start a Project',
    'cta.footer': '© 2025 OpenBrain Inc. All rights reserved.',
},
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('ko');

    const t = (key: string) => {
        // @ts-ignore
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
