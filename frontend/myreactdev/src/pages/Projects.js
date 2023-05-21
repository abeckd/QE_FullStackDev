import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Projects() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/projects')
      .then(function (response) {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const filterData = () => {
    if (reset) {
      setFilteredData(data);
      setReset(false);
      return;
    }

    const filteredResults = data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const handleSort = (column) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.column === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ column, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return direction === "ascending" ? -1 : 1;
      if (a[column] > b[column]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setReset(true);
    filterData();
  };

  return (
    <div>
      <h2>Data Table</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={filterData}
      />
      <button onClick={handleResetFilter}>Reset Filter</button>
      <table className="data-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("project_name")}>Project Name</th>
            <th onClick={() => handleSort("project_number")}>Project Number</th>
            <th onClick={() => handleSort("acquisition_date")}>Acquisition Date</th>
            <th onClick={() => handleSort("number_3l_code")}>Number 3L Code</th>
            <th onClick={() => handleSort("project_deal_type")}>Project Deal Type</th>
            <th onClick={() => handleSort("project_group")}>Project Group</th>
            <th onClick={() => handleSort("project_status")}>Project Status</th>
            <th onClick={() => handleSort("company_id")}>Company ID</th>
            <th onClick={() => handleSort("WTG_numbers")}>WTG Numbers</th>
            <th onClick={() => handleSort("kW")}>kW</th>
            <th onClick={() => handleSort("months_acquired")}>Months Acquired</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{item.id}</td>
              <td>{item.project_name}</td>
              <td>{item.project_number}</td>
              <td>{item.acquisition_date}</td>
              <td>{item.number_3l_code}</td>
              <td>{item.project_deal_type}</td>
              <td>{item.project_group}</td>
              <td>{item.project_status}</td>
              <td>{item.company_id}</td>
              <td>{item.WTG_numbers}</td>
              <td>{item.kW}</td>
              <td>{item.months_acquired}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
