import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-col items-center justify-center flex">
      <h1 className="text-3xl font-bold text-center mb-6">Carbon. Tracked.</h1>
          <div className="flex items-center justify-center ">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <SignupForm />
      </div>
    </div>
 

    </div>

  );
};

export default SignupPage;
