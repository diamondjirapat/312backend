import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <header className="header">
                <div className="container header-content">
                    <div className="logo">worddee.ai</div>
                    <nav className="nav">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            My Progress
                        </NavLink>
                        <NavLink
                            to="/"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            Word of the Day
                        </NavLink>
                    </nav>
                    <div className="profile">
                        <UserCircle size={28} color="var(--color-accent-dark)" />
                    </div>
                </div>
            </header>
            <main className="main-content">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
