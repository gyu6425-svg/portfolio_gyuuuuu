import { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const HomeHeroSection = memo(function HomeHeroSection() {
    const topTextRef = useRef(null);
    const titleRef = useRef(null);
    const postItRef = useRef(null);
    const bottomTextRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            tl.fromTo(
                topTextRef.current,
                { opacity: 0, y: -14 },
                { opacity: 1, y: 0, duration: 0.5 }
            )
                .fromTo(
                    titleRef.current,
                    { opacity: 0, y: 28 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    '-=0.2'
                )
                .fromTo(
                    postItRef.current,
                    { opacity: 0, scale: 0.75, rotation: -30 },
                    { opacity: 1, scale: 1, rotation: -14, duration: 0.65, ease: 'back.out(1.5)' },
                    '-=0.45'
                )
                .fromTo(
                    bottomTextRef.current,
                    { opacity: 0, y: 14 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    '-=0.3'
                );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            className="w-full bg-white overflow-hidden"
            style={{ paddingTop: '115px', paddingBottom: '115px' }}
        >
            <div className="max-w-[1480px] mx-auto">
                <p
                    ref={topTextRef}
                    className="text-right text-black font-semibold leading-normal"
                    style={{
                        fontFamily: 'Pretendard Variable, Pretendard, sans-serif',
                        fontSize: '40px',
                        textAlign: 'left',
                    }}
                >
                    모든 분야가 가능한,
                </p>

                <div className="relative">
                    <h1
                        ref={titleRef}
                        className="text-black text-center font-normal leading-none select-none"
                        style={{
                            fontFamily: 'Alkatra, cursive',
                            fontSize: '500px',
                            marginTop: '90px',
                        }}
                    >
                        GYUU
                    </h1>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div ref={postItRef} className="relative">
                            <img
                                src="/images/home_post.png"
                                alt=""
                                className="w-[300px] h-auto block"
                                draggable={false}
                            />
                            <span
                                className="absolute inset-0 flex items-center justify-center text-black font-semibold leading-normal"
                                style={{
                                    fontFamily: 'Pretendard Variable, Pretendard, sans-serif',
                                    fontSize: '49.846px',
                                }}
                            >
                                Portfolio
                            </span>
                        </div>
                    </div>
                </div>

                <p
                    ref={bottomTextRef}
                    className="text-right text-black font-semibold leading-normal"
                    style={{
                        fontFamily: 'Pretendard Variable, Pretendard, sans-serif',
                        fontSize: '40px',
                    }}
                >
                    입니다
                </p>
            </div>
        </section>
    );
});
