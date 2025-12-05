import React, { useState, useEffect } from 'react';
import { FiSend, FiRefreshCw, FiCheck, FiAlertCircle, FiInfo, FiUsers } from 'react-icons/fi';
import './SendSMS.css';

const SendSMS = ({ apiKey: propApiKey }) => {
  const [formData, setFormData] = useState({
    phone: '',
    message: '',
    apiKey: propApiKey || 'textbelt'
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sync API key from props or localStorage
    const storedApiKey = localStorage.getItem('textbelt_api_key');
    const keyToUse = propApiKey || storedApiKey || 'textbelt';
    setFormData(prev => ({ ...prev, apiKey: keyToUse }));
  }, [propApiKey]);

  const MAX_CHARS = 160;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData(prev => ({
      phone: '',
      message: '',
      apiKey: prev.apiKey
    }));
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Get country code from settings or default to +60
      const countryCode = localStorage.getItem('country_code') || '+60';
      const fullPhone = `${countryCode}${formData.phone}`;
      
      const response = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: fullPhone,
          message: formData.message,
          key: formData.apiKey,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const timestamp = new Date().toLocaleString('en-MY', { 
          timeZone: 'Asia/Kuala_Lumpur',
          dateStyle: 'medium',
          timeStyle: 'short'
        });
        setStatus({
          type: 'success',
          message: `SMS sent successfully at ${timestamp}! Text ID: ${data.textId}. Quota remaining: ${data.quotaRemaining}`
        });
        // Clear message after successful send
        setFormData(prev => ({ ...prev, message: '' }));
      } else {
        setStatus({
          type: 'error',
          message: `Failed to send SMS: ${data.error || 'Unknown error'}`
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Error: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const charCount = formData.message.length;
  const charCountClass = charCount > MAX_CHARS ? 'error' : charCount > MAX_CHARS * 0.9 ? 'warning' : '';

  return (
    <div className="send-sms">
      <div className="send-sms-header">
        <h2>📱 Hantar SMS</h2>
        <p>Hantar mesej teks ke mana-mana nombor telefon menggunakan Textbelt API</p>
      </div>

      {status.message && (
        <div className={`alert alert-${status.type}`}>
          {status.type === 'success' && <FiCheck size={20} />}
          {status.type === 'error' && <FiAlertCircle size={20} />}
          {status.type === 'info' && <FiInfo size={20} />}
          <span>{status.message}</span>
        </div>
      )}

      <form className="sms-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Nombor Telefon</label>
          <div className="phone-input-wrapper">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="phone-number-full"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0123456789"
              required
            />
            <button 
              type="button" 
              className="contact-icon-btn"
              title="Pilih dari Contact"
            >
              <FiUsers />
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Mesej</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Taip mesej anda di sini..."
            required
            maxLength={320}
          />
          <div className={`char-count ${charCountClass}`}>
            {charCount} / {MAX_CHARS} characters
            {charCount > MAX_CHARS && ` (${Math.ceil(charCount / MAX_CHARS)} messages)`}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <FiRefreshCw className="spinning" /> Sending...
              </>
            ) : (
              <>
                <FiSend /> Hantar SMS
              </>
            )}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            <FiRefreshCw /> Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendSMS;
