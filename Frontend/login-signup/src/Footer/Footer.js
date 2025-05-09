import React from 'react';
import './Footer.css'; // We'll create this file separately

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-brand">
              <div className="footer-logo">
                <i className="bi bi-mortarboard-fill"></i> QuizMaster
              </div>
              <p className="footer-tagline">Test your knowledge, challenge your mind</p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="quick-links">
              <h5>Quick Links</h5>
              <ul className="footer-links">
                <li><a href="/dashboard"><i className="bi bi-house-door"></i> Dashboard</a></li>
                <li><a href="/give-quiz"><i className="bi bi-lightning"></i> Take Quiz</a></li>
                <li><a href="/create-quiz"><i className="bi bi-plus-circle"></i> Create Quiz</a></li>
                <li><a href="/scramble-game"><i className="bi bi-puzzle"></i> Word Scramble</a></li>
              </ul>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="connect">
              <h5>Connect With Us</h5>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="bi bi-github"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-envelope-fill"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {currentYear} QuizMaster. Made with <span className="heart">❤</span> by Faizan</p>
          </div>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;