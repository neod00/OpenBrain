'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    ko: {
        // Hero
        'hero.chaos': '혼돈',
        'hero.order': '질서',
        'hero.from': 'From',
        'hero.to': 'To',
        'hero.subtitle': '오픈브레인은 복잡한 문제를 명쾌한 디지털 솔루션으로 재탄생시킵니다.',
        'hero.scroll': 'SCROLL',

        // Problem
        'problem.title': '당신의 성장을 가로막는',
        'problem.chaos_highlight': '혼돈',
        'problem.card1.title': '비효율적인 업무 흐름',
        'problem.card1.desc': '수작업과 단절된 시스템으로 인해 발생하는 업무 병목 현상.',
        'problem.card2.title': '자원 낭비',
        'problem.card2.desc': '반복적인 업무에 낭비되는 소중한 시간과 인재, 이제는 핵심 전략에 집중해야 할 때입니다.',
        'problem.card3.title': '성장 정체',
        'problem.card3.desc': '기술 부채와 자동화 부재로 인한 확장성의 한계.',

        // Solution
        'solution.title': '질서를 향한 여정',
        'solution.step1.title': '분석',
        'solution.step1.desc': '현재의 혼돈을 심층적으로 진단합니다.',
        'solution.step2.title': '설계',
        'solution.step2.desc': '최적화된 맞춤형 아키텍처를 구상합니다.',
        'solution.step3.title': '구현',
        'solution.step3.desc': '견고하고 확장 가능한 시스템을 구축합니다.',
        'solution.step4.title': '진화',
        'solution.step4.desc': '지속적인 개선을 통해 미래를 준비합니다.',

        // Portfolio
        'portfolio.title': '우리의 작업',
        'portfolio.insightmatch.desc': 'AI 기반의 지능형 매칭 플랫폼.',
        'portfolio.carbonmate.desc': '지속 가능한 미래를 위한 탄소 발자국 추적기.',

        // CTA
        'cta.title': '혼돈을',
        'cta.order_highlight': '질서',
        'cta.title_suffix': '로 바꿀 준비가 되셨나요?',
        'cta.subtitle': '오픈브레인이 당신의 디지털 환경을 어떻게 혁신할 수 있는지 이야기해 봅시다.',
        'cta.button': '프로젝트 시작하기',
        'cta.footer': '© 2025 OpenBrain Inc. All rights reserved.',
    },
    en: {
        // Hero
        'hero.chaos': 'Chaos',
        'hero.order': 'Order',
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
