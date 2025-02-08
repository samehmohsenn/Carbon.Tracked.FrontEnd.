import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-col items-center justify-center flex">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold">Carbon.</h1>
        <h1 className="text-3xl font-bold text-green-600 ml-2">Tracked.</h1>
      </div>

    <div className="flex items-center justify-center">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">

        <h2 className="text-2xl mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
    </div>
  );
};

export default LoginPage;