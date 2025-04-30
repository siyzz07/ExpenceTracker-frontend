import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdDeleteForever } from "react-icons/md";

import * as Yup from "yup";
import {
  addBorrowing,
  addLending,
  getPartieTransactionData,
} from "../../../services/userAPI";
import { toast } from "react-toastify";

const Transaction: React.FC = () => {
  const navigate = useNavigate();
  const { id: partieId } = useParams();
  //   const [Borrwingdescription, setBDescription] = useState("");
  //   const [amount, setAmount] = useState<number | "">("");
  //   const [Lendingdescription, setLDescription] = useState("");
  //   const [amountL, setAmountL] = useState<number | "">("");
  const [partiesData, setPartiesData] = useState<any>("");
  const [lendingPupup, setLendingPopup] = useState<boolean>(false);
  const [borrowingPupup, setBorrowingPopup] = useState<boolean>(false);
  const [totalLendings, setTotalLendings] = useState<number | null>(null);
  const [totalBorrowings, setTotalBorrowing] = useState<number | null>(null);
  const [netTotal, setNetTotal] = useState<number>(0);

  const borrowingInitialValues = {
    description: "",
    toGave: "",
    toGet: 0,
  };
  const lendingInitialValues = {
    description: "",
    toGave: 0,
    toGet: "",
  };

  const BorrowingvalidationSchema = Yup.object({
    description: Yup.string()
      .required("Description is required")
      .min(3, "Must be at least 3 characters")
      .test(
        "no-only-spaces",
        "Description cannot be only spaces",
        (value: any) => value && value.trim().length > 0
      ),
    toGave: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
  });

  const LendingvalidationSchema = Yup.object({
    description: Yup.string()
      .required("Description is required")
      .min(3, "Must be at least 3 characters")
      .test(
        "no-only-spaces",
        "Description cannot be only spaces",
        (value: any) => value && value.trim().length > 0
      ),
    toGet: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
  });

  //====================== add Lending function
  const handleSubmitLending = async (value: object) => {
    try {
      const user = localStorage.getItem("token");
      let userData = null;
      let userId = null;

      if (user) {
        try {
          userData = JSON.parse(user);
          userId = userData.userId;
        } catch (error: any) {
          console.log(error.message);
          console.warn("Token is not a valid JSON object. It might be a JWT.");
        }
      }

      if (!userId || !partieId) {
        console.error("Missing userId or partieId");
        return;
      }

      const response = await addLending(value, userId, partieId);
      toast.success(response.message, {
        autoClose: 1500,
      });
      fetchPartieTransaction();
      handleLengingPopup();
    } catch (error: any) {
      console.log("error to add borrwing");

      console.log(error.message);
    }
  };

  //====================== add borrrwing function
  const handleSubmitBorrowing = async (value: object) => {
    try {
      const user = localStorage.getItem("token");
      let userData = null;
      let userId = null;

      if (user) {
        try {
          userData = JSON.parse(user);
          userId = userData.userId;
        } catch (error: any) {
          console.log(error.message);
          console.warn("Token is not a valid JSON object. It might be a JWT.");
        }
      }

      if (!userId || !partieId) {
        console.error("Missing userId or partieId");
        return;
      }

      const response = await addBorrowing(value, userId, partieId);
      toast.success(response.message, {
        autoClose: 1500,
      });
      fetchPartieTransaction();
      handleBorrowingPopup();
    } catch (error: any) {
      console.log("error to add borrwing");

      console.log(error.message);
    }
  };

  const handleLengingPopup = () => {
    setLendingPopup(!lendingPupup);
  };

  const handleBorrowingPopup = () => {
    setBorrowingPopup(!borrowingPupup);
  };

  //==================fetching parties data to get the page
  const fetchPartieTransaction = async () => {
    try {
      const user = localStorage.getItem("token");
      let userData = null;
      let userId = null;

      if (user) {
        try {
          userData = JSON.parse(user);
          userId = userData.userId;
        } catch (error: any) {
          console.log(error.message);
          console.warn("Token is not a valid JSON object. It might be a JWT.");
        }
      }

      if (!userId || !partieId) {
        console.error("Missing userId or partieId");
        return;
      }

      const response = await getPartieTransactionData(userId, partieId);

      setPartiesData(response.party);
      setTotalLendings(response.totalLendings);
      setTotalBorrowing(response.totalBorrowings);
      setNetTotal(response.netTotal);
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPartieTransaction();
  }, [partieId]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <button
        className="flex items-center text-blue-600 mb-4"
        onClick={() => navigate(-1)}
      >
        <HiArrowLeft className="mr-2" /> Back
      </button>
      {/* ===================================================================================================================== */}
      {/* borrowing modal */}

      {borrowingPupup && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              {/* Modal Box */}
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-6 py-5 sm:p-6">
                  {/* Modal Title */}
                  <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add Borrowing
                    </h3>
                    <p
                      onClick={handleBorrowingPopup}
                      className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900"
                    >
                      X
                    </p>
                  </div>
                  {/* Form */}
                  <Formik
                    initialValues={borrowingInitialValues}
                    validationSchema={BorrowingvalidationSchema}
                    onSubmit={handleSubmitBorrowing}
                  >
                    {({ values }) => (
                      <Form className="mt-4 space-y-4">
                        {/* Description Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <Field
                            type="text"
                            name="description"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Enter reason for borrowing"
                          />
                          <ErrorMessage
                            name="description"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Amount Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Amount (₹)
                          </label>
                          <Field
                            type="number"
                            name="toGave"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Enter amount"
                          />
                          <ErrorMessage
                            name="toGave"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Live Total Amount Borrowed */}
                        <div className="p-4 bg-gray-100 rounded-md">
                          <p className="text-sm text-gray-600">
                            The Amount Borrowed:
                          </p>
                          <p className="text-xl font-semibold text-red-600">
                            ₹{values.toGave || 0}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2 mt-4">
                          <button
                            type="submit"
                            className="px-4 cursor-pointer py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                          >
                            Add Borrowing
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================================================================== */}
      {/* ===================================================================================================================== */}
      {/* lending Modaaaaal */}

      {lendingPupup && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              {/* Modal Box */}
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-6 py-5 sm:p-6">
                  {/* Modal Title */}
                  <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add Lending
                    </h3>
                    <p
                      onClick={handleLengingPopup}
                      className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900"
                    >
                      X
                    </p>
                  </div>

                  {/* Form */}
                  <Formik
                    initialValues={lendingInitialValues}
                    validationSchema={LendingvalidationSchema}
                    onSubmit={handleSubmitLending}
                  >
                    {({ values }) => (
                      <Form className="mt-4 space-y-4">
                        {/* Description Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <Field
                            type="text"
                            name="description"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Enter reason for lending"
                          />
                          <ErrorMessage
                            name="description"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Amount Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Amount (₹)
                          </label>
                          <Field
                            type="number"
                            name="toGet"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Enter amount"
                          />
                          <ErrorMessage
                            name="toGet"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Live Total Amount Lent */}
                        <div className="p-4 bg-gray-100 rounded-md">
                          <p className="text-sm text-gray-600">
                            The Amount Lent:
                          </p>
                          <p className="text-xl font-semibold text-green-600">
                            ₹{values.toGet || 0}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2 mt-4">
                          <button
                            type="submit"
                            className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Add Lending
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================================================================== */}

      {/* Main Layout (2/3 + 1/3 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Transactions */}
        <div className="lg:col-span-2 bg-white p-6 shadow-lg rounded-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {partiesData?.name}
              </h1>
              <p className="text-gray-600 text-md md:text-lg mb-4">
                {partiesData?.description}
              </p>
            </div>
            <div className="space-x-2 md:space-x-4 flex mt-2 md:mt-0">
              <button
                onClick={handleLengingPopup}
                className="bg-green-500 text-white px-3 md:px-4 py-2 rounded-md cursor-pointer hover:bg-green-600 transition text-sm md:text-base"
              >
                + Add Lending
              </button>
              <button
                onClick={handleBorrowingPopup}
                className="bg-red-500 text-white px-3 md:px-4 py-2 cursor-pointer rounded-md hover:bg-red-600 transition text-sm md:text-base"
              >
                + Add Borrowing
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          {!partiesData?.transactions ||
          partiesData.transactions.length === 0 ? (
            <p className="text-center mt-20 text-2xl">
              There is no Lendings and Borrowings found
            </p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">Transactions</h2>
              <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">
                      Date
                    </th>
                    <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">
                      Time
                    </th>
                    <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">
                      Description
                    </th>
                    <th className="border border-gray-300 px-2 md:px-4 py-2 text-center text-green-600">
                      Lendings (₹)
                    </th>
                    <th className="border border-gray-300 px-2 md:px-4 py-2 text-center text-red-600">
                      Borrowings (₹)
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {partiesData?.transactions
                    ?.filter((tx: any) => {
                      const txDate = new Date(tx.date);
                      const today = new Date();
                      return (
                        txDate.getDate() === today.getDate() &&
                        txDate.getMonth() === today.getMonth() &&
                        txDate.getFullYear() === today.getFullYear()
                      );
                    })
                    .sort(
                      (a: any, b: any) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((tx: any, index: number) => (
                      <tr
                        key={tx._id || index}
                        className="border border-gray-300 bg-gray-50 hover:bg-gray-100"
                      >
                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                          {new Date(tx.date).toLocaleTimeString()}
                        </td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                          {tx.reason || "N/A"}
                        </td>
                        <td className="border bg-[#e3ffe3] border-gray-300 px-2 md:px-4 py-2 text-center text-green-600 font-semibold">
                          {tx.toGave > 0 ? `₹${tx.toGave}` : "-"}
                        </td>
                        <td className="border bg-[#ffe2e2] border-gray-300 px-2 md:px-4 py-2 text-center text-red-600 font-semibold">
                          {tx.toGet > 0 ? `₹${tx.toGet}` : "-"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            // replace with your delete handler
                            className="text-red-600 hover:text-red-800 transition text-xl"
                            title="Delete"
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Section: Additional Info */}
        <div className="lg:col-span-1 bg-white p-8 shadow-2xl rounded-2xl flex flex-col justify-between h-auto lg:h-[500px] relative">
          {/* Header with History Button */}

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Additional Info
            </h2>
            <button
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow"
              onClick={() => console.log("Go to history")}
            >
              History
            </button>
          </div>

          <div className="space-y-8">
            {/* Total Lent */}
            <div className="flex justify-between items-center bg-green-50 px-6 py-6 rounded-2xl shadow-md text-xl transition-transform transform hover:scale-105 hover:shadow-lg">
              <span className="text-gray-700 font-semibold">
                Total Money Lent
              </span>
              <span className="text-green-700 font-bold text-2xl">
                ₹{totalLendings}
              </span>
            </div>

            {/* Total Borrowed */}
            <div className="flex justify-between items-center bg-red-50 px-6 py-6 rounded-2xl shadow-md text-xl transition-transform transform hover:scale-105 hover:shadow-lg">
              <span className="text-gray-700 font-semibold">
                Total Money Borrowed
              </span>
              <span className="text-red-700 font-bold text-2xl">
                ₹{totalBorrowings}
              </span>
            </div>

            {/* Net Total */}
            <div className="flex justify-between items-center bg-gray-100 px-6 py-6 rounded-2xl shadow-inner border-t border-gray-300 text-xl transition-transform transform hover:scale-105 hover:shadow-lg">
              <span className="text-gray-800 font-semibold">Net Balance</span>
              <span
                className={`${
                  netTotal < 0 ? "text-red-800" : "text-green-800"
                } font-bold text-3xl`}
              >
                ₹{Math.abs(netTotal)}
              </span>
            </div>

            {/* Conditional Net Total Messages */}
            {netTotal < 0 && (
              <p className="transition-opacity duration-300">
                You have to give{" "}
                <span className="text-red-500">₹{Math.abs(netTotal)}</span> to{" "}
                <u>{partiesData?.name || "unknown party"}</u>
              </p>
            )}
            {netTotal > 0 && (
              <p className="transition-opacity duration-300">
                You have to get{" "}
                <span className="text-green-500">₹{Math.abs(netTotal)}</span>{" "}
                from <u>{partiesData?.name || "unknown party"}</u>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
