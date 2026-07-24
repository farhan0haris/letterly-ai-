import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = () => {
  const widths = ['100%', '90%', '95%', '80%', '85%', '70%', '95%', '60%'];

  return (
    <div className="skeleton-container">
      {widths.map((width, index) => (
        <div 
          key={index} 
          className="skeleton-line" 
          style={{ width }} 
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
