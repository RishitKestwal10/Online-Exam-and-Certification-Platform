import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FaLaptopCode, FaUserShield, FaClock, FaCertificate, FaArrowUp } from 'react-icons/fa';  // FaArrowUp for arrow icon

const HomePage = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    document.title = 'Examify - Online Exam Management Platform';

    const handleScroll = () => {
      setShowButton(window.pageYOffset > 300); // Show button after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Examify</div>
        <ul className="nav-links">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link to="/login" className="nav-btn">Login</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-text">
          <h1>Conduct Exams Efficiently, Certify Instantly</h1>
          <p>
            A secure, web-based platform for conducting online exams with automated evaluation and instant certificate generation.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
            <Link to="/features" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/home1.jpg" alt="Online Exam Illustration" />
        </div>
      </header>

      {/* Sliding Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-slide">
            <img src="/images/slide1.jpg" alt="Slide 1" />
            <img src="/images/slide2.jpg" alt="Slide 2" />
            <img src="/images/slide3.jpg" alt="Slide 3" />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="overview-section">
        <h2>Transforming the Exam Process</h2>
        <p>
          Developed to streamline exam management for institutions, our platform eliminates manual work, ensuring a smooth and efficient exam process with secure scheduling, real-time evaluation, and immediate certification.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaLaptopCode className="feature-icon" />
            <h4>Automated Evaluation</h4>
            <p>Save time with real-time evaluation for both MCQ and coding tests.</p>
          </div>
          <div className="feature-card">
            <FaUserShield className="feature-icon" />
            <h4>Secure Scheduling</h4>
            <p>Role-based access and proctoring tools to ensure exam integrity.</p>
          </div>
          <div className="feature-card">
            <FaClock className="feature-icon" />
            <h4>Instant Results</h4>
            <p>Get immediate results with detailed performance analytics.</p>
          </div>
          <div className="feature-card">
            <FaCertificate className="feature-icon" />
            <h4>Certificate Generation</h4>
            <p>Generate and download certificates instantly upon passing.</p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="roadmap-section">
        <h2>Roadmap</h2>
        <div className="roadmap-slider">
          <div className="roadmap-track">
            <div className="roadmap-card">
              <h4>Phase 1: Platform Launch</h4>
              <p>Initial release with MCQ exams, secure login, and admin dashboard.</p>
            </div>
            <div className="roadmap-card">
              <h4>Phase 2: Coding Exam Support</h4>
              <p>Integrated coding editor with real-time test case evaluation.</p>
            </div>
            <div className="roadmap-card">
              <h4>Phase 3: Certification Automation</h4>
              <p>Instant certificate generation and result analytics dashboard.</p>
            </div>
            <div className="roadmap-card">
              <h4>Phase 4: Advanced Proctoring</h4>
              <p>AI-based proctoring and video monitoring for exam integrity.</p>
            </div>
            {/* Repeat cards for infinite scroll */}
            <div className="roadmap-card">
              <h4>Phase 1: Platform Launch</h4>
              <p>Initial release with MCQ exams, secure login, and admin dashboard.</p>
            </div>
            <div className="roadmap-card">
              <h4>Phase 2: Coding Exam Support</h4>
              <p>Integrated coding editor with real-time test case evaluation.</p>
            </div>
            <div className="roadmap-card">
              <h4>Phase 3: Certification Automation</h4>
              <p>Instant certificate generation and result analytics dashboard.</p>
            </div>
            <div className="roadmap-card">
              <h4>Phase 4: Advanced Proctoring</h4>
              <p>AI-based proctoring and video monitoring for exam integrity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Interested in using Examify for your institution? Reach out to us.</p>
        <p>Email: support@examify.com</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Examify. All rights reserved.</p>
      </footer>

      {/* Scroll to Top Button */}
      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default HomePage;
