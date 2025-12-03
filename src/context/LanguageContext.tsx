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
        'hero.subtitle': '오픈브레인은 복잡한 비즈니스 과제를 명쾌한 디지털 솔루션으로 전환합니다.',
        'hero.scroll': 'SCROLL',

        // Problem
        'problem.title': '성장을 가로막는',
        'problem.chaos_highlight': '보이지 않는 장벽',
        'problem.title_suffix': '',
        'problem.card1.title': '비효율적인 워크플로우',
        'problem.card1.desc': '수작업과 단절된 시스템은 업무 병목을 초래하고 운영 효율을 떨어뜨립니다.',
        'problem.card2.title': '자원 누수',
        'problem.card2.desc': '반복 업무에 낭비되는 시간과 인력, 이제는 핵심 가치 창출에 집중해야 할 때입니다.',
        'problem.card3.title': '확장성의 한계',
        'problem.card3.desc': '기술 부채와 자동화의 부재는 비즈니스 확장의 가장 큰 걸림돌입니다.',

        // Solution
        'solution.title': '체계적인 솔루션 프로세스',
        'solution.step1.title': '진단 및 분석',
        'solution.step1.desc': '현재의 문제점과 비즈니스 요구사항을 심층적으로 분석합니다.',
        'solution.step2.title': '전략 및 설계',
        'solution.step2.desc': '최적화된 아키텍처와 맞춤형 솔루션을 설계합니다.',
        'solution.step3.title': '구축 및 구현',
        'solution.step3.desc': '견고하고 확장 가능한 시스템을 개발하고 구현합니다.',
        'solution.step4.title': '지속적 진화',
        'solution.step4.desc': '지속적인 모니터링과 개선을 통해 미래 변화에 대응합니다.',

        // Portfolio
        'portfolio.title': '주요 프로젝트',
        'portfolio.insightmatch.desc': '기업과 검증된 전문가를 연결하는 AI 기반 지능형 매칭 플랫폼.',
        'portfolio.carbonmate.desc': '지속 가능한 경영을 위한 기업용 탄소 배출량 추적 및 관리 솔루션.',

        // CTA
        'cta.title': '비즈니스의',
        'cta.order_highlight': '새로운 질서',
        'cta.title_suffix': '를 확립하세요',
        'cta.subtitle': '오픈브레인이 당신의 디지털 혁신 파트너가 되어드리겠습니다.',
        'cta.button': '무료 상담 신청하기',
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
