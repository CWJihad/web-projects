import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const sections = [
  {
    id: 1,
    title: "Getting Started",
    description:
      "Learn how to create your account and verify your email to get full access to the app.",
    steps: [
      {
        step: 1,
        title: "Create Your Account",
        description:
          "Fill in your username, email address and password in the signup form. Make sure to use a valid email address as we will send a verification link there.",
        image: null, // replace with your screenshot import later
      },
      {
        step: 2,
        title: "Check Your Email",
        description:
          "After submitting the form, check your inbox for a verification email from us. It contains a secure button to activate your account.",
        image: null,
      },
      {
        step: 3,
        title: "Verify Your Email",
        description:
          "Click the 'Verify My Email' button inside the email. Your account will be activated instantly and you will be redirected to the login page.",
        image: null,
      },
      {
        step: 4,
        title: "Login to Your Account",
        description:
          "Enter your email and password on the login page. After successful login you will land on the home page with full access to all features.",
        image: null,
      },
    ],
  },
  {
    id: 2,
    title: "Taking Notes",
    description:
      "Learn how to create, view, edit and delete your notes efficiently.",
    steps: [
      {
        step: 1,
        title: "Create a Note",
        description:
          "Click the '+ New Note' button on the notes page. A modal will appear where you can enter a title and content for your note. Click 'Save Note' when done.",
        image: null,
      },
      {
        step: 2,
        title: "View Your Notes",
        description:
          "All your notes are displayed in a clean grid layout. Each card shows the title, a preview of the content and the date it was created.",
        image: null,
      },
      {
        step: 3,
        title: "Edit a Note",
        description:
          "Click the 'Edit' button on any note card. The edit modal will open with your existing content prefilled. Make your changes and click 'Save Changes'.",
        image: null,
      },
      {
        step: 4,
        title: "Delete a Note",
        description:
          "Click the 'Delete' button on any note card to remove it instantly. The note will disappear from your list without any page refresh.",
        image: null,
      },
    ],
  },
  {
    id: 3,
    title: "Profile Setup",
    description:
      "Learn how to configure your profile with a photo, full name and secure password.",
    steps: [
      {
        step: 1,
        title: "Upload Profile Picture",
        description:
          "Go to your profile page by clicking your avatar in the navbar. Click the camera icon on your avatar circle to upload a photo from your device.",
        image: null,
      },
      {
        step: 2,
        title: "Add Your Full Name",
        description:
          "Click the edit icon next to your full name field. Type your full name and click 'Save' to update it. Your name will appear on the home page as a welcome message.",
        image: null,
      },
      {
        step: 3,
        title: "Change Your Password",
        description:
          "Scroll down to the Change Password section on your profile page. Enter your current password and your new password, then click 'Update Password' to save.",
        image: null,
      },
    ],
  },
  {
    id: 4,
    title: "Feedback",
    description:
      "Learn how to submit your feedback and help us improve the app.",
    steps: [
      {
        step: 1,
        title: "Go to Feedback Page",
        description:
          "Click your avatar in the navbar and select 'Feedback' from the dropdown menu to navigate to the feedback page.",
        image: null,
      },
      {
        step: 2,
        title: "Submit Your Feedback",
        description:
          "Write your thoughts, suggestions or bug reports in the feedback form. Click 'Submit' and our team will review your feedback carefully.",
        image: null,
      },
    ],
  },
];

const WatchDemo = () => {
  const [activeSection, setActiveSection] = useState(0);

  const currentSection = sections[activeSection];
  const isFirst = activeSection === 0;
  const isLast = activeSection === sections.length - 1;

  const changeSection = (index) => {
    setActiveSection(index);
    window.scrollTo({top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* ── Side Navigation ── */}
        <aside className="w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
              Guide Sections
            </h2>
            <ul className="space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <button
                    onClick={() => changeSection(index)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-3
                      ${
                        activeSection === index
                          ? "bg-[#ff6b35] text-white shadow-md"
                          : "text-gray-600 hover:bg-orange-50 hover:text-[#ff6b35]"
                      }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                      ${
                        activeSection === index
                          ? "bg-white text-[#ff6b35]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {index < activeSection ? (
                        <CheckCircle size={14} className="text-green-500" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Section Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-[#ff6b35] text-white flex items-center justify-center text-sm font-bold shrink-0">
                {activeSection + 1}
              </span>
              <h1 className="text-2xl font-bold text-[#1a1a2e]">
                {currentSection.title}
              </h1>
            </div>
            <p className="text-gray-500 text-sm ml-11">
              {currentSection.description}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {currentSection.steps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                {/* Step header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-[#ff6b35] flex items-center justify-center text-xs font-bold shrink-0">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-[#1a1a2e]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed ml-10 mb-5">
                  {item.description}
                </p>

                {/* Screenshot placeholder */}
                <div className="ml-10 rounded-xl overflow-hidden border border-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-50 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl">
                      <span className="text-4xl">🖼️</span>
                      <p className="text-gray-400 text-sm font-medium">
                        Screenshot coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Prev / Next Buttons ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
            <button
              onClick={() => changeSection(activeSection - 1)}
              disabled={isFirst}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {/* Section dots */}
            <div className="flex gap-2">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSection(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200
                    ${
                      activeSection === index
                        ? "bg-[#ff6b35] w-6"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={() => changeSection(activeSection + 1)}
              disabled={isLast}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff6b35] hover:bg-[#e85d2a] text-white font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchDemo;
