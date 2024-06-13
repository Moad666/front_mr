// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
