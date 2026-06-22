import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import { getData } from "@/context/userContext"
import axios from "axios"
import { MessageSquare, Send, Loader2 } from "lucide-react"

const Feedback = () => {
  const { user } = getData()
  const [form, setForm] = useState({ subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null) // { type: 'success'|'error', text }

  const handleSubmit = async () => {
    if (!form.subject.trim() || !form.message.trim()) {
      setMsg({ type: "error", text: "Both fields are required." })
      return
    }

    setLoading(true)
    setMsg(null)

    try {
      const token = localStorage.getItem("accessToken")
      await axios.post(
        "http://localhost:3000/api/feedback",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMsg({ type: "success", text: "Your feedback has been sent! Thank you 🎉" })
      setForm({ subject: "", message: "" })
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to send feedback.",
      })
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(null), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-10">

        {/* page title */}
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-bold text-[#1a1a2e]">
            <MessageSquare size={28} />
            Send Feedback
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            We read every message. Tell us what you think!
          </p>
        </div>

        {/* user info banner */}
        <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fff3ee] flex items-center justify-center text-[#ff6b35] text-xs font-bold shrink-0">
            {user?.fullName?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1a1a2e]">{user?.fullName}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <span className="ml-auto text-xs bg-[#fff3ee] text-[#ff6b35] px-3 py-1 rounded-full border border-[#ffcbb8] font-semibold">
            Sending as you
          </span>
        </div>

        {/* form card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

          {/* subject */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Subject
            </label>
            <input
              type="text"
              placeholder="What's this about?"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b35] transition-all"
            />
          </div>

          {/* message */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Message
            </label>
            <textarea
              placeholder="Share your thoughts, suggestions or report a bug..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b35] transition-all resize-none"
            />
          </div>

          {/* feedback message */}
          {msg && (
            <p className={`text-xs font-medium mb-4 ${
              msg.type === "success" ? "text-green-500" : "text-red-500"
            }`}>
              {msg.text}
            </p>
          )}

          {/* submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#ff6b35] hover:bg-[#e85d2a] text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 size={15} className="animate-spin" /> Sending...</>
            ) : (
              <><Send size={15} /> Send Feedback</>
            )}
          </button>

        </div>
      </div>
    </div>
  )
}

export default Feedback