import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const monthMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

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
        console.log('response', response.data);

        const sortedReports = response.data.sort((a, b) => {
          const [monthA, yearA] = a.month.split(' ');
          const [monthB, yearB] = b.month.split(' ');

          if (yearA !== yearB) {
            return parseInt(yearB) - parseInt(yearA);
          }

          return monthMap[monthB] - monthMap[monthA];
        });

        setReports(sortedReports);
      } catch (err) {
        setError('Error fetching report data.');
        console.error(err);
      }
    };

    fetchReports();
  }, [navigate]);

  const handleDelete = async (reportId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/EmissionData/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(reports.filter(report => report.reportId !== reportId));
    } catch (err) {
      setError('Error deleting report.');
      console.error(err);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!reports.length) {
    return <p>Loading reports...</p>;
  }
  const chartData = {
    labels: reports.map(report => report.month),
    datasets: [
      {
        label: 'Total Emissions',
        data: reports.map(report => report.totalEmissions),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold mb-4">Emission Reports</h2>
      <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Total Emissions by Month' } } }} />
      </div>     {reports.map((report) => (
        <div key={report.reportId} className="space-y-2">
          <br/>
          <hr/>
          <br/>
          <p>
            <span className="font-semibold">Month/Year:</span> {report.month}
          </p>
          <p>
            <span className="font-semibold">Total Emissions:</span> {report.totalEmissions}
          </p>
          <p>
            <span className="font-semibold">Highest Emitter:</span> {report.highestEmitter}
          </p>
          <div>
            <h3 className="text-xl font-semibold mb-2">Category Emissions</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 w-1/2">Emitter</th>
                  <th className="border border-gray-300 px-4 py-2 w-1/2">CO₂e Value</th>
                </tr>
              </thead>
              <tbody>
                {report.categoryEmissions && Object.entries(report.categoryEmissions).map(([emitter, value]) => (
                  <tr key={emitter}>
                    <td className="border border-gray-300 px-4 py-2">{emitter}</td>
                    <td className="border border-gray-300 px-4 py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Suggestions</h3>
            <ul className="list-disc list-inside">
              {report.suggestions && report.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => handleDelete(report.reportId)}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default DataReport;