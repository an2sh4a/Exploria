import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { InventoryProvider } from "./contexts/InventoryContext";
import { AudioProvider } from "./contexts/AudioContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AudioProvider>
        <InventoryProvider>
          <App />
        </InventoryProvider>
      </AudioProvider>
    </BrowserRouter>
  </StrictMode>
);