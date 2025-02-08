import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/reports');
    } else {
      navigate('/signup');
    }
  }, [navigate]);
  

  return null; //does not render anything
};

export default HomePage;