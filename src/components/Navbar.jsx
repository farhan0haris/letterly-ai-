import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Letterly AI
          <Sparkles className="logo-icon" />
        </NavLink>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)} end>Home</NavLink>
          <NavLink to="/generator" className="nav-link" onClick={() => setIsOpen(false)}>Generator</NavLink>
          <NavLink to="/history" className="nav-link" onClick={() => setIsOpen(false)}>History</NavLink>
          <NavLink to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</NavLink>
        </div>

        <div className="navbar-actions">
          <ThemeToggle />
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
