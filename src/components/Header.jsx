import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Carbon. Tracked. </h1>
      <nav>
        <Link to="/reports" className="mr-4">Reports</Link>
        <Link to="/data-entry" className="mr-4">Data Entry</Link>
        <Link to="/logout" className="mr-4">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;