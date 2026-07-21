import { skills } from "../data"

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
            <span className="inline-block w-4 h-px bg-accent mr-2 align-middle"></span>My toolkit
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-widest text-ink">Skills</h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((s, i) => (
          <span key={s}
            className={`font-mono text-sm px-4 py-2.5 border transition-colors duration-200 hover:border-accent hover:text-accent
              ${i % 5 === 0 ? "bg-ink text-paper border-ink hover:bg-accent hover:border-accent" : "bg-paper text-muted border-border"}`}>
            {s}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mt-16">
        {[
          { n: "10+", label: "Projects done" },
          { n: "70%", label: "Learning satisfaction" },
          { n: "1+", label: "Years learning" },
          { n: "24h", label: "Response time" },
        ].map(s => (
          <div key={s.label} className="bg-paper p-8 text-center">
            <p className="font-display text-5xl text-accent">{s.n}</p>
            <p className="font-body text-sm text-muted mt-2 uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
