// src/components/DataEntryForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const DataEntryForm = () => {
  const [username, setUsername] = useState('');
  const [dataText, setDataText] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  // Set the API base URL from an environment variable, or use a default value
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if no token is found
    }
   setUsername(jwtDecode(token).username);
  }, [navigate]);
  
  const handleDataEntry = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    let parsedData;
    try {
      parsedData = JSON.parse(dataText);
    } catch (err) {
      setError('Invalid JSON format. Please correct your data.');
      return;
    }
      // Prepare the payload using the data from the form
    const payload = {
      username,
      data: parsedData,
      month,
    };

    try {
      // Post the payload to the /emissiondata endpoint
      const response = await axios.post(`${API_URL}/emissiondata`, payload);
      console.log(response.status)
      setSuccess('Data submitted successfully!');
      console.log('Submission response:', response.data);
      // Clear the form fields if needed
      // setUsername('');
      setDataText('');
      setMonth('');
    } catch (err) {
      console.log("in catch: "+ err.response.status)
      if(err.status === 404){
        setError('Entry for this month already exists. Delete it from reports first.');
      }
      else {
      setError('Error submitting data. Please try again.');}
      console.error(err);
    }
  };
  

  return (
    <form onSubmit={handleDataEntry} className="space-y-4">
      <input
        type="text"
        value={username}
        disabled
        placeholder="Username"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <textarea
        value={dataText}
        onChange={(e) => setDataText(e.target.value)}
        placeholder='Enter JSON data (e.g., {"key": "value"})'
        className="w-full px-4 py-2 border rounded h-32"
        required
      />

      <input
        type="text"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        placeholder="Month/Year (e.g., July 2023)"
        className="w-full px-4 py-2 border rounded"
        required
      />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
        Submit Data
      </button>
    </form>
  );
};

export default DataEntryForm;
