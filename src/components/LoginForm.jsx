import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_URL}/users/login`, { username, password });
      setSuccess(response.data.message);
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token); // Save token to local storage
      navigate('/reports'); // Redirect to data entry page
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid login credentials');
      console.error(err);
    }
  };

  return (
    <div>
    <form onSubmit={handleLogin} className="space-y-4">
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
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
    <p className="mt-4 text-center">
    Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
    </p>
   </div>

  );
};

export default LoginForm;
