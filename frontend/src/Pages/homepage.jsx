import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import Card from "../components/card.jsx";
import RateLimitedUI from "../components/RateLimitUI.jsx";
import api from "../lib/axios.jsx";

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratelimit, setRatelimit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/notes");
        console.log("Fetched notes:", res.data);
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes:", err);

        if (err.response?.status === 429) {
          // Rate limit triggered
          setRatelimit(true);
        } else {
          // General error
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-sm" />
      </div>
    );
  }

  if (ratelimit) {
    return <RateLimitedUI />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="font-semibold text-error">Error loading notes 😵</p>
      </div>
    );
  }

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      console.log("Note deleted successfully");
    } catch (err) {
      console.error("Error deleting note 😢", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <div className="px-4 shadow-md navbar bg-base-200 md:px-8">
        <Navbar />
      </div>
      {notes.length === 0 ? (
        <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <NotesNotFound />
        </main>
      ) : (
        <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 md:p-10">
          {notes.map((note) => (
            <Card
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              date={new Date(note.createdAt).toDateString()}
              onDelete={deleteNote}
            />
          ))}
        </main>
      )}

      {/* Notes Grid */}
    </div>
  );
};

export default Homepage;
