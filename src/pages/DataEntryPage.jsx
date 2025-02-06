import React from 'react';
import DataEntryForm from '../components/DataEntryForm';

const DataEntryPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl mb-4">Enter Carbon Emission Data</h2>
        <DataEntryForm />
      </div>
    </div>
  );
};

export default DataEntryPage;
