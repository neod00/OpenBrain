'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useLanguage } from '@/context/LanguageContext';

export type MotionVariant = 'insight' | 'ghg' | 'carbonmate' | 'cbamy';

type Query = (selector: string) => Element[];
type Build = (q: Query) => gsap.core.Timeline;

const FONT = 'var(--font-space), var(--font-jakarta), "Pretendard", sans-serif';

/**
 * Builds a looping timeline for an SVG scene. The loop only runs while the
 * scene is on screen, and users who prefer reduced motion see the finished
 * frame (label "hold") without animation.
 */
function useSceneTimeline(build: Build, rebuildKey?: string) {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;
        gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

        const mm = gsap.matchMedia();
        mm.add(
            {
                reduce: '(prefers-reduced-motion: reduce)',
                motion: '(prefers-reduced-motion: no-preference)',
            },
            (ctx) => {
                const tl = build(gsap.utils.selector(root));
                tl.pause();
                if (ctx.conditions?.reduce) {
                    tl.seek('hold', false); // false: fire onUpdate so counters show final values
                    return;
                }
                const st = ScrollTrigger.create({
                    trigger: root,
                    start: 'top bottom',
                    end: 'bottom top',
                    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
                });
                if (st.isActive) tl.play();
            },
            root,
        );

        return () => mm.revert();
    }, [build, rebuildKey]);

    return ref;
}

