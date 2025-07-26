import React from "react";

const Navbar = () => {
  return (
    <div className="navbar ">
      <div className="navbar-start">
        <h1 className="pl-4 text-3xl text-bold text-primary hover:text-green-500">
          ThinkBoard
        </h1>
      </div>
      <div className="pr-5 navbar-end">
        <a
          href="/creat"
          className="flex items-center gap-1 btn btn-md btn-outline btn-primary top-4 left-4"
        >
          + New Notes
        </a>
      </div>
    </div>
  );
};

export default Navbar;
