import { useState, useEffect } from "react"
import { info } from "../data"
import jihad from '../assets/jihad.jpeg'

const links = ["Services", "Projects", "Skills", "Contact"]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-paper/90 backdrop-blur border-b border-border" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display w-10 h-10 md:w-14 md:h-14 border-2 border-cyan-800 rounded-full text-2xl tracking-widest text-ink">
          <img className="object-fill w-full h-full rounded-full" src={jihad} alt="jihad" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="font-body text-sm font-medium text-muted hover:text-ink transition-colors uppercase tracking-widest">
              {l}
            </a>
          ))}
          <a href="#contact"
            className="ml-4 px-5 py-2 bg-ink text-paper font-body text-sm font-medium uppercase tracking-widest hover:bg-accent transition-colors">
            Hire me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}/>
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}/>
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}/>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper border-t border-border px-6 py-6 flex flex-col gap-4">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-body text-base font-medium text-ink uppercase tracking-widest">
              {l}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-2.5 bg-ink text-paper font-body text-sm font-medium uppercase tracking-widest text-center">
            Hire me
          </a>
        </div>
      )}
    </nav>
  )
}