function Backdrop({ id, tint }: { id: string; tint: string }) {
    return (
        <>
            <defs>
                <pattern id={`${id}-dots`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
                </pattern>
                <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="70%">
                    <stop offset="0%" stopColor={tint} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={tint} stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="640" height="360" fill="#0e0e12" />
            <rect width="640" height="360" fill={`url(#${id}-glow)`} />
            <rect width="640" height="360" fill={`url(#${id}-dots)`} />
        </>
    );
}

function setCounter(el: Element | undefined, text: string) {
    if (el) el.textContent = text;
}

/* ------------------------------------------------------------------ */
/* Insight Match — scattered ISO standards collapse into the diagnosis  */
/* panel, a cursor picks conditions, ranked consultant cards rise.      */
/* Palette and layout follow the live InsightMatch hero widget.         */
/* ------------------------------------------------------------------ */

const IM = {
    bg: '#0e0f0c',
    panel: '#151712',
    card: '#1c1e19',
    lime: '#c3fb79',
    ink: '#f3f4ee',
    muted: 'rgba(243,244,238,0.55)',
    line: 'rgba(243,244,238,0.1)',
};
const IM_FONT = '"Pretendard Variable", "Pretendard", var(--font-jakarta), sans-serif';

const IM_PANEL = { x: 24, y: 60, w: 190, h: 268 };
const IM_CHIP_H = 22;
const IM_GROUP_Y = [120, 170, 220]; // chip row tops for STANDARD / INDUSTRY / REGION
const IM_BTN = { x: 40, y: 274, w: 158, h: 34 };
const IM_CARD = { y: 90, w: 122, h: 192, gap: 11, x0: 228 };
const IM_COMPARE = { y: 294, h: 34 };

const IM_CONSULTANTS = [
    { initials: 'KJ', name: 'K.J.', fit: 97, years: { ko: '경력 14년', en: '14 yrs' } },
    { initials: 'PS', name: 'P.S.', fit: 94, years: { ko: '경력 11년', en: '11 yrs' } },
    { initials: 'LH', name: 'L.H.', fit: 92, years: { ko: '경력 9년', en: '9 yrs' } },
];

const IM_COPY = {
    ko: {
        window: 'InsightMatch · ISO 진단',
        title: 'ISO 진단',
        groups: [
            { en: 'STANDARD', label: '인증 규격', chips: ['ISO 9001', 'ISO 14001'] },
            { en: 'INDUSTRY', label: '업종', chips: ['제조업', '건설', 'IT'] },
            { en: 'REGION', label: '지역', chips: ['전국', '서울', '경기'] },
        ],
        button: '이 조건으로 진단 시작',
        header: '추천 컨설턴트',
        headerSub: 'ISO 9001 · 제조업 · 전국',
        fit: '적합도',
        checks: '확인한 기준',
        compare: '후보의 범위·일정·견적을 한 표에서 비교',
    },
    en: {
        window: 'InsightMatch · ISO Diagnosis',
        title: 'ISO Diagnosis',
        groups: [
            { en: 'STANDARD', label: '', chips: ['ISO 9001', 'ISO 14001'] },
            { en: 'INDUSTRY', label: '', chips: ['Manufacturing', 'IT'] },
            { en: 'REGION', label: '', chips: ['Nationwide', 'Seoul'] },
        ],
        button: 'Start diagnosis',
        header: 'Recommended',
        headerSub: 'ISO 9001 · Manufacturing · Nationwide',
        fit: 'Fit',
        checks: 'Verified',
        compare: 'Compare scope, timeline & quote side by side',
    },
};

// Scattered ISO standard tags for the opening "chaos" beat: [centerX, centerY, rotation].
const IM_CHAOS: [string, number, number, number][] = [
    ['ISO 9001', 300, 108, -12],
    ['ISO 14001', 440, 96, 8],
    ['ISO 45001', 566, 128, -6],
    ['ISO/IEC 27001', 276, 190, 14],
    ['ISO 50001', 404, 176, -10],
    ['ISO 14067', 544, 202, 6],
    ['ISO 22000', 300, 262, -8],
    ['ISO 13485', 432, 250, 12],
    ['IATF 16949', 568, 278, -14],
    ['ISO 42001', 352, 316, 5],
    ['ISO 37001', 486, 318, -5],
    ['ISO 22301', 482, 56, 10],
];

function imTextWidth(label: string, size: number) {
    let w = 0;
    for (const ch of label) w += ch.charCodeAt(0) > 0x3000 ? size : size * 0.58;
    return w;
}

function imChipRow(chips: string[]) {
    const widths = chips.map((c) => Math.round(imTextWidth(c, 11) + 22));
    return chips.map((label, i) => ({
        label,
        w: widths[i],
        x: IM_PANEL.x + 16 + widths.slice(0, i).reduce((a, b) => a + b + 6, 0),
    }));
}

function imCheckPath(cx: number, cy: number) {
    return `M${cx - 3.5} ${cy} l2.5 2.5 l4.5 -5`;
}

const buildInsight: Build = (q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, defaults: { ease: 'power3.out' } });
    const stage = q('[data-stage]');
    const cursor = q('[data-cursor]');
    const picks = q('[data-pick]');
    const ripples = q('[data-ripple]');
    const scores = q('[data-score]');
    const counters = IM_CONSULTANTS.map(() => ({ v: 0 }));
    const at = (el: Element, attr: string) => Number(el.getAttribute(attr));

    tl.fromTo(stage, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' }, 0)
        // Chaos: standards pop in scattered and drift.
        .fromTo(
            q('[data-chaos]'),
            { opacity: 0, scale: 0.6, x: 0, y: 0, rotation: (i: number) => IM_CHAOS[i][3], transformOrigin: '50% 50%' },
            { opacity: 0.75, scale: 1, duration: 0.5, stagger: { each: 0.04, from: 'random' } },
            0.1,
        )
        .to(q('[data-chaos]'), { x: (i: number) => ((i * 29) % 24) - 12, y: (i: number) => ((i * 17) % 20) - 10, duration: 0.8, ease: 'sine.inOut' }, 0.5)
        // Order: they collapse into the diagnosis panel.
        .to(
            q('[data-chaos]'),
            {
                x: (i: number) => IM_PANEL.x + IM_PANEL.w / 2 - IM_CHAOS[i][1],
                y: (i: number) => 150 - IM_CHAOS[i][2],
                rotation: 0,
                scale: 0.3,
                opacity: 0,
                duration: 0.7,
                ease: 'power2.in',
                stagger: 0.03,
            },
            1.3,
        )
        .fromTo(q('[data-panel]'), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6 }, 1.5)
        .fromTo(cursor, { x: 340, y: 230, opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.0);

    // Cursor visits each selected chip, then the start button.
    picks.forEach((pick, i) => {
        const t = 2.2 + i * 0.55;
        const cx = at(pick, 'data-cx');
        const cy = at(pick, 'data-cy');
        tl.to(cursor, { x: cx, y: cy, duration: 0.4, ease: 'power2.inOut' }, t)
            .fromTo(ripples[i], { opacity: 0.8, scale: 0.2, transformOrigin: '50% 50%' }, { opacity: 0, scale: 1.6, duration: 0.5, ease: 'power1.out' }, t + 0.4)
            .fromTo(cursor, { scale: 1 }, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1, ease: 'none' }, t + 0.38);
        const isButton = pick.hasAttribute('data-btn');
        if (isButton) {
            tl.fromTo(pick, { scale: 1, transformOrigin: '50% 50%' }, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'none' }, t + 0.38);
        } else {
            tl.fromTo(pick.querySelector('rect'), { fill: 'rgba(195,251,121,0)', stroke: 'rgba(243,244,238,0.18)' }, { fill: IM.lime, stroke: IM.lime, duration: 0.2 }, t + 0.4).fromTo(
                pick.querySelector('text'),
                { fill: IM.ink },
                { fill: IM.bg, duration: 0.2 },
                t + 0.4,
            );
        }
    });

    const resultsAt = 2.2 + picks.length * 0.55 + 0.2;
    tl.to(cursor, { opacity: 0, x: '+=40', y: '+=30', duration: 0.4 }, resultsAt)
        .fromTo(q('[data-header]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, resultsAt)
        .fromTo(q('[data-card]'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, resultsAt + 0.1)
        .fromTo(q('[data-fitbar]'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: (i: number) => IM_CONSULTANTS[i].fit / 100, duration: 1.1, stagger: 0.12, ease: 'power2.out' }, resultsAt + 0.4);
    counters.forEach((c, i) => {
        tl.fromTo(
            c,
            { v: 0 },
            {
                v: IM_CONSULTANTS[i].fit,
                duration: 1.1,
                ease: 'power2.out',
                onUpdate: () => setCounter(scores[i], String(Math.round(c.v))),
            },
            resultsAt + 0.4 + i * 0.12,
        );
    });
    tl.fromTo(q('[data-check]'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(2.5)' }, resultsAt + 0.9)
        .fromTo(q('[data-best]'), { stroke: IM.line }, { stroke: IM.lime, duration: 0.4 }, resultsAt + 1.5)
        .fromTo(q('[data-compare]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, resultsAt + 1.6)
        .addLabel('hold', resultsAt + 2.2)
        .to(stage, { opacity: 0, duration: 0.5, ease: 'none' }, resultsAt + 4.2);

    return tl;
};

function InsightScene() {
    const { language } = useLanguage();
    const ref = useSceneTimeline(buildInsight, language);
    const copy = IM_COPY[language];
    const rows = copy.groups.map((g) => imChipRow(g.chips));
    const btnCenter = { x: IM_BTN.x + IM_BTN.w / 2, y: IM_BTN.y + IM_BTN.h / 2 };
    const pickCenters = [
        ...rows.map((row, gi) => ({ x: row[0].x + row[0].w / 2, y: IM_GROUP_Y[gi] + IM_CHIP_H / 2 })),
        btnCenter,
    ];

    return (
        <svg ref={ref} viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" style={{ fontFamily: IM_FONT }}>
            <defs>
                <radialGradient id="im-glow" cx="88%" cy="6%" r="55%">
                    <stop offset="0%" stopColor={IM.lime} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={IM.lime} stopOpacity="0" />
                </radialGradient>
                <pattern id="im-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
                </pattern>
            </defs>
            <rect width="640" height="360" fill={IM.bg} />
            <rect width="640" height="360" fill="url(#im-glow)" />
            <rect width="640" height="360" fill="url(#im-dots)" />

            {/* Window chrome */}
            <circle cx="30" cy="40" r="4" fill={IM.lime} />
            <circle cx="42" cy="40" r="4" fill="rgba(243,244,238,0.2)" />
            <circle cx="54" cy="40" r="4" fill="rgba(243,244,238,0.2)" />
            <text x="68" y="44" fontSize="11" fill={IM.muted}>
                {copy.window}
            </text>

            <g data-stage="">
                {/* Chaos: scattered ISO standards */}
                {IM_CHAOS.map(([label, cx, cy]) => {
                    const w = Math.round(imTextWidth(label, 11) + 22);
                    return (
                        <g key={label} data-chaos="" opacity="0">
                            <rect x={cx - w / 2} y={cy - IM_CHIP_H / 2} width={w} height={IM_CHIP_H} rx={IM_CHIP_H / 2} fill="rgba(195,251,121,0.08)" stroke="rgba(195,251,121,0.35)" />
                            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={IM.lime}>
                                {label}
                            </text>
                        </g>
                    );
                })}

                {/* Diagnosis panel */}
                <g data-panel="">
                    <rect x={IM_PANEL.x} y={IM_PANEL.y} width={IM_PANEL.w} height={IM_PANEL.h} rx="14" fill={IM.panel} stroke={IM.line} />
                    <text x={IM_PANEL.x + 16} y={IM_PANEL.y + 28} fontSize="15" fontWeight="700" fill={IM.ink}>
                        {copy.title}
                    </text>
                    {copy.groups.map((g, gi) => (
                        <g key={g.en}>
                            <text x={IM_PANEL.x + 16} y={IM_GROUP_Y[gi] - 8} fontSize="9" fontWeight="700" letterSpacing="1" fill={IM.muted}>
                                {g.en}
                                {g.label && (
                                    <tspan dx="5" fontWeight="500" letterSpacing="0">
                                        {g.label}
                                    </tspan>
                                )}
                            </text>
                            {rows[gi].map((chip, ci) => (
                                <g
                                    key={chip.label}
                                    {...(ci === 0 ? { 'data-pick': '', 'data-cx': pickCenters[gi].x, 'data-cy': pickCenters[gi].y } : {})}
                                >
                                    <rect x={chip.x} y={IM_GROUP_Y[gi]} width={chip.w} height={IM_CHIP_H} rx={IM_CHIP_H / 2} fill="rgba(195,251,121,0)" stroke="rgba(243,244,238,0.18)" />
                                    <text x={chip.x + chip.w / 2} y={IM_GROUP_Y[gi] + 15} textAnchor="middle" fontSize="11" fontWeight="600" fill={IM.ink}>
                                        {chip.label}
                                    </text>
                                </g>
                            ))}
                        </g>
                    ))}
                    <line x1={IM_PANEL.x + 16} x2={IM_PANEL.x + IM_PANEL.w - 16} y1={IM_BTN.y - 12} y2={IM_BTN.y - 12} stroke={IM.line} />
                    <g data-pick="" data-btn="" data-cx={btnCenter.x} data-cy={btnCenter.y}>
                        <rect x={IM_BTN.x} y={IM_BTN.y} width={IM_BTN.w} height={IM_BTN.h} rx={IM_BTN.h / 2} fill={IM.lime} />
                        <text x={IM_BTN.x + 14} y={IM_BTN.y + 21} fontSize="11" fontWeight="700" fill={IM.bg}>
                            {copy.button}
                        </text>
                        <circle cx={IM_BTN.x + IM_BTN.w - 17} cy={btnCenter.y} r="11" fill={IM.bg} />
                        <path
                            d={`M${IM_BTN.x + IM_BTN.w - 22} ${btnCenter.y} h10 m-4 -4 l4 4 l-4 4`}
                            fill="none"
                            stroke={IM.lime}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    {pickCenters.map((c, i) => (
                        <circle key={i} data-ripple="" cx={c.x} cy={c.y} r="18" fill="none" stroke={IM.lime} strokeWidth="2" opacity="0" />
                    ))}
                </g>

                {/* Results */}
                <text data-header="" x={IM_CARD.x0} y="78" fontSize="14" fontWeight="700" fill={IM.ink}>
                    {copy.header}
                    <tspan dx="8" fontSize="10" fontWeight="500" fill={IM.muted}>
                        {copy.headerSub}
                    </tspan>
                </text>
                {IM_CONSULTANTS.map((c, i) => {
                    const x = IM_CARD.x0 + i * (IM_CARD.w + IM_CARD.gap);
                    const y = IM_CARD.y;
                    const best = i === 0;
                    return (
                        <g key={c.initials} data-card="">
                            <rect
                                {...(best ? { 'data-best': '' } : {})}
                                x={x}
                                y={y}
                                width={IM_CARD.w}
                                height={IM_CARD.h}
                                rx="12"
                                fill={IM.card}
                                stroke={IM.line}
                                strokeWidth="1.2"
                            />
                            <circle cx={x + 24} cy={y + 26} r="13" fill={best ? IM.lime : '#33352f'} />
                            <text x={x + 24} y={y + 30} textAnchor="middle" fontSize="10" fontWeight="700" fill={best ? IM.bg : IM.ink}>
                                {c.initials}
                            </text>
                            <text x={x + 44} y={y + 24} fontSize="11" fontWeight="700" fill={IM.ink}>
                                {c.name}
                            </text>
                            <text x={x + 44} y={y + 38} fontSize="10" fill={IM.muted}>
                                {c.years[language]}
                            </text>
                            <text x={x + IM_CARD.w - 12} y={y + 24} textAnchor="end" fontSize="10" fill={IM.muted}>
                                {`0${i + 1}`}
                            </text>
                            <text x={x + 14} y={y + 92} fontSize="34" fontWeight="800" fill={IM.ink} letterSpacing="-1">
                                <tspan data-score="">0</tspan>
                                <tspan dx="3" fontSize="14" fontWeight="700" letterSpacing="0">
                                    %
                                </tspan>
                            </text>
                            <text x={x + IM_CARD.w - 12} y={y + 90} textAnchor="end" fontSize="10" fill={IM.muted}>
                                {copy.fit}
                            </text>
                            <rect x={x + 14} y={y + 104} width={IM_CARD.w - 28} height="5" rx="2.5" fill="rgba(243,244,238,0.1)" />
                            <rect data-fitbar="" x={x + 14} y={y + 104} width={IM_CARD.w - 28} height="5" rx="2.5" fill={IM.lime} />
                            <line x1={x + 14} x2={x + IM_CARD.w - 14} y1={y + 124} y2={y + 124} stroke={IM.line} />
                            <text x={x + 14} y={y + 144} fontSize="10" fill={IM.muted}>
                                {copy.checks}
                            </text>
                            {[0, 1, 2, 3].map((j) => {
                                const cx = x + 22 + j * 24;
                                const cy = y + 166;
                                return (
                                    <g key={j} data-check="">
                                        <circle cx={cx} cy={cy} r="8" fill={IM.lime} />
                                        <path d={imCheckPath(cx, cy)} fill="none" stroke={IM.bg} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                );
                            })}
                        </g>
                    );
                })}

                <g data-compare="">
                    <rect
                        x={IM_CARD.x0}
                        y={IM_COMPARE.y}
                        width={3 * IM_CARD.w + 2 * IM_CARD.gap}
                        height={IM_COMPARE.h}
                        rx="10"
                        fill="none"
                        stroke="rgba(243,244,238,0.2)"
                        strokeDasharray="3 4"
                    />
                    <circle cx={IM_CARD.x0 + 20} cy={IM_COMPARE.y + 17} r="10" fill="#2a2c27" />
                    <text x={IM_CARD.x0 + 20} y={IM_COMPARE.y + 21} textAnchor="middle" fontSize="9" fontWeight="700" fill={IM.lime}>
                        03
                    </text>
                    <text x={IM_CARD.x0 + 38} y={IM_COMPARE.y + 21} fontSize="10.5" fill={IM.ink}>
                        {copy.compare}
                    </text>
                    {IM_CONSULTANTS.map((c, i) => {
                        const cx = IM_CARD.x0 + 3 * IM_CARD.w + 2 * IM_CARD.gap - 52 + i * 17;
                        return (
                            <g key={c.initials}>
                                <circle cx={cx} cy={IM_COMPARE.y + 17} r="10" fill={i === 0 ? IM.lime : '#33352f'} stroke={IM.bg} strokeWidth="2" />
                                <text x={cx} y={IM_COMPARE.y + 20} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={i === 0 ? IM.bg : IM.ink}>
                                    {c.initials}
                                </text>
                            </g>
                        );
                    })}
                </g>

                {/* Cursor (tip at the group origin) */}
                <g data-cursor="" opacity="0">
                    <path
                        d="M0 0 L0 17 L4.5 13 L7.5 20 L10.5 18.7 L7.6 12 L13 12 Z"
                        fill="#ffffff"
                        stroke={IM.bg}
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* GHG Protocol — loose emission particles sort into Scope 1/2/3 bars   */
/* ------------------------------------------------------------------ */

const GHG_BASE = 292;
const GHG_SCOPES = [
    { label: 'Scope 1', x: 360, h: 62, value: '1,120', color: '#b23aff' },
    { label: 'Scope 2', x: 440, h: 104, value: '2,310', color: '#00f3ff' },
    { label: 'Scope 3', x: 520, h: 186, value: '9,050', color: '#f5a524' },
];
const GHG_BAR_W = 56;
// Fixed (deterministic) scatter so server and client render the same markup.
const hash01 = (n: number) => (((n * 2654435761) >>> 0) % 1000) / 1000;
const GHG_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    x: Math.round(48 + hash01(i * 2 + 1) * 250),
    y: Math.round(130 + hash01(i * 2 + 7) * 185),
    scope: i % 3,
}));

const buildGhg: Build = (q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: 'power3.out' } });
    const counter = { v: 0 };
    const total = q('[data-total]')[0];

    tl.fromTo(q('[data-stage]'), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' }, 0)
        .fromTo(
            q('[data-p]'),
            { scale: 0, opacity: 0, x: 0, y: 0, transformOrigin: '50% 50%' },
            { scale: 1, opacity: 1, duration: 0.4, stagger: { each: 0.02, from: 'random' } },
            0.1,
        )
        .to(
            q('[data-p]'),
            {
                x: (i: number) => ((i * 37) % 30) - 15,
                y: (i: number) => ((i * 53) % 30) - 15,
                duration: 0.6,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: 1,
            },
            0.6,
        )
        .to(
            q('[data-p]'),
            {
                x: (i: number) => {
                    const p = GHG_PARTICLES[i];
                    return GHG_SCOPES[p.scope].x + GHG_BAR_W / 2 - p.x;
                },
                y: (i: number) => {
                    const p = GHG_PARTICLES[i];
                    return GHG_BASE - GHG_SCOPES[p.scope].h + 12 - p.y;
                },
                scale: 0.4,
                opacity: 0,
                duration: 0.9,
                ease: 'power2.in',
                stagger: 0.025,
            },
            1.9,
        )
        .fromTo(q('[data-bar]'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1.4, stagger: 0.15 }, 2.3)
        .fromTo(
            counter,
            { v: 0 },
            {
                v: 12480,
                duration: 1.6,
                ease: 'power2.out',
                onUpdate: () => setCounter(total, Math.round(counter.v).toLocaleString('en-US')),
            },
            2.3,
        )
        .fromTo(q('[data-value]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.15 }, 3.3)
        .addLabel('hold', 4.4)
        .to(q('[data-stage]'), { opacity: 0, duration: 0.5, ease: 'none' }, 6.2);

    return tl;
};

function GhgScene() {
    const ref = useSceneTimeline(buildGhg);

    return (
        <svg ref={ref} viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" style={{ fontFamily: FONT }}>
            <Backdrop id="ghg" tint="#00f3ff" />
            <g data-stage="">
                <text x="44" y="56" fontSize="12" letterSpacing="2" fill="rgba(255,255,255,0.55)">
                    TOTAL EMISSIONS
                </text>
                <text x="44" y="94" fontSize="34" fontWeight="700" fill="#fff">
                    <tspan data-total="">0</tspan>
                    <tspan dx="8" fontSize="15" fontWeight="500" fill="rgba(255,255,255,0.6)">
                        tCO₂e
                    </tspan>
                </text>

                {GHG_PARTICLES.map((p, i) => (
                    <circle key={i} data-p="" cx={p.x} cy={p.y} r="4" fill={GHG_SCOPES[p.scope].color} />
                ))}

                <line x1="340" x2="600" y1={GHG_BASE} y2={GHG_BASE} stroke="rgba(255,255,255,0.2)" />
                {GHG_SCOPES.map((s) => (
                    <g key={s.label}>
                        <rect
                            data-bar=""
                            x={s.x}
                            y={GHG_BASE - s.h}
                            width={GHG_BAR_W}
                            height={s.h}
                            rx="6"
                            fill={s.color}
                            fillOpacity="0.85"
                        />
                        <text data-value="" x={s.x + GHG_BAR_W / 2} y={GHG_BASE - s.h - 10} textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">
                            {s.value}
                        </text>
                        <text x={s.x + GHG_BAR_W / 2} y={GHG_BASE + 22} textAnchor="middle" fontSize="13" fill="rgba(255,255,255,0.6)">
                            {s.label}
                        </text>
                    </g>
                ))}
            </g>
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* Carbon Mate — a product travels its life cycle, footprint adds up    */
/* ------------------------------------------------------------------ */

const CM_NODES = [
    { x: 80, y: 238 },
    { x: 200, y: 178 },
    { x: 320, y: 222 },
    { x: 440, y: 158 },
    { x: 560, y: 204 },
];
const CM_PATH = 'M80 238 C140 238 140 178 200 178 S260 222 320 222 S380 158 440 158 S500 204 560 204';
const CM_VALUES = [1.92, 1.36, 0.48, 0.71, 0.35];
const CM_TOTAL = CM_VALUES.reduce((a, b) => a + b, 0);
const CM_COLORS = ['#00f3ff', '#33d6f0', '#66b8e8', '#8f8ff5', '#b23aff'];
const CM_LABELS = {
    ko: ['원료', '제조', '운송', '사용', '폐기'],
    en: ['Material', 'Production', 'Transport', 'Use', 'End-of-life'],
};
const CM_SEGMENTS = CM_VALUES.map((v, i) => {
    const before = CM_VALUES.slice(0, i).reduce((a, b) => a + b, 0);
    return { x: 52 + (before / CM_TOTAL) * 226, w: (v / CM_TOTAL) * 226, color: CM_COLORS[i] };
});
const CM_DRAW_START = 0.6;
const CM_DRAW_DURATION = 3;

const buildCarbonMate: Build = (q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: 'power3.out' } });
    const counter = { v: 0 };
    const total = q('[data-total]')[0];
    const path = q('[data-path]')[0];

    tl.fromTo(q('[data-stage]'), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' }, 0)
        .fromTo(q('[data-card]'), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(q('[data-node]'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, 0.1)
        .fromTo(q('[data-label]'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.08 }, 0.3)
        .fromTo(path,{ strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: CM_DRAW_DURATION, ease: 'none' }, CM_DRAW_START)
        .fromTo(
            q('[data-dot]'),
            { opacity: 0 },
            {
                opacity: 1,
                duration: CM_DRAW_DURATION,
                ease: 'none',
                motionPath: { path: path as SVGPathElement, align: path as SVGPathElement, alignOrigin: [0.5, 0.5] },
            },
            CM_DRAW_START,
        )
        .fromTo(
            counter,
            { v: 0 },
            {
                v: CM_TOTAL,
                duration: CM_DRAW_DURATION,
                ease: 'none',
                onUpdate: () => setCounter(total, counter.v.toFixed(2)),
            },
            CM_DRAW_START,
        );

    const nodes = q('[data-node]');
    const chips = q('[data-chip]');
    const segs = q('[data-seg]');
    nodes.forEach((node, i) => {
        const t = CM_DRAW_START + (CM_DRAW_DURATION * i) / (nodes.length - 1);
        tl.fromTo(node.querySelector('circle'), { fill: '#16161c', stroke: 'rgba(255,255,255,0.3)' }, { fill: '#10262b', stroke: CM_COLORS[i], duration: 0.3 }, t)
            .fromTo(chips[i], { opacity: 0, y: 0 }, { opacity: 1, y: -20, duration: 0.5 }, t)
            .to(chips[i], { opacity: 0, duration: 0.4 }, t + 1.1)
            .fromTo(segs[i], { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.5 }, t);
    });

    tl.fromTo(q('[data-badge]'), { opacity: 0, scale: 0.8, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, CM_DRAW_START + CM_DRAW_DURATION + 0.1)
        .addLabel('hold', 4.8)
        .to(q('[data-stage]'), { opacity: 0, duration: 0.5, ease: 'none' }, 6.6);

    return tl;
};

function CarbonMateScene() {
    const ref = useSceneTimeline(buildCarbonMate);
    const { language } = useLanguage();
    const labels = CM_LABELS[language];
    const segments = CM_SEGMENTS;

    return (
        <svg ref={ref} viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" style={{ fontFamily: FONT }}>
            <Backdrop id="cm" tint="#00f3ff" />
            <g data-stage="">
                <g data-card="">
                    <rect x="36" y="28" width="258" height="96" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
                    <text x="52" y="52" fontSize="12" letterSpacing="2" fill="rgba(255,255,255,0.55)">
                        PRODUCT CARBON FOOTPRINT
                    </text>
                    <text x="52" y="90" fontSize="30" fontWeight="700" fill="#fff">
                        <tspan data-total="">0.00</tspan>
                        <tspan dx="8" fontSize="14" fontWeight="500" fill="rgba(255,255,255,0.6)">
                            kgCO₂e / unit
                        </tspan>
                    </text>
                    <rect x="52" y="104" width="226" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
                    {segments.map((s, i) => (
                        <rect key={i} data-seg="" x={s.x} y="104" width={s.w} height="6" fill={s.color} />
                    ))}
                </g>

                <g data-badge="">
                    <rect x="484" y="40" width="120" height="32" rx="16" fill="rgba(0,243,255,0.12)" stroke="#00f3ff" strokeOpacity="0.6" />
                    <text x="544" y="61" textAnchor="middle" fontSize="13" fontWeight="600" fill="#9ff9ff">
                        ISO 14067 ✓
                    </text>
                </g>

                <path d={CM_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
                <path
                    data-path=""
                    d={CM_PATH}
                    fill="none"
                    stroke="#00f3ff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1"
                    strokeDashoffset="1"
                />

                {CM_NODES.map((n, i) => (
                    <g key={i}>
                        <g data-node="">
                            <circle cx={n.x} cy={n.y} r="17" fill="#16161c" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">
                                {i + 1}
                            </text>
                        </g>
                        <text data-label="" x={n.x} y={n.y + 42} textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.7)">
                            {labels[i]}
                        </text>
                        <text data-chip="" x={n.x} y={n.y - 28} textAnchor="middle" fontSize="13" fontWeight="600" fill={CM_COLORS[i]} opacity="0">
                            +{CM_VALUES[i].toFixed(2)}
                        </text>
                    </g>
                ))}

                <circle data-dot="" cx="0" cy="0" r="7" fill="#fff" stroke="#00f3ff" strokeWidth="3" opacity="0" />
            </g>
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* CBAMy — plant data flows (locally) into the EU template, SEE computed */
/* ------------------------------------------------------------------ */

const CB_TEAL = '#2dd4bf';
const CB_ORANGE = '#fb923c';
const CB_SHEET = { x: 344, y: 50, w: 264, h: 264 };
const CB_COLS = 5;
const CB_ROWS = 6;
const CB_CELL = { w: 42, h: 24, gap: 7 };
const CB_GRID_X = CB_SHEET.x + 18;
const CB_GRID_Y = CB_SHEET.y + 46;
const CB_WARN = 13;
const CB_CELLS = Array.from({ length: CB_COLS * CB_ROWS }, (_, i) => ({
    x: CB_GRID_X + (i % CB_COLS) * (CB_CELL.w + CB_CELL.gap),
    y: CB_GRID_Y + Math.floor(i / CB_COLS) * (CB_CELL.h + CB_CELL.gap),
}));
const CB_PACKETS = 8;
const CB_FLOW_Y = 196;
const CB_LABELS = {
    ko: { plant: '국내 사업장', local: '로컬 저장 · 서버 전송 없음' },
    en: { plant: 'KR installation', local: 'Local-only · no upload' },
};

const buildCbamy: Build = (q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: 'power3.out' } });
    const counter = { v: 0 };
    const see = q('[data-total]')[0];
    const warnCell = q('[data-cell]')[CB_WARN];

    tl.fromTo(q('[data-stage]'), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' }, 0)
        .fromTo(q('[data-plant]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.1)
        .fromTo(q('[data-sheet]'), { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.2)
        .fromTo(q('[data-lock]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5)
        .fromTo(
            q('[data-puff]'),
            { y: 0, opacity: 0.6, scale: 0.6, transformOrigin: '50% 50%' },
            { y: -34, opacity: 0, scale: 1.4, duration: 1.4, ease: 'power1.out', stagger: 0.45, repeat: 3 },
            0.3,
        )
        .fromTo(
            q('[data-packet]'),
            { x: 0, opacity: 0 },
            {
                keyframes: [
                    { opacity: 1, duration: 0.15 },
                    { x: 176, duration: 0.7, ease: 'power1.inOut' },
                    { opacity: 0, duration: 0.15 },
                ],
                stagger: 0.2,
            },
            0.9,
        )
        .fromTo(
            q('[data-cell]'),
            { fill: 'rgba(255,255,255,0.05)' },
            { fill: 'rgba(45,212,191,0.5)', duration: 0.25, stagger: 0.055, ease: 'none' },
            1.4,
        )
        .to(warnCell, { fill: CB_ORANGE, duration: 0.2 }, 2.4)
        .fromTo(q('[data-warn]'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.4)
        .to(warnCell, { fill: 'rgba(45,212,191,0.5)', duration: 0.3 }, 3.3)
        .to(q('[data-warn]'), { opacity: 0, duration: 0.2 }, 3.3)
        .fromTo(q('[data-see]'), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 }, 2.6)
        .fromTo(
            counter,
            { v: 0 },
            { v: 2.14, duration: 1.4, ease: 'power2.out', onUpdate: () => setCounter(see, counter.v.toFixed(2)) },
            2.7,
        )
        .fromTo(q('[data-stamp]'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, 3.7)
        .fromTo(q('[data-check]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 4.0)
        .addLabel('hold', 4.8)
        .to(q('[data-stage]'), { opacity: 0, duration: 0.5, ease: 'none' }, 6.6);

    return tl;
};

function CbamyScene() {
    const ref = useSceneTimeline(buildCbamy);
    const { language } = useLanguage();
    const labels = CB_LABELS[language];
    const warn = CB_CELLS[CB_WARN];
    const stamp = { x: CB_GRID_X + (CB_COLS * CB_CELL.w + (CB_COLS - 1) * CB_CELL.gap) / 2, y: CB_GRID_Y + 3 * (CB_CELL.h + CB_CELL.gap) - CB_CELL.gap / 2 };

    return (
        <svg ref={ref} viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" style={{ fontFamily: FONT }}>
            <Backdrop id="cb" tint={CB_TEAL} />
            <g data-stage="">
                {/* SEE result */}
                <g data-see="">
                    <rect x="36" y="28" width="236" height="78" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
                    <text x="52" y="52" fontSize="12" letterSpacing="2" fill="rgba(255,255,255,0.55)">
                        EMBEDDED EMISSIONS (SEE)
                    </text>
                    <text x="52" y="90" fontSize="30" fontWeight="700" fill="#fff">
                        <tspan data-total="">0.00</tspan>
                        <tspan dx="8" fontSize="14" fontWeight="500" fill="rgba(255,255,255,0.6)">
                            tCO₂e / t
                        </tspan>
                    </text>
                </g>

                {/* Plant */}
                <g data-plant="">
                    <circle data-puff="" cx="151" cy="134" r="7" fill="rgba(255,255,255,0.35)" />
                    <circle data-puff="" cx="151" cy="134" r="7" fill="rgba(255,255,255,0.35)" />
                    <rect x="144" y="140" width="14" height="50" fill="#132322" stroke={CB_TEAL} strokeWidth="2" />
                    <path
                        d="M64 188 V166 L90 188 V166 L116 188 V166 L142 188"
                        fill="#132322"
                        stroke={CB_TEAL}
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                    <rect x="64" y="188" width="100" height="44" fill="#132322" stroke={CB_TEAL} strokeWidth="2" />
                    {[80, 104, 128].map((wx) => (
                        <rect key={wx} x={wx} y="204" width="12" height="12" rx="2" fill={CB_TEAL} fillOpacity="0.6" />
                    ))}
                    <text x="114" y="256" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.7)">
                        {labels.plant}
                    </text>
                </g>

                {/* Data flow */}
                <line x1="172" x2="340" y1={CB_FLOW_Y} y2={CB_FLOW_Y} stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6" />
                {Array.from({ length: CB_PACKETS }, (_, i) => (
                    <rect key={i} data-packet="" x="166" y={CB_FLOW_Y - 5} width="16" height="10" rx="3" fill={CB_TEAL} opacity="0" />
                ))}

                {/* Local-only badge */}
                <g data-lock="">
                    <rect x="36" y="292" width="250" height="36" rx="18" fill="rgba(45,212,191,0.1)" stroke={CB_TEAL} strokeOpacity="0.5" />
                    <rect x="54" y="306" width="14" height="11" rx="2" fill={CB_TEAL} />
                    <path d="M57 306 v-3 a4 4 0 0 1 8 0 v3" fill="none" stroke={CB_TEAL} strokeWidth="2" />
                    <text x="78" y="315" fontSize="13" fontWeight="500" fill="#bff5ec">
                        {labels.local}
                    </text>
                </g>

                {/* EU template sheet */}
                <g data-sheet="">
                    <rect x={CB_SHEET.x} y={CB_SHEET.y} width={CB_SHEET.w} height={CB_SHEET.h} rx="12" fill="#14161b" stroke="rgba(255,255,255,0.16)" />
                    <path
                        d={`M${CB_SHEET.x} ${CB_SHEET.y + 30} H${CB_SHEET.x + CB_SHEET.w}`}
                        stroke="rgba(255,255,255,0.12)"
                    />
                    {[0, 1, 2].map((d) => (
                        <circle key={d} cx={CB_SHEET.x + 16 + d * 12} cy={CB_SHEET.y + 15} r="3.5" fill="rgba(255,255,255,0.25)" />
                    ))}
                    <text x={CB_SHEET.x + 58} y={CB_SHEET.y + 20} fontSize="12" fill="rgba(255,255,255,0.6)">
                        EU CBAM Communication Template
                    </text>
                    {CB_CELLS.map((c, i) => (
                        <rect key={i} data-cell="" x={c.x} y={c.y} width={CB_CELL.w} height={CB_CELL.h} rx="4" fill="rgba(255,255,255,0.05)" />
                    ))}
                    <text data-warn="" x={warn.x + CB_CELL.w / 2} y={warn.y + 17} textAnchor="middle" fontSize="15" fontWeight="800" fill="#1a1206" opacity="0">
                        !
                    </text>
                    <g data-stamp="">
                        <circle cx={stamp.x} cy={stamp.y} r="34" fill={CB_TEAL} />
                        <path
                            data-check=""
                            d={`M${stamp.x - 14} ${stamp.y + 1} l9 9 l19 -20`}
                            fill="none"
                            stroke="#0b1f1c"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            pathLength={1}
                            strokeDasharray="1"
                            strokeDashoffset="1"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default function ProjectMotion({ variant }: { variant: MotionVariant }) {
    switch (variant) {
        case 'insight':
            return <InsightScene />;
        case 'ghg':
            return <GhgScene />;
        case 'carbonmate':
            return <CarbonMateScene />;
        case 'cbamy':
            return <CbamyScene />;
    }
}
