import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userRegister } from "../../services/userAPI";
import { toast } from "react-toastify";

interface UserInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  const initialValues: UserInterface = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: UserInterface) => {
    try {
      const response = await userRegister(values); 
      
     toast.success("registered successfully", { autoClose: 2000 })
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, { autoClose: 2000 });
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#6DD5FA] to-[#2980B9] w-full h-screen flex justify-center items-center">
      <div className="bg-white w-full md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 h-auto p-8 rounded-lg shadow-lg">
        <p className="text-center text-3xl font-semibold text-[#2980B9] mb-8">
          Register
        </p>

        <Formik<UserInterface>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your Password"
                  className="w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#27AE60] text-white rounded-md hover:bg-[#2ECC71] transition duration-300"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-end text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-[#27AE60] cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
