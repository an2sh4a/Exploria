import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { InventoryProvider } from "./contexts/InventoryContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </BrowserRouter>
  </StrictMode>
);