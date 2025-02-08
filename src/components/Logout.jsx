import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the signup page
  }, [navigate]);

  return null; // does not render anything
};

export default Logout;