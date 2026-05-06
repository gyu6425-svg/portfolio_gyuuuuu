import { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDispatch } from 'react-redux';
import { setHeaderDark } from '../../../store/slices/uiSlice';

gsap.registerPlugin(ScrollTrigger);

const FONT = 'Pretendard Variable, Pretendard, sans-serif';

const IMG_W = 271.6;
const IMG_H = 298.424;

// 1920×990 기준 이미지 배치
const IMAGES = [
    { id: 'works1', src: '/images/works1.png', x: 1440, y: 200, zIndex: 1 },
    { id: 'works2', src: '/images/works2.png', x: 1520, y: 700, zIndex: 1 },
    { id: 'works3', src: '/images/works3.png', x: 250, y: 186, zIndex: 1 },
    { id: 'works5', src: '/images/works5.png', x: 590, y: 600, zIndex: 1 },
    { id: 'works4', src: '/images/works4.png', x: 210, y: 690, zIndex: 1 },
    { id: 'works10', src: '/images/works10.png', x: 1100, y: 640, zIndex: 10, isMozart: true },
];

const DESC_TOP = 447;
const DESC_LEFT = 522;

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
            gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                },
            }).fromTo(panelRef.current, { yPercent: 100 }, { yPercent: 0, ease: 'none' });

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
        <div ref={wrapperRef} className="h-[200vh] relative w-screen ml-[calc(50%_-_50vw)]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div ref={panelRef} className="absolute inset-0">
                    {/* 흰 패널 */}
                    <div className="w-screen absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-t-[100px] overflow-hidden">
                        {/* Works 타이틀 */}
                        <h2
                            className="absolute top-[149px] left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-black leading-normal m-0"
                            style={{ fontFamily: FONT, fontSize: '150px' }}
                        >
                            Works
                        </h2>

                        {/* 설명 텍스트 */}
                        <p
                            className="absolute text-[40px] font-normal leading-normal m-0 text-center text-[#555] z-[5]"
                            style={{
                                fontFamily: FONT,
                                top: `${DESC_TOP}px`,
                                left: `${DESC_LEFT}px`,
                                right: `${DESC_LEFT}px`,
                            }}
                        >
                            {DESC_TEXT}
                        </p>

                        {/* 이미지들 */}
                        {IMAGES.map((img) => (
                            <div
                                key={img.id}
                                className="absolute rounded-[20px] overflow-hidden"
                                style={{
                                    left: `${img.x}px`,
                                    top: `${img.y}px`,
                                    width: `${IMG_W}px`,
                                    height: `${IMG_H}px`,
                                    zIndex: img.zIndex,
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt=""
                                    className="w-full h-full object-cover block"
                                    draggable={false}
                                />

                                {/* 흰 텍스트 오버레이 — works10(Mozart) 전용 */}
                                {img.isMozart && (
                                    <p
                                        className="absolute text-[40px] font-normal leading-normal m-0 text-center text-white pointer-events-none"
                                        style={{
                                            fontFamily: FONT,
                                            top: DESC_TOP - img.y,
                                            left: DESC_LEFT - img.x,
                                            width: `${1920 - DESC_LEFT * 2}px`,
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
