const strengths = [
  'Design-aware frontend implementation',
  'Component architecture and maintainability',
  'Clear communication and documentation',
]

export function AboutStrengthsSection() {
  return (
    <section className="content-card">
      <p className="section-kicker">Strengths</p>
      <h3>Core strengths</h3>
      <ul className="feature-list">
        {strengths.map((strength) => (
          <li key={strength}>{strength}</li>
        ))}
      </ul>
    </section>
  )
}
