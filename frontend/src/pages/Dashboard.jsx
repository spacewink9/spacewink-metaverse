import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

function Dashboard() {
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        // Simulated fetch from an API
        setTimeout(() => {
            setActivityData([10, 15, 25, 40, 35, 50, 60]);
        }, 1000);
    }, []);

    const chartData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'User Activity',
                data: activityData,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true
            }
        ]
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Track your weekly activity in the Spacewink Metaverse.</p>
            <div className="chart-container">
                <Line data={chartData} />
            </div>
        </div>
    );
}

export default Dashboard;
