import React from 'react';
import { Sparkles, Code, Palette, BrainCircuit, Download, Shield, Mail, User, HeartHandshake } from 'lucide-react';
import './About.css';

const InstagramSvg = ({ size = 22, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TechCard = ({ icon: Icon, title, description }) => (
  <div className="tech-card">
    <div className="tech-icon-wrapper">
      <Icon className="tech-icon" size={24} />
    </div>
    <div className="tech-content">
      <h3 className="tech-title">{title}</h3>
      <p className="tech-description">{description}</p>
    </div>
  </div>
);

export default function About() {
  const technologies = [
    { icon: Sparkles, title: 'Google Gemini AI', description: 'Advanced AI model for natural language generation and understanding.' },
    { icon: Code, title: 'React + Vite', description: 'Modern frontend framework with lightning-fast build tool.' },
    { icon: Palette, title: 'Star Wars Modern Theme', description: 'Galactic professional UI with responsive light & dark mode support.' },
    { icon: BrainCircuit, title: 'Prompt Engineering', description: 'Carefully crafted prompts to generate high-quality cover letters.' },
    { icon: Download, title: 'PDF Export', description: 'Professional PDF generation with proper formatting and layout.' },
    { icon: Shield, title: 'Privacy Focused', description: 'All data stays in your browser with no server-side storage.' }
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        
        <section className="about-section">
          <h1 className="page-title">
            <Sparkles size={32} className="title-icon" />
            About Letterly AI
          </h1>
          <div className="content-card">
            <p className="about-description">
              Letterly AI is an intelligent cover letter generator that leverages Google Gemini AI to create personalized, ATS-friendly cover letters. Simply upload your resume, paste the job description, and let AI do the heavy lifting.
            </p>
            <p className="about-note">
              Designed and developed with a focus on practical AI application, responsive frontend architecture, and modern UX design principles.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-heading">Technology Stack</h2>
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <TechCard key={index} {...tech} />
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-heading">
            <User size={24} className="heading-icon" />
            Developer & Feedback
          </h2>
          <div className="dev-card">
            <div className="dev-header">
              <div className="dev-avatar-glow">FH</div>
              <div>
                <h3 className="dev-name">Farhan Haris</h3>
                <span className="dev-role">Full-Stack Developer</span>
              </div>
            </div>

            <div className="dev-feedback-box">
              <p className="feedback-title">
                <HeartHandshake size={20} /> Have Feedback or Need Help?
              </p>
              <p className="feedback-text">
                If you have any suggestions, feature requests, or need assistance using Letterly AI, feel free to reach out to me!
              </p>
            </div>

            <div className="dev-contact-grid">
              <a href="mailto:farhanharis100@gmail.com" className="contact-card">
                <div className="contact-icon email-icon">
                  <Mail size={22} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">farhanharis100@gmail.com</span>
                </div>
              </a>

              <a href="https://instagram.com/_farhan.haris" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon insta-icon">
                  <InstagramSvg size={22} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">@_farhan.haris</span>
                </div>
              </a>
            </div>

            <div className="dev-note">
              <p>Designed and built with passion to make career tools accessible, intelligent, and elegant.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-heading">Application Info</h2>
          <div className="project-card">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Application</span>
                <span className="info-value">Letterly AI — Cover Letter Generator</span>
              </div>
              <div className="info-item">
                <span className="info-label">AI Model</span>
                <span className="info-value">Google Gemini AI</span>
              </div>
              <div className="info-item">
                <span className="info-label">Architecture</span>
                <span className="info-value">Client-side Single Page Application</span>
              </div>
              <div className="info-item">
                <span className="info-label">Data Privacy</span>
                <span className="info-value">100% Local Browser Storage</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
