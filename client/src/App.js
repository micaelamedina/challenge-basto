import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateLivestock from "./components/CreateLivestock/CreateLivestock";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/create"} element={<CreateLivestock />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
