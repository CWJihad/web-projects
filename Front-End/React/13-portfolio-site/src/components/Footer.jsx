import { info } from "../data"

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-muted uppercase tracking-widest">
        © {new Date().getFullYear()} {info.name} — Built with React & Tailwind
      </p>
      <p className="font-mono text-xs text-muted uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse"></span>
        {info.available ? "Open to new projects" : "Currently busy"}
      </p>
    </footer>
  )
}
