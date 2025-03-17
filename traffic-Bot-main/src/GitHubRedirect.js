import React from 'react';
import githubLogo from './github-logo.png'; // Adjust the path if necessary
import './GitHubRedirect.css'; // Optional: Add custom styling

const GitHubRedirect = () => {
  const handleRedirect = () => {
    window.open('https://github.com/Samarth-Codes', '_blank'); // Replace with your actual GitHub repository URL
  };

  return (
    <div className="github-redirect" onClick={handleRedirect}>
      <img src={githubLogo} alt="GitHub Logo" className="github-logo" />
    </div>
  );
};

export default GitHubRedirect;

