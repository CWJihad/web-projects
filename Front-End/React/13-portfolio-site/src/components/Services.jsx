import { services } from "../data"

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
            <span className="inline-block w-4 h-px bg-accent mr-2 align-middle"></span>What I do
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-widest text-ink">Services</h2>
        </div>
        <span className="hidden md:block font-mono text-xs text-muted uppercase tracking-widest">0{services.length} offerings</span>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-border">
        {services.map((s) => (
          <div key={s.id} className="bg-paper p-8 group hover:bg-card transition-colors duration-200">
            <p className="font-mono text-xs text-accent mb-6">{s.id}</p>
            <h3 className="font-display text-3xl uppercase tracking-widest text-ink mb-4">{s.title}</h3>
            <p className="font-body text-sm text-muted leading-relaxed mb-6">{s.desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {s.tags.map(t => (
                <span key={t} className="font-mono text-xs px-2.5 py-1 border border-border text-muted group-hover:border-accent group-hover:text-accent transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
