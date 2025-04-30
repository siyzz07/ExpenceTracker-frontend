import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { addControlApi, AddPartiess } from "../../../services/userAPI";
import { toast } from "react-toastify";

interface IaddControl {
  controlName: string;
  controlAmount: number;
  description: string;
  endDate: string; // Added endDate field
}

const AddControl = ({ popup, partiesFetch }: any) => {
  // Initial Values
  const initialValues: IaddControl = {
    controlName: "",
    controlAmount: 0,
    description: "",
    endDate: "", // Added initial value for endDate
  };

  // Validation Schema
  const validationSchema = yup.object({
    controlName: yup.string().required("Control name is required"),
    controlAmount: yup
      .number()
      .typeError("Control amount must be a number")
      .positive("Control amount must be greater than zero")
      .required("Control amount is required"),
    description: yup.string().required("Description is required"),
    endDate: yup
      .date()
      .min(new Date(), "End date must be in the future")
      .required("End date is required"), // Validation for endDate
  });

  // Submit Handler
  const handleSubmit = async (values: IaddControl, { resetForm }: any) => {
    try {
      const token = localStorage.getItem("token");

      let id: string | null = null;

      if (token) {
        try {
          const user = JSON.parse(token);
          if (user?.userId) {
            id = user.userId;
          } else {
            console.error("User ID not found in token");
            return;
          }
        } catch (error: any) {
          console.error("Error parsing token:", error.message);
          return;
        }
      }

      if (!id) {
        console.error("No user ID found, cannot submit data");
        return;
      }

      const response = await addControlApi( values,id);
      toast.success("Control added successfully", {
        autoClose: 1500,
      });
      partiesFetch();
      popup();
      resetForm();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, {
          autoClose: 1500,
        });
      }
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        Add Control
                      </h3>
                      <p
                        onClick={popup}
                        className="cursor-pointer text-xl text-[#2a2a2a] hover:text-black"
                      >
                        X
                      </p>
                    </div>
                    <div className="mt-10">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form className="flex flex-col gap-y-4">
                            {/* Control Name Field */}
                            <label className="text-sm font-medium text-gray-700">
                              Control Name
                              <Field
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                                type="text"
                                name="controlName"
                                placeholder="Control Name"
                              />
                            </label>
                            <ErrorMessage
                              name="controlName"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Control Amount Field */}
                            <label className="text-sm font-medium text-gray-700">
                              Control Amount
                              <Field
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                                type="number"
                                name="controlAmount"
                                placeholder="Control Amount"
                              />
                            </label>
                            <ErrorMessage
                              name="controlAmount"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Description Field */}
                            <label className="text-sm font-medium text-gray-700">
                              Description
                              <Field
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                                as="textarea"
                                name="description"
                                placeholder="Description"
                                rows={3}
                              />
                            </label>
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* End Date Field */}
                            <label className="text-sm font-medium text-gray-700">
                              End Date
                              <Field
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                                type="date"
                                name="endDate"
                              />
                            </label>
                            <ErrorMessage
                              name="endDate"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Submit Button */}
                            <button
                              type="submit"
                              className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
              {/* Close Button (optional) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddControl;
