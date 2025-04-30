import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch=useDispatch()

  const handleLogout=()=>{
    localStorage.removeItem('token')
    dispatch(logout())
  }
  return (
    <nav className="bg-[#2C3E50] py-4 shadow-lg flex">
      <p className="text-white text-2xl pl-5 font-bold">Expense Tracker</p>
      <div className="container w-70/100 h-10 flex justify-between items-center">
        <ul
          className={`lg:flex space-x-5 text-white  lg:flex lg:space-x-8 mx-auto`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-[#3498DB] transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-[#3498DB] transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-[#3498DB] transition duration-300 focus:outline-none"
            >
              Logout
            </button>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
