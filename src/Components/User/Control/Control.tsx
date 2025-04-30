import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus, FaPen } from "react-icons/fa"; // Import necessary icons
import AddControl from "./AddControl";
import { userControllers } from "../../../services/userAPI";
import EditControl from "./EditControl";

const Control: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [popup, setPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      let id: string | null = null;

      if (token) {
        try {
          const user = JSON.parse(token);
          id = user?.userId || null;

          if (!id) {
            console.error("User ID not found in token");
            return;
          }
        } catch (error: any) {
          console.error("Error parsing token:", error.message);
          return;
        }
      }

      if (!id) {
        console.error("No user ID found, cannot fetch data");
        return;
      }

      const response = await userControllers(id);
      const val = response.controls || response.controles;

      if (val) {
        setExpenses(val);
      } else {
        console.error(
          "Invalid response structure: 'controls' or 'controles' not found"
        );
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Toggle popup state
  const handlePopup = () => {
    setPopup((prev) => !prev);
  };

  // Toggle edit popup state
  const  handleEditPopup = (expense:any) => {
    setSelectedExpense(expense); 
    setEditPopup(!editPopup);
  };
  
  const closeEditPopup = () => {
    setEditPopup(false);
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-800 min-h-screen w-full">
      {/* Popup */}
      {popup && <AddControl popup={handlePopup} partiesFetch={fetchData}/>}
      {/* Edit Popup */}
      {editPopup && <EditControl popup={closeEditPopup} controlFetch={fetchData} category={selectedExpense} />}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white">Expense Control</h1>
        <button
          onClick={handlePopup}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2 shadow-sm"
        >
          <FaPlus size={16} />
          <span className="text-sm font-medium">Add Expense</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white w-full">
        {expenses?.length === 0 && (
          <p className="text-center p-4">No controls added</p>
        )}
        {expenses?.length > 0 && (
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold">
                  #
                </th>
                <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold">
                  Category Name
                </th>
                <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold">
                  Description
                </th>
                <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold">
                  Budgeted Amount
                </th>
                <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold">
                  Total Spend
                </th>
                <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold">
                  End Date
                </th>
                <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold">
                  Status
                </th>
                <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense: any, index: number) => (
                <tr
                  key={expense.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-gray-200 transition duration-200`}
                >
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {expense.categoryName}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {expense.description}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 font-semibold">
                    ₹ {expense.amount}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 font-semibold">
                    ₹ {expense.TotalSpend}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700">
                    {new Date(expense.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-left">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="expense-toggle"
                        className="sr-only"
                        checked={expense.isActive}
                        readOnly
                      />
                      <span
                        className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${
                          expense.isActive ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 bg-white rounded-full transition transform duration-300 ${
                            expense.isActive ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </span>
                    </label>
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm flex space-x-3 items-center">
                    <button onClick={()=>handleEditPopup(expense)} className="bg-[#2167ff] text-white p-2 rounded-full hover:bg-[blue] transition transform hover:scale-105">
                      <FaPen size={16} />
                    </button>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition transform hover:scale-105 text-xs">
                      History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Control;
