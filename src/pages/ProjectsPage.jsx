import { useState, useRef, useEffect, memo } from 'react';
import { gsap } from 'gsap';

const FONT = 'Pretendard Variable, Pretendard, sans-serif';
const FONT_AL = 'Alkatra, cursive';

const CARD_W = 388;
const CARD_H = 426.32;
const CARD_GAP = 100;
const SINGLE_SET_H = 3 * (CARD_H + CARD_GAP); // 1578.96

// tags: [{ label: 'web' | 'design', url: '링크 주소' }]
// url을 비워두면 칩이 비활성화 상태로 표시됩니다
const PROJECTS = [
    {
        id: 1,
        image: '/images/project/works1.png',
        title: '에잇세컨즈 UI/UX 리뉴얼',
        subtitle: '장바구니까지 가는 시간, 8초',
        highlightWord: '8초',
        description:
            "유저가 취향을 발견하고 장바구니에 담기까지 걸리는 시간, 단 8초면 충분합니다.\n복잡한 탐색 과정을 직관적인 필터와 개인화된 큐레이션으로\n재설계하여 이탈률을 낮추고 브랜드 아이덴티티를 투영한\n효율적인 UI를 통해 구매 여정의 '속도'와 '즐거움'을 동시에 잡았습니다.",
        tags: [
            { label: 'web', url: 'https://8seconds-renewal.vercel.app/' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/1588Lw3eULhOMcsL9Df7Wt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=590-17402&viewport=-2640%2C-365%2C0.05&t=LbO90GmJVCU0HS9b-1&scaling=scale-down-width&content-scaling=fixed&page-id=215%3A247',
            },
        ],
    },
    {
        id: 2,
        image: '/images/project/works2.png',
        title: '에잇세컨즈 UI/UX 리뉴얼',
        subtitle: '바구니까지 가는 시간, 8초',
        highlightWord: '8초',
        description:
            '유저가 취향을 발견하고 장바구니에 담기까지 걸리는 시간, 단 8초면 충분합니다. 복잡한 탐색 과정을 직관적인 필터와 개인화된 큐레이션으로 재설계하여 이탈률을 낮추고 브랜드 아이덴티티를 투영한 효율적인 UI를 통해 구매 여정의 속도와 즐거움을 동시에 잡았습니다.',
        tags: [
            { label: 'web', url: 'https://8seconds-renewal.vercel.app/' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/1588Lw3eULhOMcsL9Df7Wt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=590-17402&viewport=-2640%2C-365%2C0.05&t=LbO90GmJVCU0HS9b-1&scaling=scale-down-width&content-scaling=fixed&page-id=215%3A247',
            },
        ],
    },
    {
        id: 3,
        image: '/images/project/works3.png',
        title: '하나투어 리뉴얼',
        subtitle: '여행의 시작, 더 쉽게',
        highlightWord: '',
        description:
            '정보가 많은 여행 페이지의 특성을 고려하여, 상품 정보를 규격화된 모듈형 카드 UI로 깔끔하게 정돈했습니다. 일관성 있는 아이콘 시스템과 컬러 팔레트를 적용해 서비스의 가독성을 높이고 브랜드 아이덴티티를 명확히 했습니다. 화려한 장식적 요소를 배제하고 콘텐츠 자체에 집중할 수 있는 미니멀한 인터페이스로 사용자 편의성을 높였습니다.',
        tags: [
            { label: 'web', url: 'https://gyu6425-svg.github.io/gyu/' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/xGVrGcq5hINtWh0vFVfKKv/5%EC%A1%B0-%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?page-id=17%3A8&node-id=97-826&viewport=1493%2C-1626%2C0.22&t=3714ttTHx4BFIXpt-1&scaling=min-zoom&content-scaling=fixed',
            },
        ],
    },
    {
        id: 4,
        image: '/images/project/works4.png',
        title: '뚜레쥬르 리뉴얼',
        subtitle: '매일의 빵, 더 특별하게',
        highlightWord: '',
        description:
            '뚜레쥬르 고유의 따스한 감성을 트렌디한 컬러 팔레트와 정제된 레이아웃으로 재해석했습니다.제품의 질감을 극대화하는 고해상도 비주얼 중심의 UI를 배치하여 사용자의 시각적 몰입감을 높였습니다.',
        tags: [
            { label: 'web', url: 'https://miniproject1-plum.vercel.app/' },
            {
                label: 'design',
                url: 'https://www.figma.com/design/FZle3KEFUgg2Q0yT2zhIGY/%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&t=2q90OqRJmkw2j4TT-1',
            },
        ],
    },
    {
        id: 5,
        image: '/images/project/works5.png',
        title: '뚜레쥬르 리뉴얼',
        subtitle: '매일의 빵, 더 특별하게',
        highlightWord: '',
        description:
            '뚜레쥬르 고유의 따스한 감성을 트렌디한 컬러 팔레트와 정제된 레이아웃으로 재해석했습니다.제품의 질감을 극대화하는 고해상도 비주얼 중심의 UI를 배치하여 사용자의 시각적 몰입감을 높였습니다.',
        tags: [
            { label: 'web', url: 'https://miniproject1-plum.vercel.app/' },
            {
                label: 'design',
                url: 'https://www.figma.com/design/FZle3KEFUgg2Q0yT2zhIGY/%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&t=2q90OqRJmkw2j4TT-1',
            },
        ],
    },
    {
        id: 6,
        image: '/images/project/works6.png',
        title: '하나투어 리뉴얼',
        subtitle: '여행의 시작, 더 쉽게',
        highlightWord: '',
        description:
            '정보가 많은 여행 페이지의 특성을 고려하여, 상품 정보를 규격화된 모듈형 카드 UI로 깔끔하게 정돈했습니다. 일관성 있는 아이콘 시스템과 컬러 팔레트를 적용해 서비스의 가독성을 높이고 브랜드 아이덴티티를 명확히 했습니다. 화려한 장식적 요소를 배제하고 콘텐츠 자체에 집중할 수 있는 미니멀한 인터페이스로 사용자 편의성을 높였습니다.',
        tags: [
            { label: 'web', url: 'https://gyu6425-svg.github.io/gyu/' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/xGVrGcq5hINtWh0vFVfKKv/5%EC%A1%B0-%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?page-id=17%3A8&node-id=97-826&viewport=1493%2C-1626%2C0.22&t=3714ttTHx4BFIXpt-1&scaling=min-zoom&content-scaling=fixed',
            },
        ],
    },
    {
        id: 7,
        image: '/images/project/works7.png',
        title: 'KELOW',
        subtitle: '음악을 더 가깝게',
        highlightWord: '',
        description:
            '파편화된 정보를 통합하여 아티스트와 관련된 모든 다양한 콘텐츠를 한눈에 관통하는 연결 중심의 UI를 설계했습니다. 개인 맞춤화된 홈 피드에서 시작해 나만의 아티스트 상세 페이지로 이어지는 유연한 탐색 구조를 구현했습니다. 아티스트의 정체성을 강조한 디자인 레이아웃으로 콘텐츠 간 이동을 자연스럽게 유도하며 서비스 체류 시간을 극대화했습니다.',
        tags: [
            { label: 'web', url: 'https://ott-five-psi.vercel.app/' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/3F4BW0L0iFVc1YkUVywTrG/%EC%9D%B4%EC%A0%A0_FE_%EA%B3%B5%EC%A7%80-%EC%9E%91%EC%97%85-5%EC%A1%B0?page-id=1544%3A10899&node-id=1544-10907&viewport=718%2C735%2C0.04&t=l3g4OaEG9OvlHgH5-1&scaling=min-zoom&content-scaling=fixed',
            },
        ],
    },
    {
        id: 8,
        image: '/images/project/works8.png',
        title: '삼성전자 UI 리뉴얼',
        subtitle: '기술과 경험의 균형',
        highlightWord: '',
        description:
            '세계 시장을 선도하는 하이테크 기업의 위상을 현대적이고 세련된 UI 환경으로 리뉴얼했습니다. 반도체 칩셋의 정교함과 모바일의 유연함을 닮은 컴포넌트 설계를 통해 브랜드 일관성을 확보했습니다. 일방적인 정보 제공을 넘어, 깔끔한 인터랙션과 정돈된 콘텐츠 배치를 통해 사용자에게 쾌적한 기업 탐색 경험을 선사합니다.',
        tags: [
            { label: 'web', url: 'https://samsung-ui-design.vercel.app/' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/mlR9n9rgCeP25QZp0v6ski/study_ezen?node-id=237-1330&viewport=-2099%2C-2197%2C0.17&t=sitpNak101Dec4VN-1&scaling=scale-down-width&content-scaling=fixed&page-id=131%3A3',
            },
        ],
    },
    {
        id: 9,
        image: '/images/project/works9.png',
        title: '삼성전자 UI 리뉴얼',
        subtitle: '기술과 경험의 균형',
        highlightWord: '',
        description:
            '세계 시장을 선도하는 하이테크 기업의 위상을 현대적이고 세련된 UI 환경으로 리뉴얼했습니다. 반도체 칩셋의 정교함과 모바일의 유연함을 닮은 컴포넌트 설계를 통해 브랜드 일관성을 확보했습니다. 일방적인 정보 제공을 넘어, 깔끔한 인터랙션과 정돈된 콘텐츠 배치를 통해 사용자에게 쾌적한 기업 탐색 경험을 선사합니다.',
        tags: [
            { label: 'web', url: 'https://samsung-ui-design.vercel.app/' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/mlR9n9rgCeP25QZp0v6ski/study_ezen?node-id=237-1330&viewport=-2099%2C-2197%2C0.17&t=sitpNak101Dec4VN-1&scaling=scale-down-width&content-scaling=fixed&page-id=131%3A3',
            },
        ],
    },
    {
        id: 10,
        image: '/images/project/works10.png',
        title: 'KELOW',
        subtitle: '음악을 더 가깝게',
        highlightWord: '',
        description:
            '파편화된 정보를 통합하여 아티스트와 관련된 모든 다양한 콘텐츠를 한눈에 관통하는 연결 중심의 UI를 설계했습니다. 개인 맞춤화된 홈 피드에서 시작해 나만의 아티스트 상세 페이지로 이어지는 유연한 탐색 구조를 구현했습니다. 아티스트의 정체성을 강조한 디자인 레이아웃으로 콘텐츠 간 이동을 자연스럽게 유도하며 서비스 체류 시간을 극대화했습니다.',
        tags: [
            { label: 'web', url: 'https://ott-five-psi.vercel.app/' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/3F4BW0L0iFVc1YkUVywTrG/%EC%9D%B4%EC%A0%A0_FE_%EA%B3%B5%EC%A7%80-%EC%9E%91%EC%97%85-5%EC%A1%B0?page-id=1544%3A10899&node-id=1544-10907&viewport=718%2C735%2C0.04&t=l3g4OaEG9OvlHgH5-1&scaling=min-zoom&content-scaling=fixed',
            },
        ],
    },
    {
        id: 11,
        image: '/images/project/works11.png',
        title: '메디힐 리뉴얼',
        subtitle: '피부 케어의 새로운 시작',
        highlightWord: '',
        description:
            '"연구는 더 깊게, 해답은 더 쉽게" 메디힐의 철학을 시각적 경험으로 증명하다. 분산된 핵심 정보를 명확한 위계로 재구성하여 브랜드의 정밀한 가치를 전달합니다.',
        tags: [
            { label: 'web', url: 'https://mediheal-tazo.vercel.app' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/1588Lw3eULhOMcsL9Df7Wt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?page-id=206%3A2&node-id=206-8658&viewport=152%2C371%2C0.04&t=lb4XG7Uiqv1Z596v-1&scaling=contain&content-scaling=fixed',
            },
        ],
    },
    {
        id: 12,
        image: '/images/project/works12.png',
        title: '메디힐 리뉴얼',
        subtitle: '피부 케어의 새로운 시작',
        highlightWord: '',
        description:
            '"연구는 더 깊게, 해답은 더 쉽게" 메디힐의 철학을 시각적 경험으로 증명하다. 분산된 핵심 정보를 명확한 위계로 재구성하여 브랜드의 정밀한 가치를 전달합니다.',
        tags: [
            { label: 'web', url: 'https://mediheal-tazo.vercel.app' },
            {
                label: 'design',
                url: 'https://www.figma.com/proto/1588Lw3eULhOMcsL9Df7Wt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?page-id=206%3A2&node-id=206-8658&viewport=152%2C371%2C0.04&t=lb4XG7Uiqv1Z596v-1&scaling=contain&content-scaling=fixed',
            },
        ],
    },
];

