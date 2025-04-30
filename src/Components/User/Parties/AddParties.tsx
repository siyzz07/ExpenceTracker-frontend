import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { AddPartiess } from "../../../services/userAPI";
import { toast } from "react-toastify";

interface IaddParties {
  name: string;
  mobile: string;
  description: string;
}

const AddParties = ({ popup,partiesFetch }: any) => {
  // Initial Values
  const initialValues: IaddParties = {
    name: "",
    mobile: "",
    description: "",
  };

  // Validation Schema
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    mobile: yup
      .string()
      .length(10, "Must be exactly 10 digits")
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Phone number is required"),
    description: yup.string().required("Description is required"),
  });

  // Submit Handler
  const handleSubmit = async (values: IaddParties, { resetForm }: any) => {
    try {
      const token = localStorage.getItem("token");

      let id: string | null = null;

      if (token) {
        console.log("00");
        try {
          const user = JSON.parse(token);
          if (user?.userId) {
            id = user.userId;
          } else {
            console.log("User ID not found in token");
            return; 
          }
        } catch (error: any) {
          console.log("Error parsing token:", error.message);
          return; 
        }
      }

      if (!id) {
        console.error("No user ID found, cannot submit data");
        return;
      }

      const response = await AddPartiess(id, values);
      toast.success("Customer added successfuly",{
        autoClose:1500
      })
      partiesFetch()
      popup()

      resetForm(); // Reset form after successful submission
    } catch (error:any) {
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message,{
          autoClose:1500
        })
      }
      console.error("Errorrrrr:", error);
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
                        Add Party
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
                            {/* Name Field */}
                            <Field
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              type="text"
                              name="name"
                              placeholder="User Name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Mobile Field */}
                            <Field
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              type="text"
                              name="mobile"
                              placeholder="Phone Number"
                            />
                            <ErrorMessage
                              name="mobile"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Description Field */}
                            <Field
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              as="textarea"
                              name="description"
                              placeholder="Description"
                              rows={3}
                            />
                            <ErrorMessage
                              name="description"
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

export default AddParties;
