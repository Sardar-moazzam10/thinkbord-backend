import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { useNavigate, useParams } from "react-router"; // ✅ correct router import
import toast, { Toaster } from "react-hot-toast";
import api from "../lib/axios.jsx";

const Creatnote = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ moved inside the component

  const [note, setNote] = useState({ title: "", content: "" });
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Fetch note by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote({
          title: response.data.title,
          content: response.data.content,
        });
        console.log("✅ Notes fetched:", response.data);
        toast.success("✅ Notes fetched successfully");
      } catch (error) {
        console.error("❌ Error fetching notes:", error);
        toast.error("❌ Error fetching notes");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("❌ Title and Content cannot be empty!");
      return;
    }

    if (note.title.length > 15) {
      toast.error("❌ Title cannot exceed 15 letters.");
      return;
    }

    if (note.content.length > 35) {
      toast.error("❌ Content cannot exceed 35 letters.");
      return;
    }

    if (isRateLimited) {
      toast.error("⏱️ You're clicking too fast! Wait a few seconds.");
      return;
    }

    setIsRateLimited(true);
    setTimeout(() => setIsRateLimited(false), 3000); // 3s cooldown

    try {
      const response = await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });

      console.log("✅ Notes Updated Successfully:", response.data);
      toast.success("✅ Note updated successfully");

      // Redirect to homepage after 1.5s delay
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("❌ Error Updating notes:", error);
      toast.error("❌ Error updating note");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-base-200">
      <Toaster position="bottom-right" />

      {/* Back to Home Button */}
      <a
        href="/"
        className="absolute flex items-center gap-1 btn btn-sm btn-outline btn-primary top-4 left-4"
      >
        <IoMdArrowRoundBack />
        Back To Home
      </a>

      {/* Card */}
      <div className="relative w-full max-w-2xl mt-7 min-h-[500px] bg-base-100 rounded-lg shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-t-lg"></div>

        <div className="p-6 space-y-6">
          <label className="w-full form-control">
            <span className="font-semibold label-text">Title</span>
            <input
              type="text"
              placeholder="Type title here"
              className="w-full mt-2 input input-bordered"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </label>

          <label className="w-full form-control">
            <span className="font-semibold label-text">Content</span>
            <textarea
              placeholder="Type content here..."
              className="w-full h-40 mt-2 resize-none textarea textarea-bordered"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            ></textarea>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              className="btn btn-sm btn-outline btn-success"
              onClick={handleUpdate}
              disabled={isRateLimited}
            >
              <RxUpdate />
              {isRateLimited ? " Updating..." : " Update"}
            </button>

            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={() => setNote({ title: "", content: "" })}
            >
              <FaTrash className="mr-1" /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Creatnote;
