import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-lg font-bold">Kanban Board</h1>
        <div>
          <Link className="text-white px-4" to="/">Home</Link>
          <Link className="text-white px-4" to="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
