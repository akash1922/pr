import { useState } from "react";
import "../css/Navbar.css";

function Navbar({ onToggleTheme, currentTheme }) {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="public/61K7SJHT9HL.png" alt="Logo" className="navbar-logo" />
      </div>
      <div className="navbar-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/upcoming" className="nav-link">Upcoming Movies</a>
        <a href="/hindi" className="nav-link">Hindi Movies</a> 
        <button onClick={onToggleTheme} className="theme-toggle-btn">
          {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
