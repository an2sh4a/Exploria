import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MissionPath from "./pages/MissionPath";
import CyberRoom from "./pages/CyberRoom";

export default function App() {
  return (
    <Routes>

      <Route 
        path="/" 
        element={<Home />} 
      />

      <Route 
        path="/missions" 
        element={<MissionPath />} 
      />

      <Route 
        path="/cyber" 
        element={<CyberRoom />} 
      />

    </Routes>
  );
}