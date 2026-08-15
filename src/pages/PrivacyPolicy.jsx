import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield } from 'lucide-react';
import './About.css'; // Reusing about css for typography

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page fade-in">
      <Helmet>
        <title>Privacy Policy - Letterly AI</title>
        <meta name="description" content="Learn how Letterly AI protects your data. We process your resume securely and never store your personal information on our servers." />
        <link rel="canonical" href="https://letterly-ai.vercel.app/privacy" />
      </Helmet>
      
      <div className="about-container">
        <h1 className="page-title">
          <Shield className="title-icon" size={32} />
          Privacy Policy
        </h1>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Your Data is Yours</h2>
            <p>
              At Letterly AI, we believe in privacy by design. Because our application operates heavily on the client side, <strong>we do not store your resumes, cover letters, or personal information on our servers.</strong>
            </p>
          </section>

          <section className="about-section">
            <h2>How We Use Your Data</h2>
            <p>
              When you generate a cover letter, your resume text and job description are sent securely to the <strong>Groq API</strong> to generate the content. 
              Once the API returns the result, it is stored only locally in your browser's `localStorage` so you can view your history.
            </p>
            <ul>
              <li><strong>No Databases:</strong> We do not have a database of our users.</li>
              <li><strong>No Tracking:</strong> We do not use invasive third-party tracking scripts.</li>
              <li><strong>API Keys:</strong> If you provide your own API key, it is kept strictly in your local browser storage.</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Third-Party Services</h2>
            <p>
              We utilize the following third-party services to make Letterly AI work:
            </p>
            <ul>
              <li><strong>Groq:</strong> Used to generate the AI cover letters. <a href="https://groq.com/privacy" target="_blank" rel="noopener noreferrer">Read their privacy policy</a>.</li>
              <li><strong>AllOrigins:</strong> Used as a proxy to extract text from job URLs you provide.</li>
              <li><strong>Vercel:</strong> Used to host the application.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
