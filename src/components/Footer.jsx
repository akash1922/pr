import { useState } from "react";
import "../css/Footer.css";

function Footer() {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="social-links">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>

      <div className="footer-center">
        <div className="promo-wrapper">
        <button
  className="promotions-btn"
  onClick={() => window.open("https://docs.google.com/forms/d/18Pb7Ar3N_xGfznBsIGiTGvVWX4TL7CGFbUR-6U123Yc/viewform?edit_requested=true", "_blank")}
>
  Movie Promotion 🤑
</button>

          <span
            className="help-icon"
            onClick={toggleInfo}  
            title="Why click?"
          >
            ❔
          </span>
          {showInfo && (
            <div className="promo-info">
              <p>Sureshot 100k+ organic views</p>
              <button className="close-info" onClick={toggleInfo}>X</button>
            </div>
          )}
        </div>
      </div>

      <div className="footer-right">
        <p>&copy; {new Date().getFullYear()} NetBuild.</p>
      </div>
    </footer>
  );
}

export default Footer;
