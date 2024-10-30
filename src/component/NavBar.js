import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Book Inventory</h2>
      <ul className="nav-links">
        <li>
          <Link to="/add">Add Book</Link>
        </li>
        <li>
          <Link to="/books">Book List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
