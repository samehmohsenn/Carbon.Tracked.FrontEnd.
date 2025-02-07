// src/components/DataEntryForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const DataEntryForm = () => {
  const [username, setUsername] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([{ name: '', value: '' }]);
  const navigate = useNavigate();


  // Set the API base URL from an environment variable, or use a default value
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if no token is found
      return;
    }
   setUsername(jwtDecode(token).username);
  }, [navigate]);
  
  const handleDataEntry = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

      // Convert categories to JSON
      const parsedData = {};
      categories.forEach(category => {
        if (category.name && category.value) {
          parsedData[category.name] = parseFloat(category.value);
        }
      });
      // Prepare the payload using the data from the form
    const payload = {
      username,
      data: parsedData,
      month,
    };

    try {
      // Post the payload to the /emissiondata endpoint
      const response = await axios.post(`${API_URL}/emissiondata`, payload);
      setSuccess('Data submitted successfully!');
      // Clear the form fields if needed
      setCategories([{ name: '', value: '' }]);
      setMonth('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Entry for this month already exists. Delete it from reports first.');
      } else {
        setError('Error submitting data.');
      }
    }
  };
  
  const handleAddCategory = () => {
    setCategories([...categories, { name: '', value: '' }]);
  };
  const handleRemoveCategory = () => {
    if (categories.length > 1) {
      setCategories(categories.slice(0, -1));
    }
  };

  const handleCategoryChange = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
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

<input
        type="text"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        placeholder="Month/Year (e.g., July 2023)"
        className="w-full px-4 py-2 border rounded"
        required
      />
      
      {categories.map((category, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="text"
            value={category.name}
            onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
            placeholder="Category Name"
            className="px-4 py-2 border rounded mr-2 w-1/2"
          />
          <input
            type="number"
            value={category.value}
            onChange={(e) => handleCategoryChange(index, 'value', e.target.value)}
            placeholder="Value"
            className="px-4 py-2 border rounded mr-2 w-1/2"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddCategory} className="px-4 py-2 bg-green-700 text-white rounded mt-2">
        Add Category
      </button>
      <button
        type="button"
        onClick={handleRemoveCategory}
        className="px-4 py-2 bg-red-500 text-white rounded mt-2 ml-2"
        disabled={categories.length === 1}
      >
        Remove Category
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
        Submit Data
      </button>
    </form>
  );
};

export default DataEntryForm;