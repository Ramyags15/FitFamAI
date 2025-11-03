import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'; 
import NutritionPage from './components/NutritionPage';
import ChatBox from './components/ChatBox'; // <--- ADD THIS
// --- Components ---
// 1. Landing Page (Your original component content)
const LandingPage = () => {
  return (
    <>
      {/* NAVIGATION - Using Link for Routing */}
      <nav id="main-nav">
          <div className="logo"><Link to="/">FitFam AI</Link></div>
          <div className="nav-links">
            <Link to="/nutrition" className="nav-link-btn" style={{ backgroundColor: '#ffc107' }}>Nutrition</Link>
            <Link to="/routine" className="nav-link-btn" style={{ backgroundColor: '#673ab7' }}>Sample 6D Routine</Link>
            <Link to="/yoga" className="nav-link-btn" style={{ backgroundColor: '#e91e63' }}>Yoga</Link>
            <Link to="/game" className="nav-link-btn" style={{ backgroundColor: '#4caf50' }}>Game and Fun</Link>
            <Link to="/auth" id="nav-auth-button" className="btn-gradient">Sign Up / Login</Link>
          </div>
      </nav>
      {/* HERO SECTION */}
      <section id="landing-hero" className="padded-section dark-bg">
        <div className="hero-content">
          <h1>
            Transform Your Body <br /> With AI-Powered Fitness
          </h1>
          <p>
            Get personalized workout plans, nutrition guidance, and 24/7 AI
            coaching tailored specifically to your goals and lifestyle.
          </p>
          {/* Change button to route to /auth */}
          
          <div className='hero-image-wrap'>
            <div className="ai-coach-preview">FitAI Coach</div>
          </div>
          <p className="small-text">
            ⭐ Take our FREE website to get your personalized fitness plan!
          </p><br/>
            <Link to="/auth" id="hero-auth-button" className="btn-gradient large-btn">
            Start Your Journey
          </Link>
        </div><br/>
      
      </section>
      {/* FEATURES SECTION - STATIC CONTENT */}
      <section id="features" className="padded-section light-bg">
        <h2 className="text-gradient">Our Premium Services</h2>
        <div className="feature-cards">
          <div className="card dark-card">
            {/* Note: In a real React app, you would use a proper icon library */}
            <div className="icon-gradient" style={{fontSize: '3em'}}>📊</div> 
            <h3>Progress Analytics</h3>
            <p>
              Track your performance with detailed analytics and visual progress
              reports.
            </p>
          </div>
          <div className="card dark-card">
            <div className="icon-gradient" style={{fontSize: '3em'}}>🍽️</div>
            <h3>Meal Planning</h3>
            <p>
              Customized meal plans with grocery lists and nutritional
              information.
            </p>
          </div>
          <div className="card dark-card">
            <div className="icon-gradient" style={{fontSize: '3em'}}>🎥</div>
            <h3>Live Training</h3>
            <p>
             Train live and upload pictures for real-time feedback from our AI coach.
            </p>
          </div>
        </div>
      </section>
      {/* SUCCESS STORIES - STATIC CONTENT */}
      <section id="success-stories" className="padded-section light-bg">
        <h2 className="text-gradient">Success Stories</h2>
        <div className="story-cards">
            {/* ... Testimonial Cards ... (Content from your original App.jsx) */}
            <div className="card light-card">
                <div className="testimonial-header">
                    <img src="https://via.placeholder.com/50/FF5733/FFFFFF?text=SJ" alt="Sarah Johnson" className="profile-pic" />
                    <div className="testimonial-info">
                        <p className="author">Sarah Johnson</p>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p className="testimonial-text">
                    "I've lost 25 pounds in 3 months with FitFam AI! The personalized
                    workout plans and diet suggestions made all the difference. The AI
                    coach is like having a personal trainer available 24/7."
                </p>
            </div>
            <div className="card light-card">
                <div className="testimonial-header">
                    <img src="https://via.placeholder.com/50/33FF57/FFFFFF?text=MC" alt="Michael Chen" className="profile-pic" />
                    <div className="testimonial-info">
                        <p className="author">Michael Chen</p>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p className="testimonial-text">
                    "As someone who struggled with consistency, the sport scheduler
                    feature has been a game-changer. I've been working out regularly
                    for 4 months now and actually enjoying it!"
                </p>
            </div>
            <div className="card light-card">
                <div className="testimonial-header">
                    <img src="https://via.placeholder.com/50/3357FF/FFFFFF?text=JW" alt="Jessica Williams" className="profile-pic" />
                    <div className="testimonial-info">
                        <p className="author">Jessica Williams</p>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p className="testimonial-text">
                    "The diet plans are incredible! I have specific dietary
                    restrictions, and the AI was able to create perfect meal plans
                    that I actually look forward to. No more boring diet food!"
                </p>
            </div>
        </div>
        {/* Scroll to top button */}
        
      </section>
      {/* FOOTER - STATIC CONTENT */}
      <footer className="dark-bg">
        <div className="footer-content">
          <div className="footer-col">
            <h3>About FitFam AI</h3>
            <p>
              Your ultimate fitness companion for achieving health and wellness
              goals through personalized workout and nutrition plans.
            </p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>Workouts</li>
              <li>Nutrition</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p>
              📧 example@fitfam.ai
            </p>
            <p>
              📱 +91 9876543210
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 FitFam AI. All rights reserved.
        </div>
      </footer>
    </>
  );
};

