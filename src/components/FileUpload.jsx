import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, X, File as FileIcon } from 'lucide-react';
import { parseResume } from '../services/resumeParser';
import './FileUpload.css';

const FileUpload = ({ onFileSelect, acceptedTypes = '.pdf,.docx,.txt' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;
    
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > 10) {
      setError('File size must be less than 10MB');
      return false;
    }
    
    const ext = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    const acceptedArr = acceptedTypes.split(',');
    
    if (!acceptedArr.includes(ext)) {
      setError(`Invalid file type. Accepted types: ${acceptedTypes}`);
      return false;
    }
    
    setError('');
    return true;
  };

  const processFile = async (selectedFile) => {
    if (!validateFile(selectedFile)) return;
    
    setFile(selectedFile);
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const extractedText = await parseResume(selectedFile);
      setProgress(100);
      clearInterval(interval);
      
      setTimeout(() => {
        setIsProcessing(false);
        if (onFileSelect) {
          onFileSelect(selectedFile, extractedText);
        }
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setIsProcessing(false);
      setFile(null);
      setError(err.message || 'Error processing file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    setProgress(0);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="file-upload-wrapper">
      <div 
        className={`file-upload-zone ${isDragging ? 'drag-active' : ''} ${file && !error ? 'file-selected' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept={acceptedTypes}
          onChange={handleChange}
        />
        
        {!file && !isProcessing && (
          <div className="file-upload-content">
            <UploadCloud className="upload-icon" />
            <h3 className="upload-main-text">Drag & drop your resume here</h3>
            <p className="upload-sub-text">or click to browse</p>
            <span className="upload-formats">Supported formats: {acceptedTypes.replace(/,/g, ', ')} (Max 10MB)</span>
          </div>
        )}

        {file && !isProcessing && !error && (
          <div className="file-success-content">
            <div className="file-info">
              <CheckCircle className="success-icon" />
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>
            <button className="remove-btn" onClick={handleRemove} aria-label="Remove file">
              <X size={18} />
            </button>
          </div>
        )}

        {isProcessing && (
          <div className="file-processing-content">
            <FileIcon className="processing-icon" />
            <span className="processing-text">Analyzing your resume...</span>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
      </div>
      {error && <div className="file-error-message">{error}</div>}
    </div>
  );
};

export default FileUpload;
