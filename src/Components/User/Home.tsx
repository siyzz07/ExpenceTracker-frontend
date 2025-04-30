import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Parties from "./Parties/Parties";

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden">
  
      <div className="w-64">
        <Sidebar />
      </div>


      <div className="flex-1 flex flex-col">
    
        <Navbar />

  
        <div className="flex-1 bg-gradient-to-b from-[#6DD5FA] to-[#2980B9] flex flex-col">
      
          <div className="flex  ">

          <div className="w-full h-full flex items-center justify-center">
            <Parties />
          </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
