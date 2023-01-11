import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./components/Context/PlayerProvider";
import PlayerLobby from "./components/PlayerLobby/PlayerLobby";
import Login from "./components/Login/Login";
import { AuthProvider } from "./components/Context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<PlayerLobby />} />
          </Routes>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;
