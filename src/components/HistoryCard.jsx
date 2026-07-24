import React from 'react';
import { Eye, Copy, Trash2 } from 'lucide-react';
import './HistoryCard.css';

const HistoryCard = ({ item, onDelete, onCopy, onOpen }) => {
  const { company, position, date, content, tone } = item;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const previewText = content.length > 150 ? content.substring(0, 150) + '...' : content;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this cover letter?')) {
      onDelete(item.id);
    }
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    onCopy(content);
  };

  return (
    <div className="history-card" onClick={() => onOpen(item)}>
      <div className="history-header">
        <h3 className="company-name">{company || 'Unknown Company'}</h3>
        <span className="history-date">{formattedDate}</span>
      </div>
      
      <div className="position-title">{position || 'Position Not Specified'}</div>
      
      <div className="history-preview">{previewText}</div>
      
      {tone && (
        <div className="tone-badge-container">
          <span className="tone-badge">{tone}</span>
        </div>
      )}
      
      <div className="history-actions">
        <button 
          className="history-action-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onOpen(item);
          }}
          title="Open"
        >
          <Eye size={16} />
          <span className="desktop-text">Open</span>
        </button>
        <button 
          className="history-action-btn" 
          onClick={handleCopy}
          title="Copy"
        >
          <Copy size={16} />
          <span className="desktop-text">Copy</span>
        </button>
        <button 
          className="history-action-btn delete-btn" 
          onClick={handleDelete}
          title="Delete"
        >
          <Trash2 size={16} />
          <span className="desktop-text">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
