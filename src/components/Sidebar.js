import React from 'react';
import { FiSend, FiInbox, FiSettings, FiMessageSquare, FiUsers, FiClock, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const menuItems = [
    { id: 'send', label: 'Send SMS', icon: <FiSend /> },
    { id: 'inbox', label: 'Inbox', icon: <FiInbox /> },
    { id: 'history', label: 'History', icon: <FiClock /> },
    { id: 'contacts', label: 'Contacts', icon: <FiUsers /> },
    { id: 'templates', label: 'Templates', icon: <FiMessageSquare /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h1>📱 Smskee</h1>
        <p>SMS Management App</p>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <div
              className={`sidebar-menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="theme-toggle">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      <div className="sidebar-footer">
        <p>Powered by Textbelt API</p>
        <p>© 2025 Smskee</p>
      </div>
    </div>
  );
};

export default Sidebar;
