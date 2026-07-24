import React, { useState, useEffect, useRef } from 'react';
import { Copy, Download, RefreshCw, Edit3, Save } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { exportToPDF } from '../utils/pdfExport';
import './CoverLetterResult.css';

const CoverLetterResult = ({ content, generationTime, onRegenerate, isLoading, companyName, position }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { addToast } = useToast();
  const textareaRef = useRef(null);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent)
      .then(() => {
        addToast('Copied to clipboard!', 'success');
      })
      .catch(() => {
        addToast('Failed to copy', 'error');
      });
  };

  const handleDownload = () => {
    exportToPDF(editedContent, companyName, position);
    addToast('PDF downloaded!', 'success');
  };

  const handleToggleEdit = () => {
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

  const wordCount = editedContent.trim().split(/\s+/).length;
  const charCount = editedContent.length;

  return (
    <div className="result-card fade-in">
      <div className="result-content-wrapper">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="edit-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <div className="letter-text">{editedContent}</div>
        )}
      </div>

      <div className="actions-row">
        <button className="action-btn" onClick={handleCopy} disabled={isLoading}>
          <Copy size={16} />
          <span>Copy</span>
        </button>
        <button className="action-btn" onClick={handleDownload} disabled={isLoading}>
          <Download size={16} />
          <span>Download PDF</span>
        </button>
        <button className="action-btn" onClick={onRegenerate} disabled={isLoading}>
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
      </div>

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
    </div>
  );
};

export default CoverLetterResult;
