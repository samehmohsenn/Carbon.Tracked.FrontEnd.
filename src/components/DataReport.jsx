import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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

const colors = [
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
  'rgba(199, 199, 199, 0.7)',
  'rgba(83, 102, 255, 0.7)',
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
];

const DataReport = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const navigate = useNavigate();

  const validateToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token expired. Click <a href="/login">here</a> to login again.');
      navigate('/login');
      return null;
    }

    try {
      if (typeof token !== 'string') {
        throw new Error('Invalid token');
      }
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    } catch (err) {
      setError('Invalid token. Please log in again.');
      navigate('/login');
      return null;
    }
  };

  const fetchReports = async () => {
    const userId = validateToken();
    if (!userId) return;

    try {
      const response = await axios.get(`${API_URL}/EmissionData/reports/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const sortedReports = response.data.sort((a, b) => {
        const [monthA, yearA] = a.month.split(' ');
        const [monthB, yearB] = b.month.split(' ');

        if (yearA !== yearB) {
          return parseInt(yearB) - parseInt(yearA);
        }
        return monthMap[monthB] - monthMap[monthA];
      });

      setReports(sortedReports);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Token expired. Click <a href="/login">here</a> to login again.');
      } else {
        setError('Error fetching report data.');
      }
    }
  };

  useEffect(() => {
    fetchReports();
  }, [navigate]);

  const handleDelete = async (reportId) => {
    const userId = validateToken();
    if (!userId) return;

    try {
      await axios.delete(`${API_URL}/EmissionData/${reportId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReports(reports.filter(report => report.reportId !== reportId));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Token expired. Click <a href="/login">here</a> to login again.');
      } else {
        setError('Error deleting report.');
      }
      console.error(err);
    }
  };

  const handleSearch = () => {
    const userId = validateToken();
    if (!userId) return;

    if (searchMonth.trim() === '') {
      fetchReports();
    } else {
      const filteredReports = reports.filter(report => report.month.toLowerCase().includes(searchMonth.toLowerCase()));
      setReports(filteredReports);
    }
  };

  if (error) {
    return <p className="text-red-500" dangerouslySetInnerHTML={{ __html: error }} />;
  }

  // Extract emission categories and create datasets
  const categories = Array.from(new Set(reports.flatMap(report => Object.keys(report.categoryEmissions || {}))));
  const datasets = categories.map((category, index) => ({
    label: category,
    data: reports.map(report => report.categoryEmissions ? report.categoryEmissions[category] || 0 : 0),
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length].replace('0.6', '1'),
    borderWidth: 1,
  }));

  const chartData = {
    labels: reports.map(report => report.month),
    datasets: datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Emissions by Month',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold mb-4">Emission Reports</h2>
      <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
          placeholder="Enter Month (e.g., January 2024)"
          className="px-4 py-2 border rounded mr-2 w-1/2"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
      </div>
      
      {reports.length === 0 ? (
        <p className="text-center text-2xl">No reports! <Link to="/data-entry" className="text-blue-500">Add data</Link></p>
      ) : (
        reports.map((report) => (
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
                    <th>Emitter</th>
                    <th>Value (kgCO2e)</th>
                  </tr>
                </thead>
                <tbody>
                  {report.categoryEmissions && Object.entries(report.categoryEmissions).map(([emitter, value]) => (
                    <tr key={emitter}>
                      <td className="border border-gray-300 px-4 py-2">{emitter}</td>
                      <td className="border border-gray-300 px-4 py-2">{value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Suggestions</h3>
              {report.suggestions && report.suggestions.length > 0 ? (
                <ul className="list-disc list-inside">
                  {report.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-600 text-lg">No suggestions: All emission categories are below the standard threshold!</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(report.reportId)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default DataReport;