import React from "react";
import {
  HashRouter ,
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";
import { Product } from "./pages/Product";
import { Add_Product } from "./pages/add_product";

const Routez = () => (
    <HashRouter basename="/">
      <Routes> 
        <Route path="/" element={<Product />} />
        <Route path="/add_product" element={<Add_Product/>} />
      </Routes>
    </HashRouter >
);

export default Routez;
