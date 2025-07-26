import React from "react";
import { Route, Routes } from "react-router";
import Homepage from "./Pages/homepage.jsx";
import Createpage from "./Pages/createpage.jsx";
import NoteDetail from "./Pages/noteDetail.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/creat" element={<Createpage />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};

export default App;
