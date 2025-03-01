import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Modal from "react-modal";
import { AuthProvider } from "./context/AuthProvider.tsx";
import Router from "./components/Router.tsx";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>
);
