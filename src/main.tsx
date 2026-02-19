import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";

// Signature u konzoli
console.log(
  "%cCreated by: [Gega]",
  "color: #39de7f; font-size: 20px; font-weight: bold; background: #050505; padding: 10px;"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);