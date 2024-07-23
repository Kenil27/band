// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="page-container">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
