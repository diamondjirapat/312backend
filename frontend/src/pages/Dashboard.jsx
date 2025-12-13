import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Clock } from 'lucide-react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ streak: 0, total_minutes_learned: 0, history: [] });

    // Mock data for the chart (for now, still mock)
    // Map history to chart data, usually you'd have dates or labels.
    // Here we just map by index 'Task 1', 'Task 2', etc.
    const history = stats.history || [];
    const data = history.length > 0
        ? history.map((score, index) => ({ name: `Task ${index + 1}`, score: score }))
        : [
            { name: 'Task 1', score: 0 }, // Placeholder if empty
        ];

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/stats');
            setStats(response.data);
        } catch (err) {
            console.error('Failed to fetch stats', err);
        }
    };

    // Format total minutes into hours and minutes
    const hours = Math.floor(stats.total_minutes_learned / 60);
    const minutes = stats.total_minutes_learned % 60;
    const timeDisplay = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">User's learner dashboard</h1>

            <section className="missions-section">
                <h2 className="section-title">Your missions today</h2>
                <div className="mission-card">
                    Well done! You've completed all your missions.
                </div>
            </section>

            <section className="overview-section">
                <h2 className="section-title">Overview</h2>

                <div className="stats-card">
                    <h3 className="card-title">Learning consistency</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon-wrapper fire">
                                <Flame size={32} fill="#ea580c" color="#ea580c" />
                                <span className="stat-value">{stats.streak}</span>
                            </div>
                            <span className="stat-label">Day streak</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon-wrapper clock">
                                <Clock size={32} color="#3b82f6" />
                                <span className="stat-value">{timeDisplay}</span>
                            </div>
                            <span className="stat-label">Time learned</span>
                        </div>
                    </div>
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <h3 className="card-title">Latest band scores</h3>
                        <span className="card-title">Progress</span>
                    </div>

                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data} barSize={48}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 10]} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="score" fill="#1e3a40" radius={[4, 4, 4, 4]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-action">
                        <button className="btn-primary" onClick={() => navigate('/')}>Take the test</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
