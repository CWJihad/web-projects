import React from "react";

const Reviews = () => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* heading */}
      <div className="text-center mb-12">
        <span className="inline-block bg-[#fff3ee] text-[#ff6b35] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#ffcbb8] mb-3">
          What people say
        </span>
        <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">
          Loved by note takers everywhere
        </h2>
        <p className="text-gray-400 text-sm">
          Real reviews from real users who use it every day.
        </p>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            initials: "SK",
            name: "Sarah K.",
            role: "Product Designer",
            stars: 5,
            quote:
              "Finally a notes app that doesn't get in the way. Clean, fast and everything just works.",
          },
          {
            initials: "MR",
            name: "Marcus R.",
            role: "Software Engineer",
            stars: 5,
            quote:
              "I use this every single day for work notes. The edit and delete experience is super smooth.",
          },
          {
            initials: "AL",
            name: "Aisha L.",
            role: "Freelance Writer",
            stars: 5,
            quote:
              "Love that my notes are secure and I can access them from any device. Simple and reliable.",
          },
          {
            initials: "JP",
            name: "James P.",
            role: "Student",
            stars: 4,
            quote:
              "Great app for keeping my thoughts organized. The profile customization is a nice touch too.",
          },
          {
            initials: "NW",
            name: "Nina W.",
            role: "Entrepreneur",
            stars: 5,
            quote:
              "Setup took less than 2 minutes and I was already writing my first note. Impressive.",
          },
          {
            initials: "DM",
            name: "Daniel M.",
            role: "Finance Analyst",
            stars: 5,
            quote:
              "The email verification and security features gave me confidence to store important notes here.",
          },
        ].map((r) => (
          <div
            key={r.name}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#ff6b35] transition-all duration-200 flex flex-col gap-3"
          >
            {/* stars */}
            <div className="text-[#ff6b35] tracking-wide text-sm">
              {"★".repeat(r.stars)}
              {"☆".repeat(5 - r.stars)}
            </div>

            {/* quote */}
            <p className="text-sm text-gray-400 leading-relaxed flex-1">
              "{r.quote}"
            </p>

            {/* user */}
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#fff3ee] flex items-center justify-center text-[#ff6b35] text-xs font-bold shrink-0">
                {r.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1a2e]">{r.name}</p>
                <p className="text-xs text-gray-400">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
