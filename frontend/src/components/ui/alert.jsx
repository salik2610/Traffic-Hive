import React from 'react';

export const Alert = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-lg ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = '', ...props }) => {
  return (
    <h5
      className={`text-lg font-semibold mb-2 ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
};

export const AlertDescription = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`text-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}; 