import { info } from "../data"
import myPhoto from "../assets/jihad.jpeg"   // 👈 put your image in src/assets/ and rename it profile.jpg

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end gap-10 pb-12 border-b border-border">

        {/* Middle — main text */}
        <div className="flex-1">
          <p className="animate-fade-up opacity-0-init delay-100 font-mono text-xs text-accent uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-accent"></span>
            {info.available ? "Available for work" : "Currently busy"}
          </p>

          <h1 className="animate-fade-up text-center md:text-start opacity-0-init delay-200 font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-widest text-ink uppercase">
            {info.name.split(" ")[0]}
            <span className="text-accent">{info.name.split(" ")[1]}</span> <br/>
            {info.name.split(" ")[2]}
          </h1>

          <p className="animate-fade-up opacity-0-init text-center md:text-start delay-300 font-body text-base md:text-lg text-muted mt-6 max-w-md leading-relaxed">
            {info.tagline}
          </p>

          <div className="animate-fade-up justify-center md:justify-start opacity-0-init delay-400 flex flex-wrap gap-3 mt-8">
            <a href="#projects"
              className="px-7 py-3 bg-ink text-paper font-body text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-200">
              See my work
            </a>
            <a href="#contact"
              className="px-7 py-3 border border-ink text-ink font-body text-sm uppercase tracking-widest hover:bg-ink hover:text-paper transition-all duration-200">
              Let's talk
            </a>
          </div>
        </div>


        {/* Left — photo */}
        <div className="flex flex-col justify-center items-center gap-2">
        <div className="animate-fade-up opacity-0-init delay-100 shrink-0">
          <div className="w-60 h-60 md:w-80 md:h-80 bg-card shadow-md rounded-full border-border overflow-hidden">
            {/* Replace myPhoto with your own image file */}
            <img
              src={myPhoto}
              alt={info.name}
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Right — floating info card */}
        <div className="animate-fade-up mt-8 opacity-0-init delay-500 md:w-64">
          <div className="bg-card border-border p-5 space-y-4">
            <div>
              <p className="font-mono text-xs text-muted uppercase tracking-widest">Role</p>
              <p className="font-body text-sm text-ink mt-1">{info.title}</p>
            </div>
            {/* <div className="border-t border-border pt-4">
              <p className="font-mono text-xs text-muted uppercase tracking-widest">Location</p>
              <p className="font-body text-sm text-ink mt-1">{info.location}</p>
            </div> */}
            <div className="border-t border-border pt-4 flex gap-3">
              <a href={info.github} className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest">GH</a>
              <a href={info.linkedin} className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest">LI</a>
              <a href={`mailto:${info.email}`} className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest">Email</a>
            </div>
          </div>
        </div>
        
        </div>
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden py-5 border-b border-border">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 mr-6 font-display text-3xl uppercase tracking-widest text-border">
              {"Node.js · Express · Mongo DB · REST APIs · React · Next.js · JWT Auth · ".repeat(1)}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}