import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import './About.css'; 

export default function NotFound() {
  return (
    <div className="about-page fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <Helmet>
        <title>Page Not Found - Letterly AI</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <Compass size={64} style={{ color: 'var(--color-primary)', marginBottom: '24px' }} />
      <h1 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--color-text)' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px', fontSize: '18px' }}>
        We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', padding: '12px 24px' }}>
        Return to Home
      </Link>
    </div>
  );
}
