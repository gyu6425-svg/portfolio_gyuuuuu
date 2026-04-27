import { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FONT = 'Pretendard Variable, Pretendard, sans-serif';

const CARDS = [
    {
        id: 'haedok',
        badge: '해독',
        title: '의도를 읽는 통찰',
        desc: '단순한 시각화를 넘어, 기획과 디자인 이면에 담긴 유저\n경험의 의도를 정확히 해독합니다',
        image: '/images/skill1.png',
    },
    {
        id: 'detail',
        badge: '디테일',
        title: '감각을 담은 디테일',
        desc: '디자인의 감각을 존중하며, 픽셀 단위의\n디테일을 놓치지 않습니다',
        image: '/images/skill2.png',
    },
    {
        id: 'efficiency',
        badge: '효율성',
        title: '효율을 담은 코드',
        desc: '사용자의 행동이 흐름에 끊김이 없도록, 최적화된\n성능과 매끄러운 인터랙션을 코드로 구현합니다.',
        image: '/images/skill3.png',
    },
    {
        id: 'activation',
        badge: '활성화',
        title: '기술적 활성화',
        desc: '멈춰있는 시안을 유저가 체감할 수 있는 살아있는\n서비스로 전환하여, 현실적인 상호작용을 완성합니다.',
        image: '/images/skill4.png',
    },
];

export const HomeStrengthSection = memo(function HomeStrengthSection() {
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardRefs.current.forEach((card) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: card, start: 'top 85%' },
                    }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section style={{ width: '100%', background: '#fff' }}>
            {/*
        1700px 컨테이너
        paddingLeft: 329px → 타이틀 시작
        grid col1 656px → col2 시작 = 329 + 656 = 985px (카드 시작 위치)
      */}
            <div
                style={{
                    width: 'min(1700px, calc(100vw - 80px))',
                    margin: '0 auto',
                    paddingTop: '143px',
                    paddingBottom: '143px',
                    paddingLeft: '229px',
                    display: 'grid',
                    gridTemplateColumns: '656px 1fr',
                }}
            >
                {/* ── 왼쪽: sticky 타이틀 ── */}
                <div style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
                    <h2
                        style={{
                            fontFamily: FONT,
                            fontSize: '72px',
                            fontWeight: 600,
                            color: '#000',
                            lineHeight: 'normal',
                            margin: 0,
                        }}
                    >
                        What I Bring
                        <br />
                        to the Table
                    </h2>

                    <p
                        style={{
                            fontFamily: FONT,
                            fontSize: '24px',
                            fontWeight: 400,
                            color: '#333',
                            lineHeight: 'normal',
                            marginTop: '42px',
                            marginBottom: 0,
                        }}
                    >
                        저의 강점을 소개하겠습니다
                    </p>

                    {/* drag 서클 */}
                    {/* <div
                        style={{
                            width: '68px',
                            height: '68px',
                            borderRadius: '50%',
                            background: '#F0F0F0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '36px',
                            fontFamily: FONT,
                            fontSize: '14px',
                            fontWeight: 400,
                            color: '#777',
                            cursor: 'grab',
                            userSelect: 'none',
                        }}
                    >
                        drag
                    </div> */}
                </div>

                {/* ── 오른쪽: 스크롤 카드 4장 ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
                    {CARDS.map((card, i) => (
                        <div
                            key={card.id}
                            ref={(el) => {
                                cardRefs.current[i] = el;
                            }}
                            style={{
                                background: '#F5F5F5',
                                borderRadius: '40px',
                                padding: '59px 96px 139px 97px',
                                transition: 'box-shadow 0.25s ease',
                                cursor: 'default',
                                width: '656px',
                                height: '506px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow =
                                    '0 0 21.6px 1.2px rgba(0,0,0,0.25)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* 이미지 + 뱃지 */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '28px',
                                }}
                            >
                                <img
                                    src={card.image}
                                    alt={card.badge}
                                    style={{
                                        width: '182px',
                                        height: '128px',
                                        aspectRatio: '91/64',
                                        objectFit: 'contain',
                                        display: 'block',
                                    }}
                                    draggable={false}
                                />
                                <span
                                    style={{
                                        fontFamily: FONT,
                                        fontSize: '28px',
                                        fontWeight: 600,
                                        color: '#DB6C1B',
                                        lineHeight: 'normal',
                                    }}
                                >
                                    {card.badge}
                                </span>
                            </div>

                            {/* 제목 */}
                            <h3
                                style={{
                                    fontFamily: FONT,
                                    fontSize: '44px',
                                    fontWeight: 600,
                                    color: '#111',
                                    lineHeight: 'normal',
                                    margin: '34px 10px 41px 0',
                                }}
                            >
                                {card.title}
                            </h3>

                            {/* 설명 */}
                            <p
                                style={{
                                    fontFamily: FONT,
                                    fontSize: '22px',
                                    fontWeight: 400,
                                    color: '#777',
                                    lineHeight: 'normal',
                                    whiteSpace: 'pre-line',
                                    margin: 0,
                                }}
                            >
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
