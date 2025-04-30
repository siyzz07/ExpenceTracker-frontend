import React from "react";
import { useNavigate } from "react-router-dom";
import Speech from "../Common/Speech";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { loginUser } from "../../services/userAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { motion } from "framer-motion";

interface user {
  email: String;
  password: String;
}
const Login = () => {

  const dispatch=useDispatch()
  const navigate = useNavigate();

  const initialValues: user = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().required("Email is requered").email(),
    password: yup.string().required("Enter the password"),
  });

  const handleSubmit = async(value:any) => {
    try{
      console.log("response send");
      
        const response=await loginUser(value)
        if(response?.token){
          console.log(response);
          localStorage.setItem("token",JSON.stringify({token:response.token,userId:response.user.id,isActive:response.user.isActive}))
          dispatch(loginSuccess(response.token))
          navigate('/')
          
        }
        
    }catch(error:any){
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message,{
          autoClose:1500
        })
      }else{
        toast.error("Occour some error please try again",{
          autoClose:1500
        })
      }
      
    }


  };

  return (
    <div className="bg-gradient-to-b from-[#6DD5FA] to-[#2980B9] w-full h-screen">
      <div className="relative overflow-hidden w-full h-7 bg-[#ffffff] rounded-lg shadow-lg">
      <motion.div
        className="absolute whitespace-nowrap text-xl font-semibold text-[#2980B9]"
        animate={{ x: ["300%", "-100%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        💸 Keep tracking your expenses & grow your savings! 💸
      </motion.div>
    </div>
      <div className="  w-full h-6/7 flex justify-center items-center">
        <div></div>
        <div className="bg-white w-full md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 h-auto p-8 rounded-lg shadow-lg">
          <div className="flex justify-center items-center mb-6">
            <img
              src="/logo.png"
              alt="Expense Tracker Logo"
              className="w-20 h-20"
            />
          </div>

          <p className="text-center text-3xl font-semibold text-[#2980B9] mb-8">
            Login
          </p>
          <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <Field
              name="email"
              className="w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2980B9] focus:border-[#2980B9]"
              placeholder="Enter your Email"
              type="email"
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field
              name="password"
              className="w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2980B9] focus:border-[#2980B9]"
              placeholder="Enter your password"
              type="password"
            />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#27AE60] text-white rounded-md hover:bg-[#2ECC71] transition duration-300"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
          <p className="text-end text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#27AE60] cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-end items-end pt-10 pr-10 ">
        <Speech />
      </div>
      
    </div>
  );
};

export default Login;
