import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Sparkles, Target, PenTool, Download, Smartphone, Shield, Star, ChevronDown } from 'lucide-react';
import './Landing.css';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div className="feature-card reveal-on-scroll" style={{ transitionDelay: `${delay}ms` }}>
    <div className="feature-icon-wrapper">
      <Icon className="feature-icon" size={24} />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

const TestimonialCard = ({ name, role, quote, initials, delay }) => (
  <div className="testimonial-card reveal-on-scroll" style={{ transitionDelay: `${delay}ms` }}>
    <div className="testimonial-header">
      <div className="avatar-circle">{initials}</div>
      <div className="stars">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
      </div>
    </div>
    <p className="testimonial-quote">"{quote}"</p>
    <div className="testimonial-author">
      <h3>{name}</h3>
      <span>{role}</span>
    </div>
  </div>
);

const FAQItem = ({ question, answer, delay }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item reveal-on-scroll ${isOpen ? 'open' : ''}`} style={{ transitionDelay: `${delay}ms` }} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <h3>{question}</h3>
        <ChevronDown className="faq-icon" size={20} />
      </div>
      <div className="faq-answer">
        <div className="faq-answer-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function Landing() {
  const observerRef = useRef(null);
  const today = new Date();
  const isMay4th = today.getMonth() === 4 && today.getDate() === 4;

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { 
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Letterly AI",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Generate perfectly tailored, ATS-friendly cover letters in seconds by matching your resume to the job description."
  };

  return (
    <div className="landing-page">
      <Helmet>
        <title>Letterly AI - Generate Perfect Cover Letters with AI</title>
        <meta name="description" content="Use Letterly AI to generate perfectly tailored, ATS-friendly cover letters in seconds. Land your dream job effortlessly." />
        <link rel="canonical" href="https://letterly-ai.vercel.app/" />
        <meta property="og:title" content="Letterly AI - Generate Perfect Cover Letters with AI" />
        <meta property="og:description" content="Generate perfectly tailored, ATS-friendly cover letters in seconds." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <section className="hero-section fade-in">
        <div className="hero-decor decor-1"></div>
        <div className="hero-decor decor-2"></div>
        <div className="hero-decor decor-3"></div>

        <div className="hero-container">
          {/* Left Column: Rich Content, CTA & Trust Highlights */}
          <div className="hero-content">
            <div className="hero-pill-badge">
              <span className="badge-glow-dot"></span>
              <span>Next-Gen AI Cover Letter Builder</span>
              <span className="badge-sparkle">✦</span>
            </div>

            <h1 className="hero-heading">
              Write Better Cover Letters with <span className="gradient-text">AI</span>
            </h1>

            <p className="hero-subheading">
              Upload your resume, paste the job description, and let Groq-powered AI craft a tailored, ATS-friendly cover letter in seconds.
              {isMay4th && (
                <span className="may-4th-text"> May the Force be with your career.</span>
              )}
            </p>

            <div className="hero-buttons">
              <Link to="/generator" className="btn btn-primary btn-lg">
                <Sparkles size={18} /> Get Started Free
              </Link>
              <a href="#features" onClick={handleScrollToFeatures} className="btn btn-outline btn-lg">
                Explore Features
              </a>
            </div>

            {/* Left-Side Trust & Metric Highlights */}
            <div className="hero-trust-row">
              <div className="trust-item">
                <div className="trust-icon-box">⚡</div>
                <div className="trust-text-group">
                  <strong>3-Second</strong>
                  <span>Instant Output</span>
                </div>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <div className="trust-icon-box">🎯</div>
                <div className="trust-text-group">
                  <strong>99% ATS</strong>
                  <span>Pass Rate</span>
                </div>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <div className="trust-icon-box">🔒</div>
                <div className="trust-text-group">
                  <strong>100% Private</strong>
                  <span>Zero Server Storage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Smooth 3D Holographic AI & Orbital Scene */}
          <div className="hero-3d-scene" aria-hidden="true">
            <div className="orbit-system">
              <div className="orbit-ring ring-1"></div>
              <div className="orbit-ring ring-2"></div>
              <div className="orbit-ring ring-3"></div>
              <div className="orbit-glow-core"></div>
            </div>

            <div className="holo-card">
              <div className="holo-card-inner">
                <div className="holo-scan-beam"></div>
                
                <div className="holo-header">
                  <div className="holo-badge">
                    <span className="holo-dot"></span>
                    <span className="holo-badge-text">ATS MATCH: 99%</span>
                  </div>
                  <span className="holo-ai-tag">GROQ LLAMA 3.3</span>
                </div>

                <div className="holo-content">
                  <div className="holo-line line-title"></div>
                  <div className="holo-line line-sub"></div>
                  <div className="holo-spacer"></div>
                  <div className="holo-line line-full"></div>
                  <div className="holo-line line-long"></div>
                  <div className="holo-line line-med"></div>
                  <div className="holo-line line-short"></div>
                </div>

                <div className="holo-footer">
                  <div className="holo-pill">
                    <span className="holo-check">✓</span>
                    <span>Skills Aligned</span>
                  </div>
                  <div className="holo-pill">
                    <span className="holo-check">✓</span>
                    <span>Tailored Pitch</span>
                  </div>
                </div>
              </div>

              <div className="floating-satellite sat-top">
                <Sparkles size={14} className="sat-icon" />
                <span>AI Optimized</span>
              </div>
              <div className="floating-satellite sat-bottom">
                <Target size={14} className="sat-icon" />
                <span>ATS Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title reveal-on-scroll">Why Choose Letterly AI?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title reveal-on-scroll">What People Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((test, index) => (
              <TestimonialCard key={index} {...test} delay={index * 120} />
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2 className="section-title reveal-on-scroll">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} delay={index * 80} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
