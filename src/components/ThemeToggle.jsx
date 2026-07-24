import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Switch to dark/light mode"
    >
      {theme === 'dark' ? <Sun className="icon sun-icon" /> : <Moon className="icon moon-icon" />}
    </button>
  );
};

export default ThemeToggle;
