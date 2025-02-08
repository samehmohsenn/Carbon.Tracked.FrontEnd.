import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [industry, setIndustry] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Set the API URL from environment variables or default to localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        companyName,
        username,
        password,
        industry,
      });
      setSuccess(response.data.message);
      console.log('Signup successful:', response.data);
      setCompanyName('');
      setUsername('');
      setPassword('');
      setIndustry('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during sign up');
      console.error(err);
    }
  };

  return (
    <div>
    <form onSubmit={handleSignup} className="space-y-4">
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company Name"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="text"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        placeholder="Industry"
        className="w-full px-4 py-2 border rounded"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
        Sign Up
      </button>
    </form>
    <p className="mt-4 text-center">
          Have an account? <Link to="/login" className="text-blue-500">Login</Link>
    </p>
    </div>
  );
};

export default SignupForm;
