import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useDetails } from "../Context/UserContext";
const Navbar = () => {
  const { isLoggedIN, logout } = useDetails();
  return (
    <>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        {/* Left Section: Dashboard + Task List */}
        <div className="flex items-center space-x-4">
          <Link
            to={"/"}
            className="text-lg font-bold p-2 rounded-2xl bg-emerald-700 text-white hover:bg-indigo-600"
          >
            Dashboard
          </Link>
          <Link
            to={"/tasks"}
            className="flex font-bold p-2 rounded-2xl items-center gap-2 hover:bg-indigo-600   text-lg bg-emerald-700 text-white"
          >
            Task list
          </Link>
        </div>

        {/* Right Section: Sign Out Button */}
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={logout}
        >
          {isLoggedIN ? "Sign out" : ""}
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
