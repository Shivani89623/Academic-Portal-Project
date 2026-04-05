import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth"
    });
  };

  return (
    <div>

      {/* ===== TOP BAR ===== */}
      <div className="topbar-landing">
        <div className="container flex">
          <marquee behavior="scroll" direction="right">
            <span className="marquee-text">
              EduSync - Academic Operations & Management Portal
            </span>
          </marquee>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <header className="navbar-landing">
        <div className="container navbar-content">
          <h2 className="logo">EduSync</h2>

          <ul className="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Courses</li>
            <li>Contact</li>
          </ul>

          <div className="auth-buttons">
           
            <button 
  className="login-btn"
  onClick={() => navigate("/login")}
>
  Login
</button>

<button 
  className="register-btn"
  onClick={() => navigate("/register")}
>
  Register
</button>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero" >
        <div className="overlay"></div>
        <div className="hero-content">
          <h4>WELCOME TO</h4>
          <h1>EDUSYNC PORTAL</h1>
          <p>
            Transforming Academic Management Into Intelligent Growth.
          </p>
        
        </div>
      </section>

      {/* ===== FEATURES ===== */}
     <section className="features">
  <div className="container">

    <div className="features-header">
      <h2>CORE ACADEMIC FEATURES</h2>
      <p>Powerful tools designed to streamline academic operations.</p>
    </div>

    <div className="features-grid">

      <div className="feature-card">
        <div className="feature-icon">📊</div>
        <h3>Smart Attendance</h3>
        <p>Track student performance efficiently with real-time analytics.</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">📁</div>
        <h3>Assignment System</h3>
        <p>Manage submissions, deadlines, and evaluations seamlessly.</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">📝</div>
        <h3>Quiz Engine</h3>
        <p>Interactive and intelligent testing system for assessments.</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">📈</div>
        <h3>Progress Analytics</h3>
        <p>Data-driven insights for measurable student growth.</p>
      </div>

    </div>
  </div>
</section>

      {/* ===== ABOUT ===== */}
      <section className="about">
        <div className="container about-grid">
          <div>
            <h2><span>WELCOME</span> TO EDUSYNC</h2>
            <p>
              EduSync centralizes academic management into one powerful system 
              designed for efficiency, transparency, and measurable student growth.
            </p>

            <div className="about-points">
              <div>Structured Academic Workflow</div>
              <div>Real-time Performance Tracking</div>
              <div>Growth-Focused Learning System</div>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
              alt="students"
            />
          </div>
        </div>
      </section>

     <section className="courses">
  <div className="container">

    <div className="section-header">
      <h2 className="section-title">ENGINEERING PROGRAMS</h2>
      <p className="section-subtitle">
        Industry-oriented programs designed to build future innovators and leaders.
      </p>
    </div>

    <div className="courses-grid">

      <div
        className="course-card"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
        }}
      >
        <div className="course-content">
          <h3>Computer Science Engineering</h3>
          <p>AI, Data Science, Cyber Security & Software Development</p>
          <button className="course-btn">View Program</button>
        </div>
      </div>

      <div
        className="course-card"
      
            style={{ backgroundImage: `url(https://i.pinimg.com/736x/7d/20/43/7d20433190b51cc13f0469439ddb0482.jpg)` }}
    
      >
        <div className="course-content" >
          <h3>Mechanical Engineering</h3> 
          <p>Robotics, Manufacturing & Automotive Systems</p>
          <button className="course-btn">View Program</button>
           
        </div>
      </div>

      <div
        className="course-card"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        }}
      >
        <div className="course-content">
          <h3>Civil Engineering</h3>
          <p>Infrastructure, Structural Design & Sustainability</p>
          <button className="course-btn">View Program</button>
        </div>
      </div>

      <div
        className="course-card"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0')",
        }}
      >
        <div className="course-content">
          <h3>Electrical Engineering</h3>
          <p>Power Systems, Automation & Renewable Energy</p>
          <button className="course-btn">View Program</button>
        </div>
      </div>

      <div
        className="course-card"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')",
        }}
      >
        <div className="course-content">
          <h3>Electronics & Communication</h3>
          <p>VLSI, Communication Networks & Embedded Systems</p>
          <button className="course-btn">View Program</button>
        </div>
      </div>

      <div
        className="course-card"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
        }}
      >
        <div className="course-content">
          <h3>Industrial Engineering</h3>
          <p>Process Optimization & Operations Management</p>
          <button className="course-btn">View Program</button>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer-grid">

          <div className="footer-col">
            <h3 className="footer-logo">EduSync</h3>
            <p>
              A modern academic operations platform empowering institutions 
              with smart management and measurable growth.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Courses</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>Student Management</li>
              <li>Assignments</li>
              <li>Quiz System</li>
              <li>Analytics</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>Email: support@edusync.com</li>
              <li>Phone: +123 4567 890</li>
              <li>Location: India</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 EduSync. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}

export default Home;