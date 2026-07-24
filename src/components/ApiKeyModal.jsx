import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './ApiKeyModal.css';

const ApiKeyModal = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey('');
      setShowKey(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    onSave(apiKey);
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-card">
        <h2 className="modal-title">Enter Your Gemini API Key</h2>
        <p className="modal-description">
          Your API key is stored locally in your browser and never sent to any server other than Google.
        </p>
        
        <div className="input-group">
          <input
            ref={inputRef}
            type={showKey ? 'text' : 'password'}
            className="api-key-input"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button 
            type="button"
            className="toggle-visibility-btn"
            onClick={() => setShowKey(!showKey)}
            aria-label={showKey ? "Hide API key" : "Show API key"}
          >
            {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        <a 
          href="https://aistudio.google.com/apikey" 
          target="_blank" 
          rel="noopener noreferrer"
          className="get-key-link"
        >
          Get your free API key from Google AI Studio
        </a>
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-save" 
            onClick={handleSave}
            disabled={!apiKey.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
