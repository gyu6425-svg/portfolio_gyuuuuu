const channels = ['Email', 'GitHub', 'Notion', 'LinkedIn']

export function ContactSection() {
  return (
    <section className="content-card">
      <p className="section-kicker">Contact</p>
      <h2>Make it easy for people to reach you.</h2>
      <div className="stack-list">
        {channels.map((channel) => (
          <span key={channel}>{channel}</span>
        ))}
      </div>
    </section>
  )
}
