import { memo, useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setHeaderDark, setHeaderVisible } from '../../../store/slices/uiSlice';

gsap.registerPlugin(ScrollTrigger);

const FONT = 'Pretendard Variable, Pretendard, sans-serif';

const KEYWORDS = [
    { word: 'Detail', desc: '미세한 차이로\n서비스의\n품격을 만듭니다' },
    { word: 'Pure', desc: '시작한 일은\n완벽히\n마무리합니다' },
    { word: 'Focus', desc: '깊게 더 파고들어\n최적의\n해답을 찾습니다' },
    { word: 'Finish', desc: '끝까지 책임져\n완벽한\n결과물을 만듭니다' },
];

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M15.834 10H4.16732M15.834 10L10.834 15M15.834 10L10.834 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const HomeKeywordSection = memo(function HomeKeywordSection() {
    const wrapperRef = useRef(null);
    const panelRef = useRef(null);
    const keywordsRef = useRef([]);
    ('');
    const phase2Ref = useRef(null);
    const phase3Ref = useRef(null);
    const [hoveredWord, setHoveredWord] = useState(null);
    const dispatch = useDispatch();

    const handleMouseEnter = useCallback((word) => {
        setHoveredWord(word);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setHoveredWord(null);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 초기 상태
            gsap.set(keywordsRef.current, { opacity: 0, y: 60 });
            gsap.set(phase3Ref.current, { opacity: 0 });

            // Phase 1: 패널 슬라이드 업 (scrub)
            gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                },
            }).fromTo(panelRef.current, { yPercent: 100 }, { yPercent: 0, ease: 'none' });

            // Phase 2: 패널 완전히 올라옴 → 헤더 다크 + 키워드 차례로 등장
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: 'top top',
                onEnter: () => {
                    dispatch(setHeaderDark(true));
                    dispatch(setHeaderVisible(true));
                    gsap.killTweensOf(keywordsRef.current);
                    gsap.fromTo(
                        keywordsRef.current,
                        { opacity: 0, y: 60 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            stagger: 0.28,
                            ease: 'power2.out',
                            delay: 0.15,
                        }
                    );
                },
                onLeaveBack: () => {
                    dispatch(setHeaderDark(false));
                    gsap.killTweensOf(keywordsRef.current);
                    gsap.set(keywordsRef.current, { opacity: 0, y: 60 });
                    gsap.set(phase2Ref.current, { opacity: 1, y: 0 });
                    gsap.set(phase3Ref.current, { opacity: 0 });
                },
            });

            // Phase 3: 150vh 더 스크롤 후 → 키워드 아웃, 주황 문구 + 칩 인
            // 'top top-=150%' = wrapper top이 viewport top보다 150vh 위 = phase2 시작 150vh 후
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: 'top top-=150%',
                onEnter: () => {
                    gsap.killTweensOf([keywordsRef.current, phase2Ref.current, phase3Ref.current]);

                    // Phase 3 이벤트 활성화, Phase 2 비활성화
                    if (phase3Ref.current) phase3Ref.current.style.pointerEvents = 'auto';
                    if (phase2Ref.current) phase2Ref.current.style.pointerEvents = 'none';

                    gsap.to(phase2Ref.current, {
                        opacity: 0,
                        y: -20,
                        duration: 0.4,
                        ease: 'power2.in',
                    });
                    gsap.fromTo(
                        phase3Ref.current,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power2.out' }
                    );
                },
                onLeaveBack: () => {
                    gsap.killTweensOf([keywordsRef.current, phase2Ref.current, phase3Ref.current]);

                    // Phase 2 이벤트 복구, Phase 3 비활성화
                    if (phase3Ref.current) phase3Ref.current.style.pointerEvents = 'none';
                    if (phase2Ref.current) phase2Ref.current.style.pointerEvents = 'auto';

                    gsap.to(phase3Ref.current, { opacity: 0, y: 30, duration: 0.3 });
                    gsap.set(phase2Ref.current, { opacity: 1, y: 0 });
                    gsap.set(keywordsRef.current, { opacity: 0, y: 40 });
                    gsap.fromTo(
                        keywordsRef.current,
                        { opacity: 0, y: 40 },
                        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }
                    );
                },
            });
        });

        return () => ctx.revert();
    }, [dispatch]);

    return (
        <div
            ref={wrapperRef}
            style={{
                height: '400vh',
                position: 'relative',
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
            }}
        >
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                <div ref={panelRef} style={{ position: 'absolute', inset: 0 }}>
                    <div
                        style={{
                            display: 'flex',
                            width: '100vw',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '128px 650px 188px 650px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            borderRadius: '100px 100px 0 0',
                            background: '#000',
                        }}
                    >
                        {/* "Keyword" — 항상 고정 위치 */}
                        <h2
                            style={{
                                fontFamily: FONT,
                                fontSize: '150px',
                                fontWeight: 700,
                                color: '#FFF',
                                textAlign: 'center',
                                lineHeight: 'normal',
                                margin: '0 0 28px 0',
                                flexShrink: 0,
                            }}
                        >
                            Keyword
                        </h2>

                        {/* 콘텐츠 영역 — Phase 2 / Phase 3 전환 (고정 높이로 Keyword 위치 유지) */}
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '400px',
                                flexShrink: 0,
                            }}
                        >
                            {/* Phase 2: 키워드 4개 */}
                            <div
                                ref={phase2Ref}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    paddingTop: '24px',
                                }}
                            >
                                {KEYWORDS.map((kw, i) => (
                                    <div
                                        key={kw.word}
                                        ref={(el) => {
                                            keywordsRef.current[i] = el;
                                        }}
                                        style={{
                                            position: 'relative',
                                            textAlign: 'center',
                                            cursor: 'default',
                                            filter:
                                                hoveredWord && hoveredWord !== kw.word
                                                    ? 'blur(4px)'
                                                    : 'none',
                                            transition: 'filter 0.3s ease',
                                        }}
                                        onMouseEnter={() => handleMouseEnter(kw.word)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <span
                                            style={{
                                                fontFamily: FONT,
                                                fontSize: '80px',
                                                fontWeight: 600,
                                                color: '#DB6C1B',
                                                display: 'block',
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            {kw.word}
                                        </span>
                                        {hoveredWord === kw.word && (
                                            <p
                                                ref={(el) => {
                                                    if (el)
                                                        gsap.fromTo(
                                                            el,
                                                            { opacity: 0, y: 12 },
                                                            {
                                                                opacity: 0.85,
                                                                y: 0,
                                                                duration: 0.35,
                                                                ease: 'power2.out',
                                                            }
                                                        );
                                                }}
                                                style={{
                                                    fontFamily: FONT,
                                                    fontSize: '20px',
                                                    fontWeight: 400,
                                                    color: '#DB6C1B',
                                                    textAlign: 'center',
                                                    lineHeight: 1.7,
                                                    margin: '4px 0 0',
                                                    whiteSpace: 'pre-line',
                                                }}
                                            >
                                                {kw.desc}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Phase 3: 주황 문구 + About 칩 */}
                            <div
                                ref={phase3Ref}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pointerEvents: 'none',
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: FONT,
                                        fontSize: '26px',
                                        fontWeight: 500,
                                        color: '#DB6C1B',
                                        textAlign: 'center',
                                        lineHeight: '33px',
                                        margin: 0,
                                    }}
                                >
                                    한 치의 오차 없는 정교함으로 디자인의 의도를 읽고
                                    <br />
                                    결점 없는 화면을 실제 서비스로 완성합니다
                                    <br />
                                    끝을 보는 완결성과 깊은 몰입으로
                                    <br />
                                    서비스의 무결함을 증명하겠습니다
                                </p>

                                <Link
                                    to="/about"
                                    style={{
                                        display: 'flex',
                                        width: '108px',
                                        height: '44px',
                                        padding: '0 20px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '8px',
                                        borderRadius: '22px',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        textDecoration: 'none',
                                        marginTop: '90px',
                                        flexShrink: 0,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: 'Alkatra, cursive',
                                            fontSize: '20px',
                                            fontWeight: 400,
                                            color: '#FFF',
                                            lineHeight: 'normal',
                                            textAlign: 'center',
                                        }}
                                    >
                                        About
                                    </span>
                                    <ArrowIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
