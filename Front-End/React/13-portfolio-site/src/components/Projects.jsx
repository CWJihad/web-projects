import { projects } from "../data"

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
            <span className="inline-block w-4 h-px bg-accent mr-2 align-middle"></span>What I've built
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-widest text-ink">Projects</h2>
        </div>
        <span className="hidden md:block font-mono text-xs text-muted uppercase tracking-widest">Selected work</span>
      </div>

      <div className="space-y-px bg-border">
        {projects.map((p, i) => (
          <a key={p.title} href={p.link}
            className="group flex flex-col md:flex-row md:items-center gap-4 bg-paper hover:bg-card px-6 py-7 transition-colors duration-200">
            
            {/* Number */}
            <span className="font-mono text-xs text-muted w-8 shrink-0">0{i + 1}</span>

            {/* Tag */}
            <span className="font-mono text-xs px-2.5 py-1 border border-border text-muted w-fit md:w-36 shrink-0">
              {p.tag}
            </span>

            {/* Title + desc */}
            <div className="flex-1">
              <h3 className="font-display text-2xl uppercase tracking-widest text-ink group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="font-body text-sm text-muted mt-1 leading-relaxed">{p.desc}</p>
            </div>

            {/* Tech stack */}
            <div className="hidden md:flex flex-wrap gap-1.5 justify-end max-w-xs">
              {p.tech.map(t => (
                <span key={t} className="font-mono text-xs px-2 py-0.5 bg-card border border-border text-muted">
                  {t}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <span className="hidden md:block font-mono text-lg text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 shrink-0">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
