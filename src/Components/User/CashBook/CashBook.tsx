import React, { memo, useMemo } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addCredit, userControllers } from "../../../services/userAPI";

const CashBook = () => {
  const [CreditPopup, setCreditPopup] = useState<boolean>(false);
  const [DebitPopup, setDebitPopup] = useState<boolean>(false);
  const [showDropdown, setShowDropDown] = useState<boolean>(false);
  const [userContrls, setUserControles] = useState<any>([]);

  const Debit = {
    description: "",
    amount: 0,
    toggleFeature: "disable", // Default set to "No"
    dropdownValue: "",
  };
  const Credit = {
    description: "",
    amount: 0,
    toggleFeature: "disable", // Default set to "No"
    dropdownValue: "",
  };

  const DebitvalidationSchema = Yup.object({
    description: Yup.string()
      .required("Description is required")
      .min(3, "Must be at least 3 characters")
      .test(
        "no-only-spaces",
        "Description cannot be only spaces",
        (value: any) => value && value.trim().length > 0
      ),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
    dropdownValue: Yup.string().when("showDropdown", {
      is: true,
      then: (schema) =>
        schema
          .required("Please select an option")
          .notOneOf([""], "Invalid selection"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const CreditvalidationSchema = Yup.object({
    description: Yup.string()
      .required("Description is required")
      .min(3, "Must be at least 3 characters")
      .test(
        "no-only-spaces",
        "Description cannot be only spaces",
        (value: any) => value && value.trim().length > 0
      ),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
    dropdownValue: Yup.string()
      .required("required")
      .min(3, "Must be at least 3 characters")
      .test(
        "no-only-spaces",
        "Description cannot be only spaces",
        (value: any) => value.trim().length > 0 || showDropdown == false
      ),
  });

  const handleSubmitCredit = async (value: object) => {
    handleCreditPopup();
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

      if (!userId) {
        console.error("Missing userId ");
        return;
      }

      const response = await addCredit(userId, value);
      toast.success(response.message, {
        autoClose: 1500,
      });
      // fetchPartieTransaction();
      handleCreditPopup();
    } catch (error: any) {
      console.log("error to add borrwing");

      console.log(error.message);
    }
  };

  const handleCreditPopup = async () => {
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

      if (!userId) {
        console.error("Missing userId ");
        return;
      }
      setCreditPopup(!CreditPopup);

      const response = await userControllers(userId);
      setUserControles(response.controles);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDebitPopup = () => {
    setDebitPopup(!DebitPopup);
  };

  const handleSubmitDebit = async (value: object) => {
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

      // if (!userId || !partieId) {
      //   console.error("Missing userId or partieId");
      //   return;
      // }

      // const response = await addBorrowing(value, userId, partieId);
      // toast.success(response.message, {
      //   autoClose: 1500,
      // });
      // fetchPartieTransaction();
      handleDebitPopup();
    } catch (error: any) {
      console.log("error to add borrwing");

      console.log(error.message);
    }
  };

  const handleToggleChangeNo = (value: any) => {
    setShowDropDown(false);
  };
  const handleToggleChangeYes = (value: any) => {
    setShowDropDown(true);
  };
  return (
    <div className="flex flex-col w-full h-screen">
      {/* ===================================================================================================================== */}
      {/* Debit modal */}

      {DebitPopup && (
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
                      Add Credit
                    </h3>
                    <p
                      onClick={handleDebitPopup}
                      className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900"
                    >
                      X
                    </p>
                  </div>
                  {/* Form */}
                  <Formik
                    initialValues={Debit}
                    validationSchema={DebitvalidationSchema}
                    onSubmit={handleSubmitDebit}
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
                            name="amount"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Enter amount"
                          />
                          <ErrorMessage
                            name="amount"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Live Total Amount Borrowed */}
                        <div className="p-4 bg-gray-100 rounded-md">
                          <p className="text-sm text-gray-600">
                            The Amount Credited:
                          </p>
                          <p className="text-xl font-semibold text-green-600 ">
                            ₹{values.amount || 0}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2 mt-4">
                          <button
                            type="submit"
                            className="px-4 cursor-pointer py-2  bg-green-600 text-white rounded-md hover:bg-red-500"
                          >
                            Add
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
      {/* Debit Modaaaaal */}

      {CreditPopup && (
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
                      Add Debit
                    </h3>
                    <p
                      onClick={handleCreditPopup}
                      className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900"
                    >
                      X
                    </p>
                  </div>

                  {/* Form */}
                  <Formik
                    initialValues={Credit}
                    validationSchema={CreditvalidationSchema}
                    onSubmit={handleSubmitCredit}
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
                            name="amount"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                            placeholder="Enter amount"
                          />
                          <ErrorMessage
                            name="amount"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Radio Toggle */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Add the credit to your control
                          </label>
                          <div className="flex items-center space-x-4 mt-2">
                            <label className="flex items-center space-x-2">
                              <Field
                                type="radio"
                                name="toggleFeature"
                                value="enable"
                                className="focus:ring focus:ring-blue-200 focus:border-blue-500"
                                onChange={() => handleToggleChangeYes("enable")}
                                checked={showDropdown === true}
                              />
                              <span className="text-sm text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <Field
                                type="radio"
                                name="toggleFeature"
                                value="disable"
                                className="focus:ring focus:ring-blue-200 focus:border-blue-500"
                                onChange={() => handleToggleChangeNo("disable")}
                                checked={showDropdown == false} // Ensures "No" is selected when this option is clicked
                              />
                              <span className="text-sm text-gray-700">No</span>
                            </label>
                          </div>
                          <ErrorMessage
                            name="toggleFeature"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Conditional Dropdown */}
                        {showDropdown && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Select an Option
                            </label>
                            <Field
        as="select"
        name="dropdownValue"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
      >
        {/* Loop through userContrls to generate options */}
        {userContrls.map((control: any) => (
          <option key={control.id} value={control.categoryName}>
            {control.categoryName}
          </option>
        ))}
      </Field>
                            <ErrorMessage
                              name="dropdownValue"
                              component="p"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                        )}

                        {/* Live Total Amount Lent */}
                        <div className="p-4 bg-gray-100 rounded-md">
                          <p className="text-sm text-gray-600">
                            The Amount Debited:
                          </p>
                          <p className="text-xl font-semibold text-red-600">
                            ₹{values.amount || 0}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2 mt-4">
                          <button
                            type="submit"
                            className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-green-700"
                          >
                            Add
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

      <div className="flex flex-1 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        {/* Left Section */}
        <div className="w-2/3 bg-gray-800 p-10 text-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Cash Book</h1>
            <div className="flex space-x-4">
              <button
                onClick={handleCreditPopup}
                className="px-4 py-2 bg-[#ff6767] text-white rounded-lg hover:bg-[red] flex-col"
              >
                <span className="text-sm font-medium">- Debit</span>
              </button>
              <button
                // onClick={() => handlePopup("Credit")}
                onClick={handleDebitPopup}
                className="px-4 py-2 bg-[#007600] text-white rounded-lg hover:bg-[#254e25] flex-col"
              >
                <span className="text-sm font-medium">+ Credit</span>
              </button>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
            <p className="text-gray-800">Placeholder for transactions list</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Overview</h2>
          <div className="grid gap-6">
            {/* Total Money Lent */}
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
            {/* Total Money Borrowed */}
            <div className="flex justify-between items-center bg-red-50 px-6 py-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-200 hover:scale-105">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Money Borrowed
                </h3>
                <p className="text-sm text-gray-500">
                  Total amount you owe to others
                </p>
              </div>
              <span className="text-2xl font-bold text-red-700">₹67567</span>
            </div>
            {/* Net Balance */}
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

export default CashBook;
