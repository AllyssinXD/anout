import { BrowserRouter, Route, Routes } from "react-router";
import OnBoarding from "./on-boarding";
import UserDashboard from "./user-dashboard";
import AllProjects from "./user-dashboard/AllProjects";
import Feedback from "./user-dashboard/Feedback";
import AppProvider from "../context/AppProvider";
import ToDoApp from "./app/ToDoApp";
import AuthLayout from "./auth-layout";
import Login from "./auth-layout/Login";
import Register from "./auth-layout/Register";
import ForgotPassword from "./auth-layout/ForgotPassword";
import NotFound from "./NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnBoarding />}></Route>
        <Route path="/dashboard" element={<UserDashboard />}>
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
  );
}
