import React, { useEffect, useState } from "react";
import AddParties from "./AddParties";
import { DeleteParties, fetchParties } from "../../../services/userAPI";
import { MdDeleteForever } from "react-icons/md";
import { HiArrowLeftCircle } from "react-icons/hi2";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

const Parties: React.FC = () => {
  const [addPartiesPopup, SetAddPartiesPopup] = useState(false);
  const [partiesData, setPartiesData] = useState([]);

  const totalRows = partiesData.length || 0;
  const rowsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const rowsToDisplay = partiesData.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePopup = () => {
    SetAddPartiesPopup(!addPartiesPopup);
  };

  const fetchUserParties = async () => {
    try {
      let user = localStorage.getItem("token");
      let id = JSON.parse(user || "{}")?.userId;
      const response = await fetchParties(id);

      if (response?.parties) {
        setPartiesData(response.parties);
      }
    } catch (error) {
      console.error("Error fetching user parties:", error);
    }
  };

  useEffect(() => {
    fetchUserParties();
  }, []);

  const handleDelete = async (PartyId: string) => {
    toast("Are you sure you want to delete this party?", {
      action: {
        label: "Yes",
        onClick: async () => {
          try {
            let user = localStorage.getItem("token");
            let userId = JSON.parse(user || "{}")?.userId;
            await DeleteParties(PartyId, userId);
            fetchUserParties();
            toast.success("Party deleted successfully");
          } catch (error) {
            console.error("Failed to delete party:", error);
            toast.error("Failed to delete the party.");
          }
        },
      },
      cancel: {
        label: "No",
        onClick: () => toast.info("Deletion cancelled"),
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {addPartiesPopup && (
        <AddParties popup={handlePopup} partiesFetch={fetchUserParties} />
      )}
      <div className="flex flex-1 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        {/* Left Section */}
        <div className="w-2/3 bg-gray-800 p-10 text-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Parties</h1>
            <button
              onClick={handlePopup}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-col"
            >
              
                       <span className="text-sm font-medium">Add Parties</span>
              
            </button>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
            {partiesData.length <= 0 ? (
              <p className="text-gray-500 text-xl">No Parties added</p>
            ) : (
              rowsToDisplay.map((party: any, index: any) => (
                <div
                  key={party._id || index}
                  className="w-full bg-white rounded-lg border mb-4 px-4 py-3 text-gray-800 font-medium"
                >
                  <div className="flex justify-between items-start">
                    <Link
                      to={`/PartyTransactions/${party._id}`}
                      className="hover:text-blue-500"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-xl">
                          {party.name}
                        </span>
                        <p className="text-sm text-gray-600">
                          {party.description}
                        </p>
                      </div>
                    </Link>
                    <MdDeleteForever
                      onClick={() => handleDelete(party._id)}
                      className="text-red-500 text-xl cursor-pointer"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              disabled={currentPage === 1}
            >
              <HiArrowLeftCircle className="text-2xl" />
            </button>
            <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              disabled={currentPage === totalPages}
            >
              <BsArrowRightCircleFill className="text-xl" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Overview</h2>
          <div className="grid gap-6">
            <div className="flex justify-between items-center bg-green-50 px-6 py-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-200 hover:scale-105">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Money Lent
                </h3>
                <p className="text-sm text-gray-500">
                 Total amount you have lent to others
                </p>
              </div>
              <span className="text-2xl font-bold text-green-700">₹567</span>
            </div>
            <div className="flex justify-between items-center bg-red-50 px-6 py-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-200 hover:scale-105">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Money Borrowed
                </h3>
                <p className="text-sm text-gray-500">
                  Toatal amount you owe to others
                </p>
              </div>
              <span className="text-2xl font-bold text-red-700">₹67567</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 px-6 py-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-200 hover:scale-105">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Net Balance
                </h3>
                <p className="text-sm text-gray-500">
                  Your current financial balance
                </p>
              </div>
              <span className="text-2xl font-bold text-gray-800">₹0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parties;