const COLUMNS_CONFIG = [
    { id: 0, indices: [0, 1, 2], direction: 'down', duration: 20 },
    { id: 1, indices: [3, 4, 5], direction: 'up', duration: 24 },
    { id: 2, indices: [6, 7, 8], direction: 'down', duration: 18 },
    { id: 3, indices: [9, 10, 11], direction: 'up', duration: 22 },
];

const InfiniteColumn = memo(function InfiniteColumn({ config, onCardClick }) {
    const trackRef = useRef(null);
    const cards = config.indices.map((i) => PROJECTS[i]);
    const isDown = config.direction === 'down';

    useEffect(() => {
        const tween = gsap.fromTo(
            trackRef.current,
            { y: isDown ? -SINGLE_SET_H : 0 },
            { y: isDown ? 0 : -SINGLE_SET_H, duration: config.duration, ease: 'none', repeat: -1 }
        );
        return () => tween.kill();
    }, [isDown, config.duration]);

    return (
        <div style={{ width: CARD_W, height: '100%', overflow: 'hidden', flexShrink: 0 }}>
            <div ref={trackRef} style={{ display: 'flex', flexDirection: 'column', gap: CARD_GAP }}>
                {[...cards, ...cards].map((card, i) => (
                    <div
                        key={i}
                        onClick={() => onCardClick(card)}
                        style={{
                            width: CARD_W,
                            height: CARD_H,
                            borderRadius: '40px',
                            border: '1px solid #999',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            flexShrink: 0,
                        }}
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

function ProjectModal({ project, onClose }) {
    const overlayRef = useRef(null);
    const closingRef = useRef(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && !closingRef.current) {
                closingRef.current = true;
                gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const handleClose = () => {
        if (closingRef.current) return;
        closingRef.current = true;
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
    };

    const subtitleParts = project.highlightWord
        ? project.subtitle.split(project.highlightWord)
        : [project.subtitle];

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Close */}
            <button
                onClick={handleClose}
                style={{
                    position: 'absolute',
                    top: '67px',
                    right: '75px',
                    fontFamily: FONT_AL,
                    fontSize: '18px',
                    fontWeight: 400,
                    color: '#FFF',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                    padding: 0,
                }}
            >
                close
            </button>

            {/* Content */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '173px',
                    padding: '0 120px',
                    maxWidth: '1700px',
                    width: '100%',
                }}
            >
                {/* Left: image */}
                <div
                    style={{
                        width: CARD_W * 1.5,
                        height: CARD_H * 1.5,
                        borderRadius: '40px',
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                        draggable={false}
                    />
                </div>

                {/* Right: text */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '40px',
                        width: '683px',
                        flexShrink: 0,
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h2
                            style={{
                                fontFamily: FONT,
                                fontSize: '60px',
                                fontWeight: 700,
                                color: '#FFF',
                                margin: 0,
                                lineHeight: 'normal',
                            }}
                        >
                            {project.title}
                        </h2>
                        <p
                            style={{
                                fontFamily: FONT,
                                fontSize: '30px',
                                fontWeight: 500,
                                color: '#f5f5f5',
                                margin: 0,
                                lineHeight: 'normal',
                            }}
                        >
                            {subtitleParts[0]}
                            {project.highlightWord && (
                                <span style={{ color: '#DB6C1B' }}>{project.highlightWord}</span>
                            )}
                            {subtitleParts[1]}
                        </p>
                    </div>

                    <p
                        style={{
                            fontFamily: FONT,
                            fontSize: '21px',
                            fontWeight: 400,
                            color: '#999',
                            margin: 0,
                            lineHeight: '1.6',
                            whiteSpace: 'normal',
                            wordBreak: 'keep-all',
                        }}
                    >
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {project.tags.map((tag) => (
                            <a
                                key={tag.label}
                                href={tag.url || undefined}
                                target={tag.url ? '_blank' : undefined}
                                rel={tag.url ? 'noopener noreferrer' : undefined}
                                onClick={tag.url ? undefined : (e) => e.preventDefault()}
                                style={{
                                    display: 'flex',
                                    width: '108px',
                                    height: '44px',
                                    padding: '0 20px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '10px',
                                    borderRadius: '40px',
                                    background: 'transparent',
                                    border: '1px solid #FFF',
                                    fontFamily: FONT_AL,
                                    fontSize: '20px',
                                    fontWeight: 400,
                                    color: '#FFF',
                                    lineHeight: 'normal',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    cursor: tag.url ? 'pointer' : 'default',
                                    transition: 'background 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    if (tag.url)
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {tag.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsPage() {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <section
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    marginLeft: 'calc(50% - 50vw)',
                    background: '#000',
                    overflow: 'hidden',
                }}
            >
                {/* Background "projects" text */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                >
                    <span
                        style={{
                            fontFamily: FONT,
                            fontSize: '300px',
                            fontWeight: 500,
                            color: '#FFF',
                            lineHeight: 'normal',
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        projects
                    </span>
                </div>

                {/* Columns */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        gap: '100px',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    {COLUMNS_CONFIG.map((col) => (
                        <InfiniteColumn key={col.id} config={col} onCardClick={setSelected} />
                    ))}
                </div>
            </section>

            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </>
    );
}
