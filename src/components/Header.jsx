import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Carbon. Tracked. </h1>
      <nav>
        <Link to="/reports"           className={`mr-4 px-2 py-1 rounded ${location.pathname === '/reports' ? 'bg-gray-600' : ''}`}
        >Reports</Link>
        <Link to="/data-entry"           className={`mr-4 px-2 py-1 rounded ${location.pathname === '/data-entry' ? 'bg-gray-600' : ''}`}
        >Data Entry</Link>
        <Link to="/logout" className="mr-4 text-red-400">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;