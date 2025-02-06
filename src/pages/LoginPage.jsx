import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;