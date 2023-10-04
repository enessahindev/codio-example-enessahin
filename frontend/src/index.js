import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutComponents from "./pages/Layout";
import HomeComponents from "./pages/Home";
import ProductComponents from "./pages/Product";
import LoginComponents from "./pages/Login";
import RegisterComponents from "./pages/Register";

function AppComponent() {
  return (
    <main className="max-w-[1920px] mx-auto relative overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutComponents />}>
            <Route index element={<HomeComponents />} />
            <Route path="products" element={<ProductComponents />} />
          </Route>
          <Route path="login" element={<LoginComponents />}></Route>
          <Route path="register" element={<RegisterComponents />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppComponent />);

reportWebVitals();
