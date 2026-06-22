import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import {
  CrossIcon,
  Delete,
  Loader2,
  LucideDelete,
  Mailbox,
  Notebook,
  Pencil,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: "" });
  const [modalLoading, setModalLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ id: "", title: "", content: "" });
  const [editLoading, setEditLoading] = useState(false);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // ← get token
      const response = await axios.get("http://localhost:3000/api/notes", {
        headers: { Authorization: `Bearer ${token}` }, // ← send in header
      });
      setNotes(response.data.notes);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!modalData.title || !modalData.content) return;
    setModalLoading(true);
    try {
      const token = localStorage.getItem("accessToken"); // ← get token
      const response = await axios.post(
        "http://localhost:3000/api/notes",
        modalData,
        {
          headers: { Authorization: `Bearer ${token}` }, // ← send in header
        },
      );
      setNotes([response.data.note, ...notes]);
      setShowModal(false);
      setModalData({ title: "", content: "" });
    } catch (err) {
      console.error("Failed to create note:", err);
    }
    setModalLoading(false);
  };

  const handleUpdate = async () => {
    if (!editData.title || !editData.content) return;
    setEditLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:3000/api/notes/${editData.id}`,
        { title: editData.title, content: editData.content },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // update note in list without refetching
      setNotes(
        notes.map((note) =>
          note._id === editData.id ? response.data.note : note,
        ),
      );
      setEditModal(false);
      setEditData({ id: "", title: "", content: "" });
    } catch (err) {
      console.error("Failed to update note:", err);
    }
    setEditLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // remove note from list without refetching
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-[#f0f4f8]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className=" flex items-center justify-center gap-2 text-3xl font-bold text-[#1a1a2e]">
              <span>My Notes</span>
              <Notebook />
            </h1>
            <p>
              {notes.length} {notes.length === 1 ? "note" : "notes"} total
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#ff6b35] cursor-pointer hover:bg-[#e85d2a] text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md"
          >
            <div className="flex gap-1">
              <Plus />
              <span>New Notes</span>
            </div>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <p className="flex gap-1 items-center text-gray-400">
              <Loader2 className="animate-spin" /> Loading notes....
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && notes.length === 0 && (
          <div className="flex flex-col items-center justify-center h-60 gap-3">
            <p className="text-5xl">
              <Mailbox color="#ff6b35" />
            </p>
            <p className="text-gray-500 font-medium">
              No notes yet. Create your first one!
            </p>
          </div>
        )}

        {/* Notes grid */}
        {!loading && notes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2 truncate">
                  {note.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {note.content}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-5">
                    <button
                      onClick={() => {
                        setEditData({
                          id: note._id,
                          title: note.title,
                          content: note.content,
                        });
                        setEditModal(true);
                      }}
                    >
                      <Pencil
                        className="text-[#ff6b35] cursor-pointer"
                        size="20px"
                        fill="#FFB605"
                      />
                    </button>
                    <button onClick={() => handleDelete(note._id)}>
                      <Trash2
                        className="cursor-pointer"
                        size="20px"
                        color="red"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#ff6b35] flex items-center">
                New Note <Pencil size="20px" fill="#FFB605" />
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setModalData({ title: "", content: "" });
                }}
                className="text-red-500 hover:text-red-700 text-2xl cursor-pointer font-light"
              >
                <CrossIcon
                  strokeWidth="1px"
                  fill="#fb2c36"
                  className="hover:fill-red-700 rotate-45"
                />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Note title...."
                value={modalData.title}
                onChange={(e) =>
                  setModalData({ ...modalData, title: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b35] transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Content
              </label>
              <textarea
                placeholder="Write your note here..."
                value={modalData.content}
                onChange={(e) =>
                  setModalData({ ...modalData, content: e.target.value })
                }
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b35] transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setModalData({ title: "", content: "" });
                }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={modalLoading}
                className="flex-1 py-2.5 rounded-xl bg-[#ff6b35] hover:bg-[#e85d2a] text-white font-semibold text-sm transition-all disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                {modalLoading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#ff6b35] flex items-center">
                Edit Note <Pencil size="20px" fill="#FFB605" />
              </h2>
              <button
                onClick={() => {
                  setEditModal(false);
                  setEditData({ id: "", title: "", content: "" });
                }}
                className="text-red-500 hover:text-red-700 text-2xl cursor-pointer font-light"
              >
                <CrossIcon
                  strokeWidth="1px"
                  fill="#fb2c36"
                  className="hover:fill-red-700 rotate-45"
                />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b35] transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Content
              </label>
              <textarea
                value={editData.content}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b35] transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditModal(false);
                  setEditData({ id: "", title: "", content: "" });
                }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={editLoading}
                className="flex-1 py-2.5 rounded-xl bg-[#ff6b35] hover:bg-[#e85d2a] text-white font-semibold text-sm transition-all disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Notes;
