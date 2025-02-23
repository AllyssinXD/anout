import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Modal from "react-modal";

import AllProjects from "./components/user-dashboard/AllProjects.tsx";
import Feedback from "./components/user-dashboard/Feedback.tsx";
import ToDoApp from "./components/app/ToDoApp.tsx";
import UserDashboard from "./components/user-dashboard/index.tsx";
import AuthLayout from "./components/auth-layout/index.tsx";
import Login from "./components/auth-layout/Login.tsx";
import Register from "./components/auth-layout/Register.tsx";
import AppProvider from "./context/AppProvider.tsx";
import NotFound from "./components/NotFound.tsx";
import ForgotPassword from "./components/auth-layout/ForgotPassword.tsx";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard />}>
          <Route index element={<AllProjects />} />
          <Route path="all-projects" element={<AllProjects />} />
          <Route path="send-feedback" element={<Feedback />} />
        </Route>

        <Route
          path="/project/:id"
          element={
            <AppProvider>
              <ToDoApp />
            </AppProvider>
          }
        />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-my-password" element={<ForgotPassword />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
