import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { useHistory } from '../context/HistoryContext';
import FileUpload from '../components/FileUpload';
import CoverLetterResult from '../components/CoverLetterResult';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ApiKeyModal from '../components/ApiKeyModal';
import { generateCoverLetter } from '../services/gemini';
import { WRITING_TONES, STORAGE_KEYS, DEFAULT_API_KEY } from '../utils/constants';
import { getItem, setItem, removeItem } from '../utils/storage';
import { Sparkles, Building2, Briefcase, FileText, MessageSquare, Loader2, RotateCcw } from 'lucide-react';
import './Generator.css';

export default function Generator() {
  const [formData, setFormData] = useState({
    companyName: '',
    hiringPosition: '',
    jobDescription: '',
    tone: 'professional'
  });
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [generationTime, setGenerationTime] = useState(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const { addToast } = useToast();
  const { addToHistory } = useHistory();

  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    const saved = getItem(STORAGE_KEYS.FORM_DATA);
    if (saved) {
      setFormData(saved);
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setItem(STORAGE_KEYS.FORM_DATA, newData);
    }, 500);
  };

  const handleFileSelect = (file, extractedText) => {
    setResumeFile(file);
    setResumeText(extractedText);
  };

  const clearForm = () => {
    setFormData({
      companyName: '',
      hiringPosition: '',
      jobDescription: '',
      tone: 'professional'
    });
    setResumeText('');
    setResumeFile(null);
    setResult('');
    setGenerationTime(null);
    removeItem(STORAGE_KEYS.FORM_DATA);
    addToast('Form cleared', 'info');
  };

  const handleGenerate = async () => {
    if (!resumeText) {
      addToast('Please upload your resume.', 'error');
      return;
    }
    if (!formData.companyName.trim()) {
      addToast('Please enter the company name.', 'error');
      return;
    }
    if (!formData.hiringPosition.trim()) {
      addToast('Please enter the hiring position.', 'error');
      return;
    }
    if (!formData.jobDescription.trim()) {
      addToast('Please enter the job description.', 'error');
      return;
    }

    const apiKey = getItem(STORAGE_KEYS.API_KEY) || DEFAULT_API_KEY;
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setIsGenerating(true);
    setResult('');
    setGenerationTime(null);

    try {
      const startTime = Date.now();
      const generatedLetter = await generateCoverLetter(
        apiKey,
        resumeText,
        formData.jobDescription,
        formData.companyName,
        formData.hiringPosition,
        formData.tone
      );

      const timeElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      setResult(generatedLetter);
      setGenerationTime(`${timeElapsed}s`);

      addToHistory({
        company: formData.companyName,
        position: formData.hiringPosition,
        content: generatedLetter,
        tone: formData.tone,
        generationTime: `${timeElapsed}s`,
        date: new Date().toISOString()
      });

      addToast(`Cover letter generated in ${timeElapsed}s!`, 'success');
    } catch (error) {
      addToast(error.message || 'Unable to generate cover letter. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApiKeySave = (key) => {
    if (key && key.trim()) {
      setItem(STORAGE_KEYS.API_KEY, key.trim());
      setShowApiKeyModal(false);
      addToast('API key saved!', 'success');
      setTimeout(() => handleGenerate(), 300);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isGenerating) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData, resumeText, isGenerating]);

  return (
    <div className="generator-page">
      <div className="generator-container">
        <h1 className="page-title">
          <Sparkles className="title-icon" size={32} />
          Generate Your Cover Letter
        </h1>
        <p className="page-subtitle">Fill in the details below and let AI craft the perfect cover letter for you.</p>

        <div className="form-card">
          <div className="input-group">
            <label><Building2 size={16} /> Company Name <span className="required">*</span></label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleFormChange}
              placeholder="e.g. Google"
              aria-label="Company name"
            />
          </div>

          <div className="input-group">
            <label><Briefcase size={16} /> Hiring Position <span className="required">*</span></label>
            <input
              type="text"
              name="hiringPosition"
              value={formData.hiringPosition}
              onChange={handleFormChange}
              placeholder="e.g. Frontend Engineer"
              aria-label="Hiring position"
            />
          </div>

          <div className="input-group">
            <label><FileText size={16} /> Resume <span className="required">*</span></label>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          <div className="input-group">
            <label><FileText size={16} /> Job Description <span className="required">*</span></label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleFormChange}
              placeholder="Paste the job requirements here..."
              aria-label="Job description"
            />
          </div>

          <div className="input-group">
            <label><MessageSquare size={16} /> Writing Tone</label>
            <select name="tone" value={formData.tone} onChange={handleFormChange} aria-label="Writing tone">
              {WRITING_TONES.map(t => (
                <option key={t.value} value={t.value}>{t.label} — {t.description}</option>
              ))}
            </select>
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary btn-generate"
              onClick={handleGenerate}
              disabled={isGenerating}
              aria-label="Generate cover letter"
            >
              {isGenerating ? <Loader2 className="spin" size={20} /> : <Sparkles size={20} />}
              {isGenerating ? 'Generating your cover letter...' : 'Generate Cover Letter'}
            </button>
            <button className="btn btn-outline btn-clear" onClick={clearForm} aria-label="Clear form">
              <RotateCcw size={18} />
            </button>
          </div>
          <p className="keyboard-hint">Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to generate</p>
        </div>

        <div className="result-section">
          {isGenerating ? (
            <LoadingSkeleton />
          ) : result ? (
            <CoverLetterResult
              content={result}
              generationTime={generationTime}
              onRegenerate={handleGenerate}
              companyName={formData.companyName}
              position={formData.hiringPosition}
            />
          ) : (
            <div className="empty-state">
              <Sparkles size={48} className="empty-icon" />
              <h3>Your generated cover letter will appear here</h3>
              <p>Fill out the form above and click Generate to get started</p>
            </div>
          )}
        </div>
      </div>

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={handleApiKeySave}
      />
    </div>
  );
}
