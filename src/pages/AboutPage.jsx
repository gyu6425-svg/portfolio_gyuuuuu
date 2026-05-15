import { useRef, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setHeaderVisible, setHeaderDark } from '../store/slices/uiSlice';

gsap.registerPlugin(ScrollTrigger);

const FONT = 'Pretendard Variable, Pretendard, sans-serif';
const FONT_AL = 'Alkatra, cursive';

const HEADER_HIDDEN_OFFSET = 12;

// 이미지 실제 크기: 281×459 (portrait)
// top: (528 - 459) / 2 = 35px (컨테이너 수직 중앙)
// left: (1526 - 281) / 5 = 249px 간격으로 균등 배치
const PHOTO_CONFIGS = [
    { left: 0, top: 35, rotate: -20 },
    { left: 249, top: 35, rotate: -13 },
    { left: 498, top: 35, rotate: -5 },
    { left: 747, top: 35, rotate: 4 },
    { left: 996, top: 35, rotate: 12 },
    { left: 1245, top: 35, rotate: 20 },
];

const LEARNING_PHOTOS = [
    {
        side: 'right',
        year: '2017',
        desc: '2017년\n스마트소프트웨어과\n입학',
        img: '/images/about/Learning1.png',
        w: 577,
        h: 315,
    },
    {
        side: 'left',
        year: '2021',
        desc: '2021년부터 1년간 아디다스\n판매 및 유통',
        img: '/images/about/Learning2.png',
        w: 435,
        h: 580,
    },
    {
        side: 'right',
        year: '2022',
        desc: '2021년부터 지금까지 취미로\n작업하는 옷 만드는 취미활동',
        img: '/images/about/Learning3.png',
        w: 455,
        h: 732,
    },
    {
        side: 'left',
        year: '2022',
        desc: '2022년부터 1년간 뉴발란스\n매니저 및 온라인 유통',
        img: '/images/about/Learning4.png',
        w: 704,
        h: 528,
    },
    {
        side: 'right',
        year: '2023',
        desc: '2023년부터 2년2개월간 KREAM\n명품,의류 R&D업무 및 검수',
        img: '/images/about/Learning5.png',
        w: 939,
        h: 704,
    },
    {
        side: 'left',
        year: '2025',
        desc: '2025년 중순\n청년취업사관학교\nAI활용 온라인 MD교육 수료',
        img: '/images/about/Learning6.png',
        w: 611,
        h: 887,
    },
    {
        side: 'right',
        year: '2025',
        desc: '2025년말부터 2026년초까지\n이젠아카데미\nUIUX,프론트엔드 수료',
        img: '/images/about/Learning7.png',
        w: 800,
        h: 600,
    },
];

const SKILLS = [
    { label: 'HTML', img: '/images/about/html.png' },
    { label: 'CSS', img: '/images/about/css.png' },
    { label: 'JavaScript', img: '/images/about/js.png' },
    { label: 'TypeScript', img: '/images/about/ts.png' },
    { label: 'React', img: '/images/about/react.png' },
    { label: 'FIgma', img: '/images/about/figma.png' },
    { label: 'PhotoShop', img: '/images/about/ps.png' },
];

