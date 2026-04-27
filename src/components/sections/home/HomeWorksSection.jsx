import { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDispatch } from 'react-redux';
import { setHeaderDark } from '../../../store/slices/uiSlice';

gsap.registerPlugin(ScrollTrigger);

const FONT = 'Pretendard Variable, Pretendard, sans-serif';

// 모든 이미지 동일 사이즈
const IMG_W = 271.6;
const IMG_H = 298.424;

// 1920×990 기준 이미지 배치
const IMAGES = [
    { id: 'works1', src: '/images/works1.png', x: 1440, y: 200, zIndex: 1 },
    { id: 'works2', src: '/images/works2.png', x: 1520, y: 700, zIndex: 1 },
    { id: 'works3', src: '/images/works3.png', x: 230, y: 186, zIndex: 1 },
    { id: 'works5', src: '/images/works5.png', x: 450, y: 600, zIndex: 1 },
    { id: 'works4', src: '/images/works4.png', x: 50, y: 690, zIndex: 1 },
    // works10: 설명 텍스트(top:447)와 겹치는 중앙 이미지 → 흰 텍스트 오버레이 대상
    { id: 'works10', src: '/images/works10.png', x: 1000, y: 540, zIndex: 10, isMozart: true },
];

// Works 타이틀 위치 (패딩값 기준: top 149 / right 734 / bottom 1522 / left 623)
const WORKS_STYLE = {
    position: 'absolute',
    top: '149px',
    left: '734px',
};

// 설명 텍스트 위치 (패딩값 기준: 상하 447px / 좌우 522px)
const DESC_TOP = 447; // px
const DESC_LEFT = 522; // px (right도 동일)

const descBaseStyle = {
    fontFamily: FONT,
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: 'normal',
    margin: 0,
    textAlign: 'center',
};

const DESC_TEXT = (
    <>
        그동안 이젠아카데미를 다니면서 만든 작업과
        <br />
        수료 후 만든 작업물 중 대표 프로젝트를 소개하겠습니다.
    </>
);

export const HomeWorksSection = memo(function HomeWorksSection() {
    const wrapperRef = useRef(null);
    const panelRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 흰 패널 슬라이드업 (scrub)
            gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                },
            }).fromTo(panelRef.current, { yPercent: 100 }, { yPercent: 0, ease: 'none' });

            // 완전 진입 → 헤더 라이트 모드
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: 'top top',
                onEnter: () => dispatch(setHeaderDark(false)),
                onLeaveBack: () => dispatch(setHeaderDark(true)),
            });
        });

        return () => ctx.revert();
    }, [dispatch]);

    return (
        <div
            ref={wrapperRef}
            style={{
                height: '200vh',
                position: 'relative',
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
            }}
        >
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                {/* GSAP 애니메이션 타겟 */}
                <div ref={panelRef} style={{ position: 'absolute', inset: 0 }}>
                    {/* 흰 패널 — 화면 전체 너비 기준 */}
                    <div
                        style={{
                            width: '100vw',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#FFF',
                            borderRadius: '100px 100px 0 0',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Works 타이틀 */}
                        <h2
                            style={{
                                ...WORKS_STYLE,
                                fontFamily: FONT,
                                fontSize: '150px',
                                fontWeight: 700,
                                color: '#000',
                                lineHeight: 'normal',
                                margin: 0,
                            }}
                        >
                            Works
                        </h2>

                        {/* 설명 텍스트 (gray #555, z-index 5) */}
                        <p
                            style={{
                                ...descBaseStyle,
                                position: 'absolute',
                                top: `${DESC_TOP}px`,
                                left: `${DESC_LEFT}px`,
                                right: `${DESC_LEFT}px`,
                                color: '#555',
                                zIndex: 5,
                            }}
                        >
                            {DESC_TEXT}
                        </p>

                        {/* 이미지들 */}
                        {IMAGES.map((img) => (
                            <div
                                key={img.id}
                                style={{
                                    position: 'absolute',
                                    left: `${img.x}px`,
                                    top: `${img.y}px`,
                                    width: `${IMG_W}px`,
                                    height: `${IMG_H}px`,
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    zIndex: img.zIndex,
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                    draggable={false}
                                />

                                {/* 흰 텍스트 오버레이 — works10(Mozart) 안에서만 클립 */}
                                {img.isMozart && (
                                    <p
                                        style={{
                                            ...descBaseStyle,
                                            position: 'absolute',
                                            // 패널 기준 텍스트 위치 → 이미지 기준으로 offset
                                            top: DESC_TOP - img.y, // 447 - 380 = 67px
                                            left: DESC_LEFT - img.x, // 522 - 850 = -328px
                                            width: `${1920 - DESC_LEFT * 2}px`, // 876px
                                            color: '#FFF',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        {DESC_TEXT}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
