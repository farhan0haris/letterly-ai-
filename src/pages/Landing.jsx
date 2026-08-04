import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, PenTool, Download, Smartphone, Shield, Star, ChevronDown } from 'lucide-react';
import './Landing.css';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div className="feature-card" style={{ transitionDelay: `${delay}ms` }}>
    <div className="feature-icon-wrapper">
      <Icon className="feature-icon" size={24} />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

const TestimonialCard = ({ name, role, quote, initials }) => (
  <div className="testimonial-card">
    <div className="testimonial-header">
      <div className="avatar-circle">{initials}</div>
      <div className="stars">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
      </div>
    </div>
    <p className="testimonial-quote">"{quote}"</p>
    <div className="testimonial-author">
      <h4>{name}</h4>
      <span>{role}</span>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <h3>{question}</h3>
        <ChevronDown className="faq-icon" size={20} />
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default function Landing() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.feature-card');
    elements.forEach(el => {
      if (observerRef.current) {
         observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const features = [
    { icon: Sparkles, title: 'AI Powered', description: 'Leverage Groq AI with Llama 3.3 to craft personalized cover letters tailored to each job application.' },
    { icon: Target, title: 'ATS Friendly', description: 'Optimized formatting and keywords to pass Applicant Tracking Systems with ease.' },
    { icon: PenTool, title: 'Professional Writing', description: 'Choose from multiple writing tones to match your style and the company culture.' },
    { icon: Download, title: 'PDF Export', description: 'Download your cover letter as a professionally formatted PDF ready to submit.' },
    { icon: Smartphone, title: 'Responsive', description: 'Works seamlessly on desktop, tablet, and mobile devices for on-the-go access.' },
    { icon: Shield, title: 'Privacy First', description: 'Your data stays in your browser. No server storage, no tracking, complete privacy.' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Software Engineer', initials: 'SJ', quote: 'Letterly AI saved me hours of writing. The cover letters are well-structured and perfectly tailored to each job description.' },
    { name: 'Michael Chen', role: 'Marketing Manager', initials: 'MC', quote: 'The AI understands my resume perfectly and creates compelling letters that highlight my most relevant experience.' },
    { name: 'Emily Rodriguez', role: 'Recent Graduate', initials: 'ER', quote: 'As a fresh graduate, I struggled with cover letters. Letterly AI helped me present my skills professionally and land interviews.' }
  ];

  const faqs = [
    { question: 'How does Letterly AI generate cover letters?', answer: 'Letterly AI uses Groq AI to analyze your resume and the job description, then generates a personalized cover letter that highlights your most relevant skills and experience.' },
    { question: 'Is my data safe?', answer: 'Absolutely. All processing happens in your browser. Your resume and data are never stored on any server. Your API key is stored locally in your browser only.' },
    { question: 'What file formats are supported?', answer: 'Letterly AI supports PDF, DOCX, and TXT resume formats. We recommend PDF for best results.' },
    { question: 'Can I edit the generated cover letter?', answer: 'Yes! You can edit the generated cover letter directly in the app, then download the edited version as a PDF.' },
    { question: 'Do I need an API key?', answer: 'No! Letterly AI works out of the box with a built-in API key. Advanced users can optionally provide their own Groq API key.' }
  ];

  const handleScrollToFeatures = (e) => {
    e.preventDefault();
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <section className="hero-section fade-in">
        <div className="hero-decor decor-1"></div>
        <div className="hero-decor decor-2"></div>
        <div className="hero-content">
          <h1 className="hero-heading">
            Write Better Cover Letters with <span className="gradient-text">AI</span>
          </h1>
          <p className="hero-subheading">
            Upload your resume, paste the job description, and let AI create a personalized ATS-friendly cover letter in seconds.
          </p>
          <div className="hero-buttons">
            <Link to="/generator" className="btn btn-primary btn-lg">Get Started</Link>
            <a href="#features" onClick={handleScrollToFeatures} className="btn btn-outline btn-lg">Learn More</a>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Letterly AI?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What People Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((test, index) => (
              <TestimonialCard key={index} {...test} />
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
