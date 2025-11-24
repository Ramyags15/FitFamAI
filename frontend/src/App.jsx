import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'; 
import './styles/theme-colors.css';
import NutritionPage from './components/NutritionPage';
import ChatBox from './components/ChatBox';
import AITasks from './components/AITasks';     
import Leaderboard from './components/Leaderboard'; 
import RoutinePage from './components/RoutinePage';
import YogaPage from './components/YogaPage';
import NutritionGame from './components/NutritionGame';
import YogaFlow from "./pages/YogaFlow";

const LandingPage = () => {
  return (
    <>
      
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
      
      <section id="landing-hero" className="padded-section dark-bg">
        <div className="hero-content">
          <h1>
            Transform Your Body <br /> With AI-Powered Fitness
          </h1>
          <p>
            Get personalized workout plans, nutrition guidance, and 24/7 AI
            coaching tailored specifically to your goals and lifestyle.
          </p>
          
          
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
      
      <section id="features" className="padded-section light-bg">
        <h2 className="text-gradient">Our Premium Services</h2>
        <div className="feature-cards">
          <div className="card dark-card">
           
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
      
      <section id="success-stories" className="padded-section light-bg">
        <h2 className="text-gradient">Success Stories</h2>
        <div className="story-cards">
            
            <div className="card light-card">
                <div className="testimonial-header">
                    <img src="https://static.vecteezy.com/system/resources/previews/025/869/623/non_2x/round-profile-image-of-woman-avatar-for-social-networks-fashion-beauty-blue-and-black-bright-illustration-in-trendy-style-free-vector.jpg" alt="Sarah Johnson" className="profile-pic" />
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
                    <img src="https://static.vecteezy.com/system/resources/previews/025/869/585/non_2x/round-profile-image-of-man-avatar-for-social-networks-fashion-beauty-blue-and-black-bright-illustration-in-trendy-style-vector.jpg" alt="Michael Chen" className="profile-pic" />
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
                    <img src="https://static.vecteezy.com/system/resources/previews/025/869/674/original/round-profile-image-of-woman-avatar-for-social-networks-fashion-beauty-blue-and-black-bright-illustration-in-trendy-style-free-vector.jpg" alt="Jessica Williams" className="profile-pic" />
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
        
        
      </section>
      
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


const AuthPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api/auth'; 

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
      
      
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      
      
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


const DashboardPage = ({ user, logout }) => {
  
  const aiSuggestions = [
        "💧 Stay hydrated! Drink a glass of water now.",
        "🍎 Aim for at least 5 servings of vegetables today.",
        "🧘 Take a 5-minute break to stretch your neck and shoulders.",
        "💪 Schedule your most challenging workout for the morning.",
        "😴 Prioritize sleep tonight—it's crucial for muscle repair!",
        "🚶 Get up and walk for 10 minutes every 2 hours.",
    ];
    const [aiMessage, setAiMessage] = useState(aiSuggestions[0]);
    
    useEffect(() => {
        
        const interval = setInterval(() => {
            setAiMessage(prevMessage => {
                const currentIndex = aiSuggestions.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % aiSuggestions.length;
                return aiSuggestions[nextIndex];
            });
        }, 10000); 

        return () => clearInterval(interval); 
    }, [aiSuggestions]);
    if (!user) return null;
  return (
    <div className="dashboard-container padded-section light-bg">
      <nav className='dashboard-nav'>
        <div className="logo">FitFam AI - Welcome, {user.name}!</div>
        <button onClick={logout} className="btn-gradient">Logout</button>
      </nav>
      <div className="dashboard-grid">
       
        <ChatBox user={user} />
        <AITasks user={user} />
       
        <div className="log-area card dark-card" style={{ backgroundColor: '#2e3d50' }}>
           <h3>✨ AI Coach Says...</h3>
           <p className="ai-message-pop">{aiMessage}</p> 
        </div>
       <Leaderboard />
      </div>
      <p style={{ marginTop: '50px' }}>
        Communicate, make connections and have fun in your fitness journey!
      </p>
    </div>
  );
};


const ProtectedRoute = ({ user, children }) => {
    if (!user) {
     
        return <Navigate to="/auth" replace />;
    }
    
    return children;
};



export default function App() {
  
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
        
        
        <Route 
            path="/auth" 
            element={user ? <Navigate to="/dashboard" replace /> : <AuthPage setUser={setUser} />} 
        />
        
       
        <Route 
            path="/dashboard" 
            element={<ProtectedRoute user={user}><DashboardPage user={user} logout={logout} /></ProtectedRoute>} 
        />

      
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/routine" element={<RoutinePage />} /> 
        <Route path="/yoga" element={<YogaPage />} />   
         <Route path="/yoga/flow/:id" element={<YogaFlow />} />

        <Route path="/game" element={<NutritionGame />} />
   
      </Routes>
    </Router>
  );
}