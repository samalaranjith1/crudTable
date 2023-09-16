import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Add from "./Add";
import Update from "./Update";
import Delete from "./Delete";

function RouterPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}></Route>
        <Route exact path="/create" element={<Add />}></Route>
        <Route exact path="/update/:id" element={<Update />}></Route>
        <Route exact path="/delete/:id" element={<Delete />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterPage;
