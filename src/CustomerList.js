import React, { useState, useEffect } from "react";
import "./App.css";
import { mockData } from "./utils/data";

function CustomerList() {
  const [customerData, setCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQueryCGI, setSearchQueryCGI] = useState("");
  const [searchQueryname, setSearchQueryname] = useState("");
  const [searchQueryMobile, setSearchQueryMobile] = useState("");
  const [searchQueryEmail, setSearchQueryEmail] = useState("");
  const [searchQueryStatus, setSearchQueryStatus] = useState("");
  const itemsPerPage = 10;

  /**
   *  useEffect(() => {
    
    fetch(
      "https://cgv2.creativegalileo.com/api/V1/customer/filter?cgId=12070687&name=Dev&mobile=7093690745&paginated=true&pageNo=1&pageSize=50",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Yzg4ZjAwZi0wYWI4LTExZWUtOGZjOC0wYTU0NDNmNmE5NzgiLCJlbnRpdHlUeXBlIjoidXNlciIsInYiOiIwLjEiLCJpYXQiOjE3MDY1MDcxNjMsImV4cCI6MTczODA2NDc2M30.DLWxMAdaupi_559pwGdQyVH_rmQWS1zr_FZUJWp_w9U",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
   */

  useEffect(() => {
    setCustomerData(mockData);
    setFilteredData(mockData); // Initialize filtered data with all data
  }, []);

  useEffect(() => {
    // Handle pagination when filtered data changes
    setCurrentPage(1);
  }, [filteredData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = () => {
    const filteredResults = customerData.filter((item) => {
      if (!item) {
        return false;
      }

      const nameMatch =
        searchQueryname === "" ||
        (item.name &&
          item.name.toLowerCase().includes(searchQueryname.toLowerCase()));
      const mobileMatch =
        searchQueryMobile === "" ||
        (item.mobile &&
          item.mobile.toLowerCase().includes(searchQueryMobile.toLowerCase()));
      const emailMatch =
        searchQueryEmail === "" ||
        (item.email &&
          item.email.toLowerCase().includes(searchQueryEmail.toLowerCase()));
      const statusMatch =
        searchQueryStatus === "" ||
        (item.status &&
          item.status.toLowerCase() === searchQueryStatus.toLowerCase());

      return nameMatch && mobileMatch && emailMatch && statusMatch;
    });

    setFilteredData(filteredResults);
    setCurrentPage(1); // Reset currentPage to 1 after search
  };
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <h2 style={{ marginLeft: "10px", paddingLeft: "18px" }}>Customers</h2>
      <div className="Searchbar">
        <div>
          <input
            type="text"
            placeholder="name"
            value={searchQueryname}
            onChange={(e) => setSearchQueryname(e.target.value)}
            style={{ width: "150px", padding: "2px", margin: "5px" }}
          />

          <input
            type="text"
            placeholder="Mobile No..."
            value={searchQueryMobile}
            onChange={(e) => setSearchQueryMobile(e.target.value)}
            style={{ width: "150px", padding: "2px", margin: "5px" }}
          />
          <input
            type="text"
            placeholder="Email..."
            value={searchQueryEmail}
            onChange={(e) => setSearchQueryEmail(e.target.value)}
            style={{ width: "150px", padding: "2px", margin: "5px" }}
          />
          <input
            type="text"
            placeholder="Status..."
            value={searchQueryStatus}
            onChange={(e) => setSearchQueryStatus(e.target.value)}
            style={{ width: "150px", padding: "2px", margin: "5px" }}
          />
        </div>
        <div>
          <img
            src="https://imgs.search.brave.com/X_uwqfioeJlBGvA4Lo5OrBGlXjZYo3rKLDf5zaXVuQk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzY1Lzk0LzY3/LzM2MF9GXzY2NTk0/Njc5NV9PNGxkYTU4/QW16enVGZVVkVzNQ/UGltMzFWdlhWWHUz/bC5qcGc"
            style={{
              width: "30px",
              cursor: "pointer",
              margin: "10px",
              padding: "10px",
            }}
            alt="Search Icon"
            onClick={handleSearch}
          />
          <img
            src="https://imgs.search.brave.com/KNsaw6QGpTnJMQj6-rPY_nsHgmSH8E5H-8x7JVN1eDw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8yODA1LzI4MDUz/NTUucG5n"
            style={{
              width: "30px",
              cursor: "pointer",
              width: "30px",
              cursor: "pointer",
              margin: "10px",
              padding: "10px",
            }}
            alt="refresh_page"
            onClick={refreshPage}
          />
        </div>
      </div>
      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>CGI</th>
              <th>name</th>
              <th>code</th>
              <th>Mobile No</th>
              <th>email</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.cgid}>
                <td>{item.cgid}</td>
                <td>{item.name}</td>
                <td>{item.dialcode}</td>
                <td>{item.mobile}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, i) => (
              <li key={i + 1} className={currentPage === i + 1 ? "active" : ""}>
                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default CustomerList;
