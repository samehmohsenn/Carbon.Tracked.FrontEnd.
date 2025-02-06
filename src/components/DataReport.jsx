import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DataReport = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login page if no token is found
        return;
      }
      console.log('token', token);

      let userId;
      try {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId; // Adjust this based on your token structure
        console.log('userId from frontend', userId);
      } catch (err) {
        setError('Invalid token. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/EmissionData/reports/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });
        console.log('response', response);  

        setReports(response.data);
      } catch (err) {
        setError('Error fetching report data.');
        console.error(err);
      }
    };

    fetchReports();
  }, [navigate]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!reports.length) {
    return <p>Loading reports...</p>;
  }
  return (

    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold mb-4">Emission Report</h2>
      
      {/* Company Details */}
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Company Name:</span> {reports.companyName}
        </p>
        <p>
          <span className="font-semibold">Month/Year:</span> {reports.monthYear}
        </p>
        <p>
          <span className="font-semibold">Total Emissions:</span> {reports.totalEmissions}
        </p>
        <p>
          <span className="font-semibold">Highest Emitter:</span> {reports.highestEmitter}
        </p>
      </div>

      {/* Category Emissions */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Category Emissions</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Emitter</th>
              <th className="border border-gray-300 px-4 py-2">CO₂e Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(reports.categoryEmissions).map(([emitter, value]) => (
              <tr key={emitter}>
                <td className="border border-gray-300 px-4 py-2">{emitter}</td>
                <td className="border border-gray-300 px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Suggestions</h3>
        <ul className="list-disc list-inside">
          {reports.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>    </div>  );
};

export default DataReport;
