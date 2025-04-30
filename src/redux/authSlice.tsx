import { createSlice } from "@reduxjs/toolkit";


type iniState={
    token:any;
    adminToken:any;
    isAuthenticated:any;
    isAdminAuthenticated:any

}

const token=localStorage.getItem("token")
const adminToken=localStorage.getItem("adminToken")

const  initialState:iniState={
    token:token?token:null,
    adminToken:adminToken?adminToken:null,
    isAuthenticated:(!!token),
    isAdminAuthenticated:(!!adminToken)
}


 const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
          },
          logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
          },
          adminLoginSuccess:(state,action)=>{
            state.adminToken=action.payload;
            state.isAdminAuthenticated=true
          },
          adminLogout:(state)=>{
            state.adminToken=null
            state.isAdminAuthenticated=false
          }
    }

})

export const {loginSuccess,logout,adminLoginSuccess,adminLogout}=authSlice.actions
export default authSlice.reducer