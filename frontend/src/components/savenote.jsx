import React, { useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import api from "../lib/axios.jsx";

const Savenote = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setNote({ ...note, title: value });
    } else {
      toast.error("❌ Title cannot exceed 15 letters");
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 35) {
      setNote({ ...note, content: value });
    } else {
      toast.error("❌ Content cannot exceed 35 letters");
    }
  };

  const postNotes = async (e) => {
    e.preventDefault();

    if (isRateLimited) {
      toast.error("⏱️ You're clicking too fast! Wait a few seconds.");
      return;
    }

    // Apply rate limit
    setIsRateLimited(true);
    setTimeout(() => setIsRateLimited(false), 3000); // 3 seconds cooldown

    if (!note.title.trim()) {
      toast.error("❌ Title is required.");
      return;
    } else if (note.title.length > 15) {
      toast.error("❌ Title cannot exceed 15 letters.");
      return;
    }

    if (!note.content.trim()) {
      toast.error("❌ Content is required.");
      return;
    } else if (note.content.length > 35) {
      toast.error("❌ Content cannot exceed 35 letters.");
      return;
    }

    try {
      const response = await api.post("/notes", {
        title: note.title,
        content: note.content,
      });
      console.log(`✅ Note added successfully!${response.data}`);
      toast.success("✅ Note added successfully!");
      setNote({ title: "", content: "" });
    } catch (err) {
      console.log(`❌ Error added successfully!${response.data}`);
      toast.error("❌ Error adding note: " + err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-base-200">
      <Toaster position="bottom-right" />

      {/* Back to Home */}
      <a
        href="/"
        className="absolute flex items-center gap-1 btn btn-sm btn-outline btn-primary top-4 left-4"
      >
        <IoMdArrowRoundBack />
        Back To Home
      </a>

      {/* Note Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg shadow-xl mt-7 bg-base-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-t-lg"></div>
        <div className="p-6 space-y-6">
          <label className="w-full form-control">
            <span className="font-semibold label-text">Title</span>
            <input
              type="text"
              placeholder="Enter title here..."
              className="w-full mt-2 input input-bordered"
              value={note.title}
              onChange={handleTitleChange}
            />
          </label>

          <label className="w-full form-control">
            <span className="font-semibold label-text">Content</span>
            <textarea
              placeholder="Enter content here..."
              className="w-full h-40 mt-2 resize-none textarea textarea-bordered"
              value={note.content}
              onChange={handleContentChange}
            ></textarea>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              className="btn btn-md btn-outline btn-success"
              onClick={postNotes}
              disabled={isRateLimited}
            >
              {isRateLimited ? "Please wait..." : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savenote;
