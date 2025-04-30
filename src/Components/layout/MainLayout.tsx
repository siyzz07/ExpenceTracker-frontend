import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-b from-[#8a8e8e] to-[#ffffff] flex flex-col mt-[4rem] overflow-auto">
          <div className="flex">
            <div className="w-full h-full flex items-center justify-center">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
