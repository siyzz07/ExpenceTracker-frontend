import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/UserPage/LoginPage";
import Register from "../Components/User/Register";
import RegisterPage from "../Pages/UserPage/RegisterPage";
import HomePage from "../Pages/UserPage/HomePage";
import MainLayout from "../Components/layout/MainLayout";
import Parties from "../Components/User/Parties/Parties";
import CashBook from "../Components/User/CashBook/CashBook";
import Dashboard from "../Components/User/Dashboard";
import Transaction from "../Components/User/Parties/Transaciton";
import Control from "../Components/User/Control/Control";
import UserProtectedRoute from "../store/ProtectedRoute/UserProtectedRoute";
import UserPublicRoute from "../store/PublicRoute/UserPublicRoute";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
           <UserPublicRoute>
              <LoginPage />
          </UserPublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UserPublicRoute>
              <RegisterPage />
              </UserPublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <UserProtectedRoute>
              <MainLayout />
            </UserProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="parties"
            element={
              <UserProtectedRoute>
                <Parties />
              </UserProtectedRoute>
            }
          />
          <Route
            path="cashbook"
            element={
              <UserProtectedRoute>
                <CashBook />
              </UserProtectedRoute>
            }
          />
          <Route
            path="controles"
            element={
              <UserProtectedRoute>
                <Control />
              </UserProtectedRoute>
            }
          />
          {/* <Route path='constorles' element={<CashBook/>}/> */}
        </Route>
        <Route
          path="/PartyTransactions/:id"
          element={
            <UserProtectedRoute>
              <Transaction />
            </UserProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default UserRouter;
