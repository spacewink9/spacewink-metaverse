import React from 'react';
import Card from '../components/Card';
import './Home.css';

function Home() {
    const features = [
        { title: 'Metaverse Ecosystem', description: 'Explore the virtual world built for the future.' },
        { title: 'Blockchain Integration', description: 'Secure and transparent transactions with Athanis.' },
        { title: 'Interstellar Connectivity', description: 'Connect beyond Earth with innovative solutions.' }
    ];

    return (
        <div className="home">
            <section className="hero">
                <h1>Welcome to Spacewink Metaverse</h1>
                <p>Your gateway to the future of virtual reality and blockchain technology.</p>
                <button className="cta-button">Join Now</button>
            </section>

            <section className="features">
                <h2>Features</h2>
                <div className="feature-list">
                    {features.map((feature, index) => (
                        <Card key={index} title={feature.title} description={feature.description} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
