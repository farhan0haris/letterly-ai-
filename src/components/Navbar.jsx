import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 4000);
        return 0;
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={handleLogoClick}>
          Letterly AI
          <Sparkles className="logo-icon" />
        </NavLink>
        
        {showEasterEgg && (
          <div className="navbar-easter-egg">
             <svg viewBox="0 0 100 100" className="millennium-falcon-mini" fill="currentColor">
               <circle cx="50" cy="55" r="25" />
               <path d="M35 35 L42 10 L48 10 L48 35 Z" />
               <path d="M65 35 L58 10 L52 10 L52 35 Z" />
               <rect x="70" y="40" width="12" height="6" rx="3" transform="rotate(20 70 40)" />
             </svg>
          </div>
        )}

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
