// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
        {/* Add more menu items */}
      </ul>
    </div>
  );
}

export default Sidebar;