// 2. Auth Page (Login/Signup Form)
const AuthPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api/auth'; // Ensure backend is running

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? 'login' : 'signup';
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || 'An error occurred during authentication.');
        return;
      }
      
      // On success, save user data and navigate
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user)); // Simple state persistence
      // The ProtectedRoute will handle navigation to /dashboard
      
    } catch (err) {
      setError('Could not connect to the server.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container padded-section">
      <div className="auth-card dark-card">
        <h2>{isLogin ? 'Login to FitFam AI' : 'Sign Up for Free'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn-gradient large-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

// 3. Dashboard Component (Shell only for now)
const DashboardPage = ({ user, logout }) => {
  if (!user) return null; 

  return (
    <div className="dashboard-container padded-section light-bg">
      <nav className='dashboard-nav'>
        <div className="logo">FitFam AI - Welcome, {user.name}!</div>
        <button onClick={logout} className="btn-gradient">Logout</button>
      </nav>
      <div className="dashboard-grid">
        {/* Row 1: Group Chat and AI Helper */}
        <ChatBox user={user} />
        <div className="ai-tasks card dark-card">
          <h3>🤖 AI Coach Tasks</h3>
          <p>AI will assign daily tasks here...</p>
        </div>
        {/* Row 2: Workout/Nutrition Logging and Leaderboard */}
        <div className="log-area card dark-card">
          <h3>🏋️ Log Activity</h3>
          <p>Workout/Nutrition logging forms...</p>
        </div>
        <div className="leaderboard card dark-card">
          <h3>🏆 Leaderboard</h3>
          <p>User rankings based on points...</p>
        </div>
      </div>
      <p style={{ marginTop: '50px' }}>
        This is your personalized dashboard. Let's build the features next!
      </p>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        // Redirect to login if no user is logged in
        return <Navigate to="/auth" replace />;
    }
    // Render the dashboard if user is present
    return children;
};


// Main App Component with State Management
export default function App() {
  // Try to load user from localStorage on initial load
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Route: Redirects to dashboard if logged in */}
        <Route 
            path="/auth" 
            element={user ? <Navigate to="/dashboard" replace /> : <AuthPage setUser={setUser} />} 
        />
        
        {/* Dashboard Route: Protected */}
        <Route 
            path="/dashboard" 
            element={<ProtectedRoute user={user}><DashboardPage user={user} logout={logout} /></ProtectedRoute>} 
        />

        {/* Static Pages (Empty shells for now, will be implemented later) */}
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/routine" element={<><h1>Sample 6D Routine Page (Coming Soon)</h1><Link to='/'>Back Home</Link></>} />
        <Route path="/yoga" element={<><h1>Yoga Routines Page (Coming Soon)</h1><Link to='/'>Back Home</Link></>} />
        <Route path="/game" element={<><h1>Game and Fun Page (Coming Soon)</h1><Link to='/'>Back Home</Link></>} />
      </Routes>
    </Router>
  );
}