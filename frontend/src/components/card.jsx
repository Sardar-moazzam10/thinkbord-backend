import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Card = ({ id, content, title, date, onDelete }) => {
  const handleDelete = async () => {
    try {
      // show loading toast
      const deleting = toast.loading("Deleting note...");

      // handle delete logic (assumes async or promise-returning function)
      await onDelete(id);

      toast.dismiss(deleting);
      toast.success("🗑️ Note deleted!");
    } catch (error) {
      toast.error("❌ Failed to delete note.");
      console.error(error);
    }
  };

  return (
    <div className="relative w-full h-full max-w-md overflow-hidden rounded-lg shadow-xl bg-base-100">
      <Toaster position="bottom-right" />

      {/* Green Top Border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500 rounded-t-lg"></div>

      {/* Card Content */}
      <div className="p-4 h-44">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <p className="mt-3 text-sm text-base-content/70">{date}</p>
        <div className="justify-end mt-10 card-actions">
          <a
            href={`/notes/${id}`}
            className="btn btn-sm btn-outline btn-primary top-4 left-4"
          >
            <FaEdit className="mr-1" /> Update
          </a>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline btn-error"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
