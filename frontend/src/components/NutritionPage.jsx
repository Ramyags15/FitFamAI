import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the main CSS

export default function NutritionPage() {
    return (
        <div className="nutrition-page light-bg">
            <nav className='static-nav dark-bg'>
                <div className="logo"><Link to="/">FitFam AI</Link></div>
                <Link to="/" className="btn-gradient">Back to Home</Link>
            </nav>

            <section className="padded-section">
                <h1 className="text-gradient">🥦 Your Personalized Nutrition Guide</h1>
                <p className="subtitle">Fuel your body with science-backed advice and personalized meal strategies.</p>
                <div className="main-nutrition-content">

                    {/* Section 1: Core Principles */}
                    <div className="core-principles-cards">
                        <div className="card dark-card">
                            <h3 className="text-gradient">Macro Tracking</h3>
                            <p>Understand the importance of proteins, carbs, and fats for your specific fitness goals (muscle gain vs. fat loss).</p>
                        </div>
                        <div className="card dark-card">
                            <h3 className="text-gradient">Hydration is Key</h3>
                            <p>Learn how proper water intake impacts your energy levels, digestion, and workout recovery.</p>
                        </div>
                        <div className="card dark-card">
                            <h3 className="text-gradient">Mindful Eating</h3>
                            <p>Tips for eating slowly, recognizing hunger cues, and avoiding common pitfalls like emotional eating.</p>
                        </div>
                    </div>

                    {/* Section 2: Nutrition Cards (Example Explanations) */}
                    <h2 className='text-gradient' style={{marginTop: '60px'}}>Essential Nutrition Breakdown</h2>
                    <div className="nutrition-breakdown-cards">
                        
                        <div className="card light-card-alt">
                            <h4>Protein Power</h4>
                            <p>Essential for muscle repair and satiety. **Sources:** Chicken breast, lentils, whey protein, eggs.</p>
                        </div>
                        <div className="card light-card-alt">
                            <h4>Complex Carbs</h4>
                            <p>The primary source of energy for intense workouts. **Sources:** Oatmeal, brown rice, sweet potatoes, whole-wheat bread.</p>
                        </div>
                        <div className="card light-card-alt">
                            <h4>Healthy Fats</h4>
                            <p>Crucial for hormone production and brain health. **Sources:** Avocados, nuts, seeds, olive oil.</p>
                        </div>
                        
                    </div>
                </div><br/><br/><br/>

                <Link to="/auth" className="btn-gradient large-btn" style={{marginTop: '50px'}}>
                    Get Your Custom Meal Plan with AI Coaching!
                </Link>
            </section>
        </div>
    );
}