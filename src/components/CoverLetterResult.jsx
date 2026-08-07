import React, { useState, useEffect, useRef } from 'react';
import { Copy, Download, RefreshCw, Edit3, Save, Target, MessageCircle, FileText, Type } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { exportToPDF } from '../utils/pdfExport';
import { playButtonSound, playSuccessSound } from '../utils/soundDesign';
import './CoverLetterResult.css';

const CoverLetterResult = ({ content, generationTime, onRegenerate, isLoading, companyName, position }) => {
  const { coverLetter, interviewQuestions = [], matchedKeywords = [] } = typeof content === 'string' 
    ? { coverLetter: content, interviewQuestions: [], matchedKeywords: [] }
    : content || {};

  const [activeTab, setActiveTab] = useState('letter');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(coverLetter || '');
  const [pdfTemplate, setPdfTemplate] = useState('modern');
  const [isAurebesh, setIsAurebesh] = useState(false);

  const { addToast } = useToast();
  const textareaRef = useRef(null);

  useEffect(() => {
    setEditedContent(coverLetter || '');
  }, [coverLetter]);

  const handleCopy = () => {
    playButtonSound();
    navigator.clipboard.writeText(editedContent)
      .then(() => {
        addToast('Copied to clipboard!', 'success');
      })
      .catch(() => {
        addToast('Failed to copy', 'error');
      });
  };

  const handleDownload = () => {
    playSuccessSound();
    exportToPDF(editedContent, companyName, position, pdfTemplate);
    addToast(`PDF downloaded using ${pdfTemplate} template!`, 'success');
  };

  const handleToggleEdit = () => {
    playButtonSound();
    if (isEditing) {
      setIsEditing(false);
      addToast('Changes saved locally', 'success');
    } else {
      setIsEditing(true);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const toggleAurebesh = () => {
    playButtonSound();
    setIsAurebesh(!isAurebesh);
    if (!isAurebesh) {
      addToast('Translating to Aurebesh...', 'success');
      setTimeout(() => setIsAurebesh(false), 2500);
    }
  };

  const handleTabChange = (tab) => {
    playButtonSound();
    setActiveTab(tab);
  };

  const wordCount = editedContent.trim().split(/\s+/).length;
  const charCount = editedContent.length;

  return (
    <div className="result-card fade-in">
      <div className="result-tabs">
        <button className={`tab-btn ${activeTab === 'letter' ? 'active' : ''}`} onClick={() => handleTabChange('letter')}>
          <FileText size={16} /> Cover Letter
        </button>
        {interviewQuestions.length > 0 && (
          <button className={`tab-btn ${activeTab === 'prep' ? 'active' : ''}`} onClick={() => handleTabChange('prep')}>
            <MessageCircle size={16} /> Interview Prep
          </button>
        )}
        {matchedKeywords.length > 0 && (
          <button className={`tab-btn ${activeTab === 'keywords' ? 'active' : ''}`} onClick={() => handleTabChange('keywords')}>
            <Target size={16} /> Keywords
          </button>
        )}
      </div>

      <div className="result-content-wrapper">
        {activeTab === 'letter' && (
          <>
            {isEditing ? (
              <textarea
                ref={textareaRef}
                className="edit-textarea"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <div className={`letter-text ${isAurebesh ? 'aurebesh-font' : ''}`}>{editedContent}</div>
            )}
          </>
        )}

        {activeTab === 'prep' && (
          <div className="prep-section fade-in">
            <h3>Potential Interview Questions</h3>
            <p className="prep-subtitle">Based on your resume and the job description, prepare for these:</p>
            <ul className="prep-list">
              {interviewQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="keywords-section fade-in">
            <h3>Matched ATS Keywords</h3>
            <div className="keywords-grid">
              {matchedKeywords.map((kw, i) => (
                <span key={i} className="keyword-badge">{kw}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeTab === 'letter' && (
        <div className="actions-row">
          <button className="action-btn" onClick={handleCopy} disabled={isLoading}>
            <Copy size={16} />
            <span>Copy</span>
          </button>
          
          <div className="export-group">
            <select 
              className="template-select" 
              value={pdfTemplate} 
              onChange={(e) => setPdfTemplate(e.target.value)}
              aria-label="PDF Template"
            >
              <option value="modern">Modern Template</option>
              <option value="minimalist">Minimalist Template</option>
              <option value="classic">Classic Template</option>
            </select>
            <button className="action-btn" onClick={handleDownload} disabled={isLoading}>
              <Download size={16} />
              <span>PDF</span>
            </button>
          </div>

          <button className="action-btn" onClick={() => { playButtonSound(); onRegenerate(); }} disabled={isLoading}>
            <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
            <span>Regenerate</span>
          </button>

          <button 
            className={`action-btn ${isEditing ? 'active' : ''}`} 
            onClick={handleToggleEdit}
            disabled={isLoading}
          >
            {isEditing ? (
              <>
                <Save size={16} />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit3 size={16} />
                <span>Edit</span>
              </>
            )}
          </button>

          <button className="action-btn easter-egg-btn" onClick={toggleAurebesh} title="Translate to Aurebesh">
            <Type size={16} />
          </button>
        </div>
      )}

      {activeTab === 'letter' && (
        <div className="stats-row">
          <span>{wordCount} words</span>
          <span className="separator">•</span>
          <span>{charCount} characters</span>
          {generationTime && (
            <>
              <span className="separator">•</span>
              <span>Generated in {generationTime}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CoverLetterResult;
