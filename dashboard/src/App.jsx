import React from "react";
import {BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import AddPro from "./pages/AddPro";
import AllPro from "./pages/AllPro";
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";



const App = () => {
  return (
    <Router>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/add-product" element={<AddPro/>}/>
            <Route path="/pro" element={<AllPro/>}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/orders" element={<Orders/>}/>
          </Routes>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
    </Router>
  );
};

export default App;
