import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SendSMS from './components/SendSMS';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('send');
  const [apiKey, setApiKey] = useState('textbelt');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Load API key from localStorage on mount
    const storedApiKey = localStorage.getItem('textbelt_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeyChange = (newApiKey) => {
    setApiKey(newApiKey);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'send':
        return <SendSMS apiKey={apiKey} />;
      case 'inbox':
        return <div className="placeholder"><h2>📥 Inbox</h2><p>Coming soon...</p></div>;
      case 'history':
        return <div className="placeholder"><h2>🕐 History</h2><p>Coming soon...</p></div>;
      case 'contacts':
        return <div className="placeholder"><h2>👥 Contacts</h2><p>Coming soon...</p></div>;
      case 'templates':
        return <div className="placeholder"><h2>📝 Templates</h2><p>Coming soon...</p></div>;
      case 'settings':
        return <Settings onApiKeyChange={handleApiKeyChange} />;
      default:
        return <SendSMS apiKey={apiKey} />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
