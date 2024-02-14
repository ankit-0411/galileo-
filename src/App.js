// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import CustomerList from "./CustomerList";
import Home from "./Home";

function App() {
  return (
    <>
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar style={{ width: "220px", outerHeight: "100%" }} />
          <div>
            <Routes>
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/home" element={<Home />} />
              {/* Add more routes for other menu items */}
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
