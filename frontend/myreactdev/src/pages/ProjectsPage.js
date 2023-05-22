import React, { useState, useEffect } from "react";
import axios from 'axios';
import './PagesStyle.css';

export default function Projects() {
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const companyData = Array.from(new Set(data.map(item => item.company_id)));
  const projectData = selectedCompany ? data.filter(item => item.company_id === selectedCompany) : [];
  const WTGData = selectedProject ? projectData.filter(item => item.project_group === selectedProject) : [];

  const resetTables = () => {
    setSelectedCompany(null);
    setSelectedProject(null);
  }

  return (
    <div className="project-container">
      <button className="reset-button" onClick={resetTables}>Reset Tables</button>
      
      {!selectedCompany && (
        <div>
          <h2>Company Table</h2>
          <table className="data-table">
            <thead>
              <tr><th>Company ID</th></tr>
            </thead>
            <tbody>
              {companyData.map((item, index) => (
                <tr key={index} onClick={() => setSelectedCompany(item)} className="interactive-row">
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCompany && !selectedProject && (
        <div>
          <h2>Project Table for Company ID: {selectedCompany}</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Project Number</th>
                <th>Acquisition Date</th>
                <th>Number 3L Code</th>
                <th>Project Deal Type</th>
                <th onClick={() => {}} className="interactive-header">Project Group</th>
                <th>Project Status</th>
              </tr>
            </thead>
            <tbody>
              {projectData.map((item, index) => (
                <tr key={index} onClick={() => setSelectedProject(item.project_group)} className="interactive-row">
                  <td>{item.id}</td>
                  <td>{item.project_name}</td>
                  <td>{item.project_number}</td>
                  <td>{item.acquisition_date}</td>
                  <td>{item.number_3l_code}</td>
                  <td>{item.project_deal_type}</td>
                  <td>{item.project_group}</td>
                  <td>{item.project_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProject && (
        <div>
          <h2>WTG Table for Project Group: {selectedProject}</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>WTG Numbers</th>
                <th>kW</th>
                <th>Months Acquired</th>
              </tr>
            </thead>
            <tbody>
              {WTGData.map((item, index) => (
                <tr key={index}>
                  <td>{item.WTG_numbers}</td>
                  <td>{item.kW}</td>
                  <td>{item.months_acquired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
