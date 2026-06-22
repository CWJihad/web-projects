import React from 'react'

const Features = () => {

    const features = [
  {
    icon: "ti-lock",
    title: "Secure by default",
    desc: "Your notes are protected with JWT auth and encrypted passwords. Only you can access them.",
  },
  {
    icon: "ti-bolt",
    title: "Lightning fast",
    desc: "Create, edit and delete notes instantly. No page reloads — everything updates in real time.",
  },
  {
    icon: "ti-device-mobile",
    title: "Works everywhere",
    desc: "Fully responsive design so your notes look great on any device — phone, tablet or desktop.",
  },
  {
    icon: "ti-user-circle",
    title: "Personal profile",
    desc: "Customize your avatar, update your name and manage your account all from one place.",
  },
  {
    icon: "ti-pencil",
    title: "Easy editing",
    desc: "Edit any note with a single click. Clean modals keep you focused without distractions.",
  },
  {
    icon: "ti-shield-check",
    title: "Email verification",
    desc: "Accounts are verified by email and OTP so no bots, no spam — just real users.",
  },
];
    
  return (
      <div className="max-w-6xl mx-auto px-6">
          {/* heading */}
          <div className="text-center mb-12">
            <span className="inline-block bg-[#fff3ee] text-[#ff6b35] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#ffcbb8] mb-3">
              Why choose us
            </span>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">
              Everything you need to stay organized
            </h2>
            <p className="text-gray-400 text-sm">
              Simple, fast, and secure — built for people who love clean notes.
            </p>
          </div>

          {/* grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#ff6b35] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#fff3ee] flex items-center justify-center mb-4">
                  <i className={`ti ${f.icon} text-[#ff6b35] text-xl`} />
                </div>
                <h3 className="text-base font-bold text-[#1a1a2e] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
  )
}

export default Features
