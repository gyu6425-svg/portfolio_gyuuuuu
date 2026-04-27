const highlights = [
    'Reusable section components for each page',
    'Simple state-based pagination without router dependency',
    'Easy file structure for adding real portfolio content later',
];

export function HomeHighlightsSection() {
    return (
        <section className="content-card">
            <p className="section-kicker">Highlights</p>
            <h3>What this starter gives you</h3>
            <ul className="feature-list">
                {highlights.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </section>
    );
}
