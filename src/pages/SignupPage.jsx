import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
