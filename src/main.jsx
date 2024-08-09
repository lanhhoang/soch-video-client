import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { RoomProvider } from "./context/RoomContext.jsx";
import Home from "./pages/Home.jsx";
import Room from "./pages/Room.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/therapy-meet/:roomId" element={<Room />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  </StrictMode>
);
