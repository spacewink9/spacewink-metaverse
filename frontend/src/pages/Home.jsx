import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Spacewink Metaverse</h1>
                <p>The next-generation ecosystem for exploration, innovation, and connection.</p>
                <div className="cta-buttons">
                    <Link to="/dashboard" className="cta-button">
                        Go to Dashboard
                    </Link>
                    <Link to="/profile" className="cta-button">
                        View Profile
                    </Link>
                </div>
            </header>

            <section className="features-section">
                <h2>Explore Our Features</h2>
                <div className="features-grid">
                    <Card
                        title="Virtual Land"
                        description="Own and trade virtual properties in the Spacewink Metaverse."
                    />
                    <Card
                        title="Blockchain Integration"
                        description="Secure and transparent transactions with our Athanis token."
                    />
                    <Card
                        title="Immersive Experiences"
                        description="Engage with cutting-edge virtual reality experiences."
                    />
                </div>
            </section>
        </div>
    );
}

export default Home;
