import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';
import './About.css'; 

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page fade-in">
      <Helmet>
        <title>Terms of Service - Letterly AI</title>
        <meta name="description" content="Read the Terms of Service for using Letterly AI's cover letter generation tools." />
        <link rel="canonical" href="https://letterly-ai.vercel.app/terms" />
      </Helmet>
      
      <div className="about-container">
        <h1 className="page-title">
          <FileText className="title-icon" size={32} />
          Terms of Service
        </h1>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using Letterly AI, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="about-section">
            <h2>Service Description</h2>
            <p>
              Letterly AI provides a client-side interface to generate cover letters using artificial intelligence (via the Groq API). 
              The service is provided "as is" and without warranties of any kind.
            </p>
          </section>

          <section className="about-section">
            <h2>User Responsibilities</h2>
            <p>
              You are responsible for reviewing the AI-generated cover letters before submitting them to employers. 
              Letterly AI is not responsible for any inaccuracies, hallucinations, or unfavorable outcomes resulting from the use of the generated content.
            </p>
          </section>

          <section className="about-section">
            <h2>API Key Usage</h2>
            <p>
              If you provide your own Groq API key, you are responsible for its security and any charges incurred on your Groq account. 
              We store the key only in your browser's local storage and never transmit it anywhere except directly to the Groq API.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
