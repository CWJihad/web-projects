import React from "react";

const About = () => {
  return (
        <div className="max-w-6xl mx-auto px-6">
          {/* badge + heading */}
          <div className="text-center mb-12">
            <span className="inline-block bg-[#fff3ee] text-[#ff6b35] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#ffcbb8] mb-3">
              Our story
            </span>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">
              Built for thinkers, dreamers and doers
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              We built this app because great ideas deserve a great home. No
              clutter, no distractions — just a clean space to write, think and
              remember what matters most to you.
            </p>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { value: "10k+", label: "Notes created" },
              { value: "500+", label: "Happy users" },
              { value: "99.9%", label: "Uptime" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#fff3ee] rounded-2xl p-5 text-center"
              >
                <p className="text-2xl font-bold text-[#ff6b35] mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-[#c0522a]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: "ti-heart",
                title: "Made with care",
                desc: "Every detail is designed to make your writing experience smooth and enjoyable.",
              },
              {
                icon: "ti-lock",
                title: "Privacy first",
                desc: "Your notes are yours alone. We never read, sell or share your personal data.",
              },
              {
                icon: "ti-rocket",
                title: "Always improving",
                desc: "We ship updates regularly based on real feedback from real users like you.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#ff6b35] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#fff3ee] flex items-center justify-center mb-4">
                  <i className={`ti ${c.icon} text-[#ff6b35] text-xl`} />
                </div>
                <h3 className="text-base font-bold text-[#1a1a2e] mb-1.5">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
  );
};

export default About;
