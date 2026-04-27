const FONT = 'Pretendard Variable, Pretendard, sans-serif';
const FONT_AL = 'Alkatra, cursive';

export default function AboutPage() {
    return (
        <section
            style={{
                width: '100%',
                minHeight: '100vh',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: 'min(1700px, calc(100vw - 80px))',
                    display: 'flex',
                    gap: '50px',
                    alignItems: 'center',
                }}
            >
                {/* 왼쪽: 대형 타이틀 */}
                <div style={{ width: '825px', flexShrink: 0, textAlign: 'left' }}>
                    <h1
                        style={{
                            fontFamily: FONT,
                            fontSize: '100px',
                            fontWeight: 500,
                            color: '#000',
                            lineHeight: 1.05,
                            margin: 0,
                        }}
                    >
                        Let&apos;s start
                        <br />
                        something
                        <br />
                        <span
                            style={{
                                fontFamily: FONT_AL,
                                color: '#DB6C1B',
                                fontStyle: 'italic',
                            }}
                        >
                            togerher
                        </span>
                    </h1>
                </div>

                {/* 오른쪽: 설명 + 연락처 */}
                <div
                    style={{
                        width: '825px',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '60px',
                    }}
                >
                    {/* 소개 문구 */}
                    <p
                        style={{
                            fontFamily: FONT,
                            fontSize: '28px',
                            fontWeight: 400,
                            color: '#666',
                            lineHeight: '1.5',
                            margin: 0,
                        }}
                    >
                        추상을 실현으로, 상상을 현실적인 인터페이스로 출력합니다.
                        <br />
                        디자인과 개발 사이의 언어를 조율하며 더 나은 가치를 고민하겠습니다.
                        <br />
                        함께 성장하며 신뢰할 수 있는 결과물을 만들 준비가 되었습니다.
                    </p>

                    {/* Contact Me */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '48px',
                            width: '100%',
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: FONT_AL,
                                fontSize: '60px',
                                fontWeight: 700,
                                fontStyle: 'italic',
                                color: '#000',
                                margin: 0,
                                lineHeight: 'normal',
                            }}
                        >
                            Contact Me
                        </h2>

                        {/* Email */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: FONT_AL,
                                    fontSize: '30px',
                                    fontWeight: 700,
                                    fontStyle: 'italic',
                                    color: '#000',
                                    lineHeight: 'normal',
                                }}
                            >
                                Email.
                            </span>
                            <a
                                href="mailto:gyu6425@gmail.com"
                                style={{
                                    fontFamily: FONT,
                                    fontSize: '18px',
                                    fontWeight: 400,
                                    color: '#666',
                                    textDecoration: 'none',
                                    lineHeight: 'normal',
                                }}
                            >
                                gyu6425@gmail.com
                            </a>
                        </div>

                        {/* Phone */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: FONT_AL,
                                    fontSize: '30px',
                                    fontWeight: 700,
                                    fontStyle: 'italic',
                                    color: '#000',
                                    lineHeight: 'normal',
                                }}
                            >
                                Phone.
                            </span>
                            <span
                                style={{
                                    fontFamily: FONT,
                                    fontSize: '18px',
                                    fontWeight: 400,
                                    color: '#666',
                                    lineHeight: 'normal',
                                }}
                            >
                                010-4093-6420
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
