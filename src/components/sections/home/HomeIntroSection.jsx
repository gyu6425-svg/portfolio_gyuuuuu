import { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDispatch } from 'react-redux';
import { setHeaderVisible } from '../../../store/slices/uiSlice';

gsap.registerPlugin(ScrollTrigger);

const FONT = 'Pretendard Variable, Pretendard, sans-serif';

export const HomeIntroSection = memo(function HomeIntroSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const bodyRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 이 섹션이 화면 중앙에 오면 헤더 표시
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 50%',
                onEnter: () => dispatch(setHeaderVisible(true)),
                onLeaveBack: () => dispatch(setHeaderVisible(false)),
            });

            // 콘텐츠 페이드인
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                defaults: { ease: 'power2.out' },
            });

            tl.fromTo(
                headingRef.current,
                { opacity: 0, y: 32 },
                { opacity: 1, y: 0, duration: 0.8 }
            ).fromTo(
                bodyRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 },
                '-=0.4'
            );
        });

        return () => ctx.revert();
    }, [dispatch]);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white"
            style={{ padding: '239px 329px 459px 329px' }}
        >
            <h2
                ref={headingRef}
                style={{
                    fontFamily: FONT,
                    fontSize: '60px',
                    fontWeight: 600,
                    color: '#000',
                    lineHeight: 'normal',
                    margin: 0,
                }}
            >
                디자인하는 코더,
                <br />
                디코더(D-Coder) <span style={{ color: '#DB6C1B', fontWeight: 700 }}>장규진</span>
                입니다.
            </h2>

            <p
                ref={bodyRef}
                style={{
                    fontFamily: FONT,
                    fontSize: '24px',
                    fontWeight: 400,
                    color: '#555',
                    lineHeight: '36px',
                    letterSpacing: '0.48px',
                    marginTop: '40px',
                }}
            >
                데이터를 신호로 변환하는 'decoder' 처럼, 디자인의 의도를 해독해 체감 가능한
                인터페이스로 구현합니다. 픽셀의 정교함과 코드의 논리 사이에서 균형을 찾으며,
                시각화를 넘어 실제 동작하는 결과물을 만드는 기술적 유연함을 지향합니다. 집요한
                완성도로 팀의 비전을 활성화하고 사용자에게 신뢰를 주는 전문가가 되겠습니다
            </p>
        </section>
    );
});
