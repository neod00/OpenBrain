'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Globe className="w-4 h-4 text-gray-300" />
            <div className="flex gap-2 text-sm font-medium">
                <button
                    onClick={() => setLanguage('ko')}
                    className={`transition-colors ${language === 'ko' ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    KO
                </button>
                <span className="text-gray-600">|</span>
                <button
                    onClick={() => setLanguage('en')}
                    className={`transition-colors ${language === 'en' ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    EN
                </button>
            </div>
        </div>
    );
}
