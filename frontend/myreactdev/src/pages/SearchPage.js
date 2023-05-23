import React, { useState, useEffect } from "react";
import axios from 'axios';
import './PagesStyle.css';

export default function Projects() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState('project_name');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/projects')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSearch = () => {
    setData(data.filter(item => item[searchColumn].includes(searchTerm)));
  }

  const resetSearch = () => {
    setSearchTerm('');
    setSearchColumn('project_name');
    axios
      .get('http://127.0.0.1:5000/projects')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="project-container">
      <select onChange={(e) => setSearchColumn(e.target.value)}>
      <option value="eID">ID</option>
        <option value="project_name">Project Name</option>
        <option value="project_number">Project Number</option>
        <option value="acquisition_date">Acquisition Date</option>
        <option value="number_3l_code">Number 3L Code</option>
        <option value="project_deal_type">Project Deal Type</option>
        <option value="project_group">Project Group</option>
        <option value="project_status">Project Status</option>
        <option value="company_id">Company ID</option>
        <option value="WTG_numbers">WTG Numbers</option>
        <option value="kW">kW Generation</option>
        <option value="months_acquired">Months Acquired</option>
      </select>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <button onClick={resetSearch}>Reset</button>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Project Number</th>
            <th>Number 3L Code</th>
            <th>Project Deal Type</th>
            <th>Project Group</th>
            <th>Project Status</th>
            <th>Company ID</th>
            <th>WTG Numbers</th>
            <th>kW Generation</th>
            <th>Months Acquired</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
                    <td>{item.eID}</td>
                    <td>{item.project_name}</td>
                    <td>{item.project_number}</td>
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
