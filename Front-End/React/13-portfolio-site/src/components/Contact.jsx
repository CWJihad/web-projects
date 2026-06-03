import { useState } from "react"
import { info } from "../data"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production: connect to EmailJS, Formspree, etc.
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
            <span className="inline-block w-4 h-px bg-accent mr-2 align-middle"></span>Get in touch
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-widest text-ink">Contact</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Left */}
        <div>
          <p className="font-body text-base text-muted leading-relaxed mb-10">
            Have a project in mind? Want to automate something in your business?
            I'd love to hear about it. Send a message and I'll get back to you within 24 hours.
          </p>
          <div className="space-y-4">
            {[
              { label: "Email", value: info.email, href: `mailto:${info.email}` },
              { label: "GitHub", value: "github.com/CWJihad", href: info.github },
              { label: "LinkedIn", value: "linkedin.com/in/cwjihad", href: info.linkedin },
            ].map(c => (
              <a key={c.label} href={c.href}
                className="group flex items-center justify-between py-4 border-b border-border hover:border-accent transition-colors">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">{c.label}</span>
                <span className="font-body text-sm text-ink group-hover:text-accent transition-colors flex items-center gap-2">
                  {c.value} <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <p className="font-display text-4xl uppercase tracking-widest text-accent mb-3">Sent!</p>
              <p className="font-body text-sm text-muted">I'll reply within 24 hours. Thank you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email"].map(field => (
                <div key={field}>
                  <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-1.5">{field}</label>
                  <input type={field === "email" ? "email" : "text"}
                    required
                    value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    className="w-full bg-card border border-border px-4 py-3 font-body text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder={field === "name" ? "Your name" : "your@email.com"}
                  />
                </div>
              ))}
              <div>
                <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-1.5">Message</label>
                <textarea
                  required rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button type="submit"
                className="w-full py-4 bg-ink text-paper font-body text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-200">
                Send message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
