const projectItems = [
    {
        title: 'Project One',
        description: 'Add your main portfolio project summary here.',
    },
    {
        title: 'Project Two',
        description: 'Describe the problem, stack, and your contribution.',
    },
    {
        title: 'Project Three',
        description: 'Include performance, UX, or business impact details.',
    },
];

export function ProjectsGridSection() {
    return (
        <section className="content-card">
            <p className="section-kicker">Projects</p>
            <h2>Selected work</h2>
            <div className="project-grid">
                {projectItems.map((project) => (
                    <article key={project.title} className="project-card">
                        <p className="project-index">Case Study</p>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
