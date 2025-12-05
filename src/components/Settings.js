import React, { useState, useEffect } from 'react';
import { FiSave, FiKey, FiCheck, FiAlertCircle, FiInfo, FiRefreshCw } from 'react-icons/fi';
import './Settings.css';

const Settings = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState('');
  const [savedApiKey, setSavedApiKey] = useState('');
  const [countryCode, setCountryCode] = useState('+60');
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  useEffect(() => {
    // Load API key from localStorage
    const storedApiKey = localStorage.getItem('textbelt_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setSavedApiKey(storedApiKey);
    } else {
      setApiKey('textbelt');
      setSavedApiKey('textbelt');
    }

    // Load country code from localStorage
    const storedCountryCode = localStorage.getItem('country_code');
    if (storedCountryCode) {
      setCountryCode(storedCountryCode);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setStatus({
        type: 'error',
        message: 'API key tidak boleh kosong!'
      });
      return;
    }

    try {
      localStorage.setItem('textbelt_api_key', apiKey);
      localStorage.setItem('country_code', countryCode);
      setSavedApiKey(apiKey);
      
      // Notify parent component
      if (onApiKeyChange) {
        onApiKeyChange(apiKey);
      }

      setStatus({
        type: 'success',
        message: 'Tetapan berjaya disimpan!'
      });

      // Clear message after 3 seconds
      setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Gagal menyimpan tetapan: ' + error.message
      });
    }
  };

  const handleReset = () => {
    const defaultKey = 'textbelt';
    const defaultCountry = '+60';
    setApiKey(defaultKey);
    setCountryCode(defaultCountry);
    localStorage.setItem('textbelt_api_key', defaultKey);
    localStorage.setItem('country_code', defaultCountry);
    setSavedApiKey(defaultKey);
    
    if (onApiKeyChange) {
      onApiKeyChange(defaultKey);
    }

    setStatus({
      type: 'info',
      message: 'Tetapan telah dikembalikan ke default'
    });

    setTimeout(() => {
      setStatus({ type: '', message: '' });
    }, 3000);
  };

  const isDefaultKey = savedApiKey === 'textbelt';

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>⚙️ Tetapan</h2>
        <p>Konfigurasi tetapan aplikasi SMS anda</p>
      </div>

      {status.message && (
        <div className={`alert alert-${status.type}`}>
          {status.type === 'success' && <FiCheck size={20} />}
          {status.type === 'error' && <FiAlertCircle size={20} />}
          {status.type === 'info' && <FiInfo size={20} />}
          <span>{status.message}</span>
        </div>
      )}

      <div className="settings-container">
        <div className="settings-grid">
          <div className="settings-section">
            <h3>
              <FiKey size={24} />
              Textbelt API Key
            </h3>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="apiKey">API Key</label>
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Masukkan API key anda"
                  required
                />
                <div className="form-help">
                  Masukkan API key Textbelt anda untuk menghantar SMS tanpa had.
                </div>
              </div>

              <div>
                <div className={`api-status ${isDefaultKey ? 'default' : 'active'}`}>
                  {isDefaultKey ? (
                    <>⚠️ Default Key (1 SMS/hari)</>
                  ) : (
                    <>✓ Custom API Key Aktif</>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="settings-section">
            <h3>
              <FiInfo size={24} />
              Tetapan Lokasi
            </h3>

            <div className="form-group">
              <label htmlFor="countryCode">Country Code Default</label>
              <select
                id="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="country-select"
              >
                <option value="+60">+60 (Malaysia)</option>
                <option value="+65">+65 (Singapore)</option>
                <option value="+1">+1 (United States)</option>
                <option value="+44">+44 (United Kingdom)</option>
                <option value="+91">+91 (India)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+62">+62 (Indonesia)</option>
                <option value="+86">+86 (China)</option>
              </select>
              <div className="form-help">
                Country code akan digunakan secara automatik untuk semua SMS.
              </div>
            </div>

            <div className="form-group">
              <label>Timezone</label>
              <input type="text" value="Asia/Kuala_Lumpur" disabled />
              <div className="form-help">
                Masa akan dipaparkan mengikut zon waktu Malaysia.
              </div>
            </div>
          </div>
        </div>

        <div className="settings-actions-bottom">
          <button type="submit" className="btn btn-primary" onClick={handleSave}>
            <FiSave /> Simpan Semua Tetapan
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            <FiRefreshCw /> Reset ke Default
          </button>
        </div>

        <div className="settings-section" style={{ marginTop: '30px' }}>
          <h3>
            <FiInfo size={24} />
            Maklumat API & Pricing
          </h3>
          <h3>
            <FiInfo size={24} />
            Maklumat API & Pricing
          </h3>

          <div className="info-grid">
            <div className="info-card-small">
              <h4>📝 Free Tier</h4>
              <ul>
                <li>Gunakan "textbelt" sebagai API key</li>
                <li>1 SMS sehari setiap IP address</li>
                <li>Sesuai untuk testing</li>
              </ul>
            </div>

            <div className="info-card-small">
              <h4>💎 Unlimited SMS</h4>
              <ul>
                <li>Harga: $0.01 per SMS</li>
                <li>Tiada monthly fee</li>
                <li>Pay as you go</li>
              </ul>
            </div>

            <div className="info-card-small">
              <h4>🔗 Resources</h4>
              <ul>
                <li>
                  <a href="https://textbelt.com" target="_blank" rel="noopener noreferrer">
                    Dapatkan API Key
                  </a>
                </li>
                <li>
                  <a href="https://docs.textbelt.com" target="_blank" rel="noopener noreferrer">
                    Dokumentasi
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>
            <FiInfo size={24} />
            Maklumat Aplikasi
          </h3>
          
          <div className="app-info-grid">
            <div className="info-item">
              <span className="info-label">Nama Aplikasi</span>
              <span className="info-value">Smskee</span>
            </div>
            <div className="info-item">
              <span className="info-label">Versi</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Default Country</span>
              <span className="info-value">{countryCode} (Malaysia)</span>
            </div>
            <div className="info-item">
              <span className="info-label">Timezone</span>
              <span className="info-value">Asia/Kuala_Lumpur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
