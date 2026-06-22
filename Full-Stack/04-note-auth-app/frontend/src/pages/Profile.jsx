import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { getData } from "@/context/userContext";
import {
  Camera,
  User,
  Mail,
  AtSign,
  Lock,
  Pencil,
  Check,
  X,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const API = "http://localhost:3000/api";
const token = () => localStorage.getItem("accessToken");
const authHeader = () => ({ Authorization: `Bearer ${token()}` });

// small reusable field
const ReadOnlyField = ({ icon: Icon, label, value }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
      <Icon size={16} className="text-gray-300 shrink-0" />
      <span className="text-sm text-gray-400 font-medium">{value || "—"}</span>
    </div>
  </div>
);

const Profile = () => {
  const { user, setUser } = getData();

  // profile 
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // fullName edit
  const [editingName, setEditingName] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [nameMsg, setNameMsg] = useState(null); // {type:'success'|'error', text}

  // avatar
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState(null);
  const fileRef = useRef();

  // password
  const [pwData, setPwData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPw, setShowPw] = useState({
    current: false,
    new: false,
  });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState(null);

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/profile`, {
          headers: authHeader(),
        });
        setProfile(res.data.user);
        setUser(res.data.user)
        setFullName(res.data.user.fullName);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // update full name
  const handleNameSave = async () => {
    if (!fullName.trim()) return;
    setNameLoading(true);
    setNameMsg(null);
    try {
      const res = await axios.put(
        `${API}/profile`,
        { fullName },
        { headers: authHeader() }
      );
      setProfile((p) => ({ ...p, fullName: res.data.user.fullName }));
      setUser({ ...user, fullName: res.data.user.fullName });
      setEditingName(false);
      setNameMsg({ type: "success", text: "Name updated!" });
    } catch (err) {
      setNameMsg({
        type: "error",
        text: err.response?.data?.message || "Update failed.",
      });
    } finally {
      setNameLoading(false);
      setTimeout(() => setNameMsg(null), 3000);
    }
  };

  // avatar upload (base64)
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toBase64 = (f) =>
      new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(f);
      });

    setAvatarLoading(true);
    setAvatarMsg(null);
    try {
      const base64 = await toBase64(file);
      const res = await axios.put(
        `${API}/profile/avatar`,
        { avatar: base64 },
        { headers: authHeader() }
      );
      setProfile((p) => ({ ...p, avatar: res.data.user.avatar }));
      const updatedUser = {...user, avatar: res.data.user.avatar}
      setUser(updatedUser);
      setAvatarMsg({ type: "success", text: "Avatar updated!" });
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (err) {
      setAvatarMsg({
        type: "error",
        text: err.response?.data?.message || "Upload failed.",
      });
    } finally {
      setAvatarLoading(false);
      setTimeout(() => setAvatarMsg(null), 3000);
    }
  };

  // change password
  const handlePasswordChange = async () => {
    if (!pwData.currentPassword || !pwData.newPassword || !pwData.confirmPassword) {
      setPwMsg({ type: "error", text: "All fields are required." });
      return;
    }
    if (pwData.newPassword !== pwData.confirmPassword) {
      setPwMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (pwData.newPassword.length < 6) {
      setPwMsg({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }
    setPwLoading(true);
    setPwMsg(null);
    try {
      await axios.put(
        `${API}/profile/password`,
        {
          currentPassword: pwData.currentPassword,
          newPassword: pwData.newPassword,
        },
        { headers: authHeader() }
      );
      setPwMsg({ type: "success", text: "Password changed successfully!" });
      setPwData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to change password.",
      });
    } finally {
      setPwLoading(false);
      setTimeout(() => setPwMsg(null), 4000);
    }
  };

  // avatar initials fallback
  const initials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  // loading state
  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-[#f0f4f8]">
        <Navbar />
        <div className="flex justify-center items-center h-60">
          <p className="flex gap-2 items-center text-gray-400">
            <Loader2 className="animate-spin" /> Loading profile...
          </p>
        </div>
      </div>
    );
  }

  console.log('avatar value:', profile?.avatar?.substring(0, 50))

  // render
  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* ── Page title ── */}
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-bold text-[#1a1a2e]">
            <User size={28} />
            My Profile
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your account information
          </p>
        </div>

        {/* ── Avatar card ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-5">
          <div className="flex items-center gap-5">
            {/* avatar circle */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#ff6b35]/30 bg-[#fff3ee] flex items-center justify-center">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-[#ff6b35]">
                    {initials}
                  </span>
                )}
              </div>
              {/* camera button */}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={avatarLoading}
                className="absolute -bottom-1 -right-1 bg-[#ff6b35] hover:bg-[#e85d2a] text-white rounded-full p-1.5 shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60"
              >
                {avatarLoading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Camera size={13} />
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* name + username */}
            <div>
              <p className="text-lg font-bold text-[#1a1a2e]">
                {profile?.fullName}
              </p>
              <p className="text-sm text-gray-400">@{profile?.username}</p>
              {avatarMsg && (
                <p
                  className={`text-xs mt-1 font-medium ${
                    avatarMsg.type === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {avatarMsg.text}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-5">
          <h2 className="text-sm font-bold text-[#1a1a2e] uppercase tracking-wider mb-5">
            Account Info
          </h2>

          <div className="flex flex-col gap-4">

            {/* Full name — editable */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b35] transition-all"
                    autoFocus
                  />
                  <button
                    onClick={handleNameSave}
                    disabled={nameLoading}
                    className="bg-[#ff6b35] hover:bg-[#e85d2a] text-white rounded-xl px-3 py-2.5 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {nameLoading ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Check size={15} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditingName(false);
                      setFullName(profile?.fullName || "");
                    }}
                    className="border border-gray-200 text-gray-400 hover:text-gray-600 rounded-xl px-3 py-2.5 transition-all cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <User size={16} className="text-gray-300 shrink-0" />
                  <span className="text-sm text-[#1a1a2e] font-medium flex-1">
                    {profile?.fullName}
                  </span>
                  <button
                    onClick={() => setEditingName(true)}
                    className="text-[#ff6b35] hover:text-[#e85d2a] transition-all cursor-pointer"
                  >
                    <Pencil size={14} fill="#FFB605" />
                  </button>
                </div>
              )}
              {nameMsg && (
                <p
                  className={`text-xs mt-1.5 font-medium ${
                    nameMsg.type === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {nameMsg.text}
                </p>
              )}
            </div>

            {/* Email — read only */}
            <ReadOnlyField
              icon={Mail}
              label="Email"
              value={profile?.email}
            />

            {/* Username — read only */}
            <ReadOnlyField
              icon={AtSign}
              label="Username"
              value={`@${profile?.username}`}
            />
          </div>
        </div>

        {/* ── Change Password card ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-bold text-[#1a1a2e] uppercase tracking-wider mb-5 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#ff6b35]" />
            Change Password
          </h2>

          <div className="flex flex-col gap-4">
            {/* Current password */}
            {[
              { key: "currentPassword", label: "Current Password", showKey: "current" },
              { key: "newPassword", label: "New Password", showKey: "new" },
              { key: "confirmPassword", label: "Confirm New Password", showKey: "confirm" },
            ].map(({ key, label, showKey }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  {label}
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#ff6b35] transition-all">
                  <Lock size={15} className="text-gray-300 shrink-0 mr-3" />
                  <input
                    type={showPw[showKey] ? "text" : "password"}
                    value={pwData[key]}
                    onChange={(e) =>
                      setPwData((p) => ({ ...p, [key]: e.target.value }))
                    }
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="flex-1 text-sm outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPw((s) => ({ ...s, [showKey]: !s[showKey] }))
                    }
                    className="text-gray-300 hover:text-gray-500 transition-all cursor-pointer ml-2"
                  >
                    {showPw[showKey] ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            ))}

            {/* Feedback message */}
            {pwMsg && (
              <p
                className={`text-xs font-medium ${
                  pwMsg.type === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {pwMsg.text}
              </p>
            )}

            <button
              onClick={handlePasswordChange}
              disabled={pwLoading}
              className="w-full bg-[#ff6b35] hover:bg-[#e85d2a] text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer text-sm mt-1"
            >
              {pwLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={15} className="animate-spin" /> Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;