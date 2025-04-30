import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const locaiton=useLocation()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed  h-full bg-[#2C3E50] text-white shadow-lg w-64`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>
          <ul className="space-y-4 mt-20 ml-10">
            <li>
              <Link
                to="/"
                className={`block hover:text-[#3498DB] transition duration-300 ${locaiton.pathname=='/'?"text-[#058feb]":""}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/cashbook"
                className={`block hover:text-[#3498DB] transition duration-300 ${locaiton.pathname=='/cashbook'?"text-[#058feb]":""}`}
              >
                Cash Book
              </Link>
            </li>
            <li>
              <Link
                to="/parties"
                className={`block hover:text-[#3498DB] transition duration-300 ${locaiton.pathname=='/parties'?"text-[#058feb]":""}`}
              >
                Parties
              </Link>
            </li>
            <li>
              <Link
                to="/controles"
                className={`block hover:text-[#3498DB] transition duration-300 ${locaiton.pathname=='/controles'?"text-[#058feb]":""}`}
              >
                Controllers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
   
    </div>
  );
};

export default Sidebar;
