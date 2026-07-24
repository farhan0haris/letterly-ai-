import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from '../context/HistoryContext';
import { useToast } from '../context/ToastContext';
import HistoryCard from '../components/HistoryCard';
import { exportToPDF } from '../utils/pdfExport';
import { History as HistoryIcon, Search, FileText, X, Copy, Download } from 'lucide-react';
import './History.css';

export default function History() {
  const { history, deleteFromHistory } = useHistory();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);

  const filteredHistory = useMemo(() => {
    if (!history) return [];
    if (!searchQuery) return history;
    const lowerQuery = searchQuery.toLowerCase();
    return history.filter(item => 
      item.company.toLowerCase().includes(lowerQuery) || 
      item.position.toLowerCase().includes(lowerQuery)
    );
  }, [history, searchQuery]);

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    addToast('Copied to clipboard!', 'success');
  };

  const handleDelete = (id) => {
    deleteFromHistory(id);
    addToast('Cover letter deleted', 'success');
  };

  const handleDownloadPDF = (letter) => {
    exportToPDF(letter.content, letter.company, letter.position);
    addToast('PDF downloaded successfully', 'success');
  };

  return (
    <div className="history-page">
      <div className="history-container">
        <div className="history-header">
          <div>
            <h1 className="page-title">
              <HistoryIcon className="title-icon" size={32} />
              Your Cover Letters
              <span className="count-badge">{history ? history.length : 0} cover letters</span>
            </h1>
            <p className="page-subtitle">View and manage your previously generated cover letters.</p>
          </div>
        </div>

        {history && history.length > 0 ? (
          <>
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search by company or position..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="history-grid">
              {filteredHistory.length > 0 ? (
                filteredHistory.map(item => (
                  <HistoryCard 
                    key={item.id} 
                    item={item} 
                    onOpen={() => setSelectedLetter(item)} 
                    onDelete={() => handleDelete(item.id)}
                    onCopy={handleCopy}
                  />
                ))
              ) : (
                <div className="empty-search-state">
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="history-empty-state">
            <FileText size={64} className="empty-icon" />
            <h2>No cover letters yet</h2>
            <p>Generate your first cover letter to see it here.</p>
            <Link to="/generator" className="btn btn-primary mt-4">Generate Now</Link>
          </div>
        )}
      </div>

      {selectedLetter && (
        <div className="modal-overlay" onClick={() => setSelectedLetter(null)}>
          <div className="modal-content full-view-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedLetter.company} - {selectedLetter.position}</h2>
              <button className="close-btn" onClick={() => setSelectedLetter(null)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <pre className="letter-content-full">{selectedLetter.content}</pre>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => handleCopy(selectedLetter.content)}>
                <Copy size={16} className="mr-2" /> Copy
              </button>
              <button className="btn btn-primary" onClick={() => handleDownloadPDF(selectedLetter)}>
                <Download size={16} className="mr-2" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
