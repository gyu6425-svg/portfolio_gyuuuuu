import { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TOOLS = [
    { src: '/images/react.png', alt: 'React' },
    { src: '/images/figma.png', alt: 'Figma' },
    { src: '/images/photoshop.png', alt: 'Photoshop' },
    { src: '/images/javascript.png', alt: 'JavaScript' },
];

const PERSONAL_PROJECT_TOOLS = [
    { src: '/images/react.png', alt: 'React' },
    { src: '/images/figma.png', alt: 'Figma' },
    { src: '/images/photoshop.png', alt: 'Photoshop' },
    { src: '/images/typescript_logo.png', alt: 'TypeScript' },
];

const PROJECT_SECTIONS = [
    {
        title: 'Team Project',
        description: (
            <>
                구조화된 정보를 직관적인 화면으로 제공해
                <br />
                핵심을 명확히 전달하고 신뢰도 높은 리뷰를
                <br />
                바탕으로 간편한 의사결정을 지원
            </>
        ),
        mainImage: '/images/team1.png',
        detailImages: ['/images/team2.png', '/images/team3.png'],
        copyOffset: { x: -40, y: 20 },
        // url을 채우면 클릭 시 해당 링크로 이동합니다
        stacks: [
            { label: 'Web', url: 'https://mediheal-tazo.vercel.app' },
            {
                label: 'Design',
                url: 'https://www.figma.com/proto/1588Lw3eULhOMcsL9Df7Wt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?page-id=206%3A2&node-id=206-8658&viewport=152%2C371%2C0.04&t=lb4XG7Uiqv1Z596v-1&scaling=contain&content-scaling=fixed',
            },
        ],
    },
    {
        title: 'Personal Project2',
        description: (
            <>
                효율적인 결제 동선과 최적화된 시각 정보를
                <br />
                구축하여 스타일링 제안이 강화된 콘텐츠
                <br />
                중심 UI를 구현했습니다.
            </>
        ),
        mainImage: '/images/sol1.png',
        detailImages: ['/images/sol2.png', '/images/sol3.png'],
        copyOffset: { x: 0, y: 0 },
        reverse: true,
        tools: PERSONAL_PROJECT_TOOLS,
        stacks: [
            { label: 'Web', url: 'https://8seconds-renewal.vercel.app/' },
            {
                label: 'Design',
                url: 'https://www.figma.com/proto/1588Lw3eULhOMcsL9Df7Wt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=590-17402&viewport=-2640%2C-365%2C0.05&t=LbO90GmJVCU0HS9b-1&scaling=scale-down-width&content-scaling=fixed&page-id=215%3A247',
            },
        ],
    },
    {
        title: 'Personal Project1',
        description: (
            <>
                여행자가 다양한 정보를 한 화면에서 탐색하고
                <br />
                예약 플랫폼으로 빠르게 이동할 수 있도록 만든
                <br />
                여행 정보 통합 서비스입니다.
            </>
        ),
        mainImage: '/images/sol1-1.png',
        detailImages: ['/images/sol1-2.png', '/images/sol1-3.png'],
        copyOffset: { x: 0, y: 0 },
        titleOffset: { x: -22, y: 0 },
        tools: PERSONAL_PROJECT_TOOLS,
        stacks: [
            { label: 'Web', url: 'https://plan-p-three.vercel.app' },
            {
                label: 'Design',
                url: 'https://www.figma.com/proto/IYv9roJGb8V4WLDvg5mRo4/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=426-36999&viewport=-1353%2C76%2C0.03&t=Sp7v7WRpliDSmXKv-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1',
            },
        ],
    },
];

const ProjectBlock = memo(function ProjectBlock({ project, className = '' }) {
    const isReverse = Boolean(project.reverse);
    const { copyOffset = { x: 0, y: 0 } } = project;
    const { titleOffset = { x: 0, y: 0 } } = project;
    const tools = project.tools || PROJECT_TOOLS;

    const containerRef = useRef(null);
    const mainImageRef = useRef(null);
    const copyRef = useRef(null);
    const galleryRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const heroTrigger = { trigger: containerRef.current, start: 'top 75%' };
            const galleryTrigger = { trigger: galleryRef.current, start: 'top 85%' };

            // 이미지 — Team: 왼쪽에서, Personal(reverse): 오른쪽에서
            gsap.fromTo(
                mainImageRef.current,
                { opacity: 0, x: isReverse ? 80 : -80 },
                { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: heroTrigger }
            );

            // 텍스트 — Team: 오른쪽에서, Personal(reverse): 왼쪽에서
            // 최종 위치에 copyOffset 반영 (기존 Tailwind offsetClassName 대체)
            gsap.fromTo(
                copyRef.current,
                { opacity: 0, x: isReverse ? -80 : 80, y: copyOffset.y },
                {
                    opacity: 1,
                    x: copyOffset.x,
                    y: copyOffset.y,
                    duration: 0.9,
                    delay: 0.12,
                    ease: 'power2.out',
                    scrollTrigger: heroTrigger,
                }
            );

            // 갤러리 카드 2개 — 각각 밑에서 위로 (stagger)
            gsap.fromTo(
                [card1Ref.current, card2Ref.current],
                { opacity: 0, y: 70 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.18,
                    ease: 'power2.out',
                    scrollTrigger: galleryTrigger,
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [isReverse, copyOffset.x, copyOffset.y]);

    return (
        <div ref={containerRef} className={className}>
            <div
                className={`flex items-start justify-between gap-0 max-[960px]:flex-col max-[960px]:gap-0 ${isReverse ? 'flex-row-reverse' : ''}`}
            >
                {/* 메인 이미지 */}
                <div
                    ref={mainImageRef}
                    className="project-image-hover h-[594px] w-[1094px] shrink-0 overflow-hidden rounded-[40px] max-[960px]:h-auto max-[960px]:w-full"
                    style={{ borderRadius: '40px', clipPath: 'inset(0 round 40px)' }}
                >
                    <img
                        src={project.mainImage}
                        alt={`${project.title} main visual`}
                        className="block h-full w-full rounded-[40px] object-cover"
                        style={{ borderRadius: '40px', clipPath: 'inset(0 round 40px)' }}
                    />
                </div>

                {/* 텍스트 / 메타 */}
                <div
                    ref={copyRef}
                    className={`${
                        isReverse
                            ? 'ml-10 items-start text-left max-[960px]:ml-0'
                            : 'mr-10 items-end text-right max-[960px]:mr-0'
                    } flex w-[520px] shrink-0 flex-col gap-[101px] pt-11 max-[960px]:w-full max-[960px]:items-start max-[960px]:text-left max-[960px]:gap-12 max-[960px]:pt-0`}
                >
                    <div
                        className={`flex flex-col gap-[26px] ${
                            isReverse ? 'items-start text-left' : 'items-end text-right'
                        } max-[960px]:items-start max-[960px]:text-left`}
                    >
                        <h2
                            className={`max-w-none whitespace-nowrap text-[60px] font-semibold leading-none text-black ${
                                isReverse ? 'text-left' : 'text-right'
                            } max-[960px]:text-left`}
                            style={{
                                fontFamily: 'Pretendard Variable, Pretendard, sans-serif',
                                transform: `translate(${titleOffset.x}px, ${titleOffset.y}px)`,
                            }}
                        >
                            {project.title}
                        </h2>
                        <p
                            className={`text-2xl font-medium leading-normal text-[#555] ${
                                isReverse ? 'text-left' : 'text-right'
                            } max-[960px]:text-left`}
                            style={{ fontFamily: 'Pretendard Variable, Pretendard, sans-serif' }}
                        >
                            {project.description}
                        </p>
                    </div>

                    <div
                        className={`flex flex-col gap-7 ${
                            isReverse ? 'items-start' : 'items-end'
                        } max-[960px]:items-start`}
                    >
                        <div
                            className={`flex items-center gap-3 ${isReverse ? 'justify-start' : 'justify-end'}`}
                        >
                            {project.stacks.map((stack) =>
                                stack.url ? (
                                    <a
                                        key={`${project.title}-${stack.label}`}
                                        href={stack.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-11 w-[108px] items-center justify-center gap-2.5 rounded-[40px] bg-[#f5f5f5] px-5 text-center text-xl leading-none text-black no-underline transition-colors hover:bg-[#DB6C1B] hover:text-black"
                                        style={{ fontFamily: 'Alkatra, cursive' }}
                                    >
                                        {stack.label}
                                    </a>
                                ) : (
                                    <span
                                        key={`${project.title}-${stack.label}`}
                                        className="flex h-11 w-[108px] items-center justify-center gap-2.5 rounded-[40px] bg-[#f5f5f5] px-5 text-center text-xl leading-none text-black"
                                        style={{ fontFamily: 'Alkatra, cursive' }}
                                    >
                                        {stack.label}
                                    </span>
                                )
                            )}
                        </div>

                        <div
                            className={`flex items-center gap-3 ${isReverse ? 'justify-start' : 'justify-end'}`}
                        >
                            {tools.map((tool) => (
                                <span
                                    key={`${project.title}-${tool.alt}`}
                                    className="flex h-[50px] w-[50px] items-center justify-center p-[7px]"
                                >
                                    <img
                                        src={tool.src}
                                        alt={tool.alt}
                                        className="block h-full w-full object-contain"
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 갤러리 카드 2장 */}
            <div
                ref={galleryRef}
                className="mt-[50px] flex gap-[50px] max-[960px]:mt-[50px] max-[960px]:flex-col max-[960px]:gap-6"
            >
                {project.detailImages.map((imageSrc, index) => (
                    <article
                        key={`${project.title}-${imageSrc}`}
                        ref={index === 0 ? card1Ref : card2Ref}
                        className="project-image-hover h-[464px] w-[825px] overflow-hidden rounded-[40px] bg-[#f8f8f8] max-[960px]:h-auto max-[960px]:w-full"
                        style={{ borderRadius: '40px', clipPath: 'inset(0 round 40px)' }}
                    >
                        <img
                            src={imageSrc}
                            alt={`${project.title} detail visual ${index + 1}`}
                            className="block h-full w-full rounded-[40px] object-cover"
                            style={{ borderRadius: '40px', clipPath: 'inset(0 round 40px)' }}
                        />
                    </article>
                ))}
            </div>
        </div>
    );
});

export function HomeProjectsSection() {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto min-h-[2928px] w-[1700px] max-w-[calc(100vw-80px)] py-[180px] max-[960px]:min-h-0 max-[960px]:max-w-[calc(100vw-40px)] max-[960px]:py-[120px]">
                <ProjectBlock project={PROJECT_SECTIONS[2]} />
                <ProjectBlock
                    project={PROJECT_SECTIONS[1]}
                    className="mt-[396px] max-[960px]:mt-[180px]"
                />
                <ProjectBlock
                    project={PROJECT_SECTIONS[0]}
                    className="mt-[396px] max-[960px]:mt-[180px]"
                />
            </div>
        </section>
    );
}