export default function AboutPage() {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const aboutRef = useRef(null);
    const meRef = useRef(null);
    const interestsRef = useRef(null);
    const photoRefs = useRef([]);
    const learningRef = useRef(null);
    const learningTitleRef = useRef(null);
    const learningSubRef = useRef(null);
    const learningPhotoRefs = useRef([]);
    const skillsRef = useRef(null);
    const skillsTitleRef = useRef(null);
    const skillsIconRefs = useRef([]);

    useLayoutEffect(() => {
        dispatch(setHeaderVisible(false));
        dispatch(setHeaderDark(false));

        // useLayoutEffect: paint 전 동기 실행 → scroll=0 보장 상태에서 직접 GSAP 초기화
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // --- Hero animation ---
            const navEl = document.querySelector('[data-nav-item="about"]');
            const aboutEl = aboutRef.current;
            if (!navEl || !aboutEl) return;

            const navRect = navEl.getBoundingClientRect();
            const aboutRect = aboutEl.getBoundingClientRect();

            const navCX = navRect.left + navRect.width / 2;
            const navCY = navRect.top + HEADER_HIDDEN_OFFSET + navRect.height / 2;

            // 스크롤·헤더 상태와 무관하게 항상 뷰포트 중심값 사용
            // → dy 항상 음수(위쪽) 보장
            const aboutCX = window.innerWidth / 2;
            const aboutCY = window.innerHeight / 2;

            const dx = navCX - aboutCX;
            const dy = navCY - aboutCY;
            const scaleFactor = navRect.height / aboutRect.height;

            const tl1 = gsap.timeline({ paused: true });
            tl1.to(
                aboutEl,
                {
                    x: dx,
                    y: dy,
                    scale: scaleFactor,
                    color: '#DB6C1B',
                    ease: 'power1.inOut',
                    duration: 1,
                },
                0
            );
            tl1.to(meRef.current, { opacity: 0, ease: 'power1.in', duration: 0.4 }, 0);

            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: 'top top',
                end: '+=100%',
                scrub: 1,
                pin: true,
                animation: tl1,
                onUpdate: (self) => {
                    if (self.progress >= 0.97) {
                        dispatch(setHeaderVisible(true));
                    } else {
                        dispatch(setHeaderVisible(false));
                    }
                },
            });

            // --- Interests animation ---
            const photos = PHOTO_CONFIGS.map((_, i) => photoRefs.current[i]).filter(Boolean);
            if (photos.length > 0 && interestsRef.current) {
                photos.forEach((photo, i) => {
                    gsap.set(photo, {
                        opacity: 0,
                        y: 80,
                        zIndex: i + 1,
                    });
                });

                const tl2 = gsap.timeline({ paused: true });
                photos.forEach((photo, i) => {
                    tl2.to(
                        photo,
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                        i * 0.85
                    );
                });

                ScrollTrigger.create({
                    trigger: interestsRef.current,
                    start: 'top top',
                    end: '+=500%',
                    pin: true,
                    scrub: 1,
                    animation: tl2,
                });
            }

            // --- Learning by Doing animation ---
            const titleEl = learningTitleRef.current;
            const subEl = learningSubRef.current;
            const lPhotos = LEARNING_PHOTOS.map((_, i) => learningPhotoRefs.current[i]).filter(
                Boolean
            );

            if (titleEl && subEl && learningRef.current) {
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const stagger = 1.5;
                const photoDuration = 3;

                gsap.set(titleEl, { x: -vw * 1.5 });
                gsap.set(subEl, { x: vw * 1.5 });
                lPhotos.forEach((photoEl) => {
                    gsap.set(photoEl, { y: vh });
                });

                const tl3 = gsap.timeline({ paused: true });

                tl3.to(titleEl, { x: 0, duration: 1, ease: 'power2.inOut' }, 0);
                tl3.to(subEl, { x: 0, duration: 1, ease: 'power2.inOut' }, 0);

                lPhotos.forEach((photoEl, i) => {
                    const photoH = LEARNING_PHOTOS[i].h;
                    tl3.fromTo(
                        photoEl,
                        { y: vh },
                        { y: -photoH, duration: photoDuration, ease: 'none' },
                        1.5 + i * stagger
                    );
                });

                const totalDur = 1.5 + (lPhotos.length - 1) * stagger + photoDuration;
                ScrollTrigger.create({
                    trigger: learningRef.current,
                    start: 'top top',
                    end: `+=${Math.round(totalDur * 100)}%`,
                    pin: true,
                    scrub: 1,
                    animation: tl3,
                });
            }

            // --- Skills section animation ---
            const skillsTitleEl = skillsTitleRef.current;
            const skillIcons = SKILLS.map((_, i) => skillsIconRefs.current[i]).filter(Boolean);

            if (skillsTitleEl && skillsRef.current) {
                gsap.set(skillsTitleEl, { y: 50, opacity: 0 });
                if (skillIcons.length > 0) {
                    gsap.set(skillIcons, { y: 70, opacity: 0 });
                }

                const tl4 = gsap.timeline({
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                });

                tl4.to(skillsTitleEl, {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                }).to(
                    skillIcons,
                    { y: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.4)', stagger: 0.07 },
                    '-=0.3'
                );
            }
        }); // gsap.context 닫기

        return () => ctx.revert();
    }, [dispatch]);

    const handlePhotoEnter = (i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        gsap.to(el, { scale: 1.3, zIndex: 100, duration: 0.3, ease: 'power2.out' });
    };

    const handlePhotoLeave = (i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        gsap.to(el, { scale: 1, zIndex: i + 1, duration: 0.3, ease: 'power2.inOut' });
    };

    return (
        <>
            {/* Hero section */}
            <div
                ref={wrapperRef}
                style={{
                    width: '100%',
                    height: '100vh',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <span
                        ref={aboutRef}
                        style={{
                            fontFamily: FONT_AL,
                            fontSize: '500px',
                            fontWeight: 300,
                            fontStyle: 'italic',
                            color: '#000',
                            lineHeight: 1,
                            display: 'block',
                            transformOrigin: 'center center',
                            userSelect: 'none',
                        }}
                    >
                        About
                    </span>
                    <span
                        ref={meRef}
                        style={{
                            fontFamily: FONT,
                            fontSize: '22px',
                            fontWeight: 400,
                            color: '#000',
                            position: 'absolute',
                            bottom: '36px',
                            right: '-52px',
                            lineHeight: 1,
                            userSelect: 'none',
                        }}
                    >
                        me
                    </span>
                </div>
            </div>

            {/* Interests section */}
            <section
                ref={interestsRef}
                style={{
                    width: '100%',
                    height: '100vh',
                    background: '#fff',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        width: '1700px',
                        margin: '0 auto',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '120px 0 60px',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Top row: description + title */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexShrink: 0,
                            gap: '123px',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: FONT_AL,
                                fontSize: '20px',
                                fontWeight: 400,
                                color: '#000',
                                lineHeight: '33px',
                                maxWidth: '580px',
                                margin: 0,
                                wordBreak: 'keep-all',
                            }}
                        >
                            이것저것 배우고 경험하는 걸 좋아해서 취미가 좀 다양한 편입니다. 옷을
                            직접 디자인해서 만들어 입을 정도로 하나에 깊게 몰입하기도 하고,
                            클라이밍처럼 한계를 시험하는 운동이나 모델 촬영 같은 색다른 활동에도
                            관심이 많습니다. 가끔은 여행을 떠나거나 동물들과 교감하면서 힐링하는
                            시간도 가지는데, 이렇게 다양한 경험들이 저를 계속 움직이게 만드는
                            원동력이 됩니다.
                        </p>

                        <h2
                            style={{
                                fontFamily: FONT,
                                fontSize: '120px',
                                fontWeight: 700,
                                color: '#000',
                                margin: 0,
                                lineHeight: 1,
                                userSelect: 'none',
                                letterSpacing: '-3px',
                            }}
                        >
                            Interests
                        </h2>
                    </div>

                    {/* Photo area: 1526×528, 각 사진 절대 배치 */}
                    <div
                        style={{
                            position: 'relative',
                            width: '1526px',
                            height: '528px',
                            margin: '20px auto 0',
                            flexShrink: 0,
                        }}
                    >
                        {PHOTO_CONFIGS.map((cfg, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    photoRefs.current[i] = el;
                                }}
                                onMouseEnter={() => handlePhotoEnter(i)}
                                onMouseLeave={() => handlePhotoLeave(i)}
                                style={{
                                    position: 'absolute',
                                    left: `${cfg.left}px`,
                                    top: `${cfg.top}px`,
                                    cursor: 'pointer',
                                    willChange: 'transform, opacity',
                                    opacity: 0,
                                }}
                            >
                                <img
                                    src={`/images/about/Interests${i + 1}.png`}
                                    alt=""
                                    style={{
                                        width: '281px',
                                        height: '459px',
                                        transform: `rotate(${cfg.rotate}deg)`,
                                        display: 'block',
                                        boxShadow: '0 0 21.6px 1.2px rgba(0, 0, 0, 0.25)',
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                    }}
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Learning by Doing section — dark bg, photos pass through from bottom to top */}
            <section
                ref={learningRef}
                style={{
                    width: '1600px',
                    height: '100vh',
                    background: '#fff',
                    overflow: 'hidden',
                    position: 'relative',
                    margin: '0 auto',
                }}
            >
                {/* Text — vertically centered, stays fixed while photos scroll through */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '28px',
                        zIndex: 1,
                        pointerEvents: 'none',
                        width: '100%',
                    }}
                >
                    <h2
                        ref={learningTitleRef}
                        style={{
                            fontFamily: FONT,
                            fontSize: '80px',
                            fontWeight: 500,
                            color: '#000',
                            margin: 0,
                            textAlign: 'center',
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            marginRight: '44px',
                        }}
                    >
                        Learning by Doing
                    </h2>
                    <p
                        ref={learningSubRef}
                        style={{
                            fontFamily: FONT,
                            fontSize: '28px',
                            fontWeight: 400,
                            color: '#555',
                            margin: 0,
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            // marginLeft: '50px',
                        }}
                    >
                        직접 경험하며 성장한 저의 과정을 소개합니다.
                    </p>
                </div>

                {/* Photos — 화면 왼/오른쪽 끝에서 아래→위로 통과 */}
                {LEARNING_PHOTOS.map((photo, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            learningPhotoRefs.current[i] = el;
                        }}
                        className="group"
                        style={{
                            position: 'absolute',
                            top: 0,
                            ...(photo.side === 'left' ? { left: 0 } : { right: 0 }),
                            width: `${photo.w}px`,
                            height: `${photo.h}px`,
                            borderRadius: '40px',
                            overflow: 'hidden',
                            zIndex: 10 + i,
                        }}
                    >
                        <img
                            src={photo.img}
                            alt=""
                            className="transition-[filter] duration-300 group-hover:brightness-100"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                filter: 'brightness(0.75)',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                            draggable={false}
                        />
                        <div
                            className="transition-opacity duration-300 group-hover:opacity-0"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: FONT,
                                    fontSize: '100px',
                                    fontWeight: 500,
                                    color: '#FFF',
                                    textShadow: '0 12px 21.6px rgba(0, 0, 0, 0.25)',
                                    lineHeight: 1,
                                }}
                            >
                                {photo.year}
                            </span>
                            <span
                                style={{
                                    fontFamily: FONT,
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    color: '#FFF',
                                    textShadow: '0 12px 30px #000',
                                    textAlign: 'center',
                                    whiteSpace: 'pre-line',
                                }}
                            >
                                {photo.desc}
                            </span>
                        </div>
                    </div>
                ))}
            </section>

            {/* Skills section */}
            <section
                ref={skillsRef}
                style={{
                    width: '100%',
                    minHeight: '100vh',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '108px',
                }}
            >
                <h2
                    ref={skillsTitleRef}
                    style={{
                        fontFamily: FONT,
                        fontSize: '100px',
                        fontWeight: 500,
                        color: '#000000',
                        lineHeight: 'normal',
                        letterSpacing: 0,
                        margin: 0,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        marginRight: 520,
                    }}
                >
                    UI/UX PLANNING & DESIGN
                    <br />
                    FRONT-END DEVELOPMENT
                </h2>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '64px',
                    }}
                >
                    {SKILLS.map((skill, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                skillsIconRefs.current[i] = el;
                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '14px',
                            }}
                        >
                            <img
                                src={skill.img}
                                alt={skill.label}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'contain',
                                    display: 'block',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                }}
                                draggable={false}
                            />
                            <span
                                style={{
                                    fontFamily: FONT,
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#DB6C1B',
                                    lineHeight: 'normal',
                                    letterSpacing: 0,
                                }}
                            >
                                {skill.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
