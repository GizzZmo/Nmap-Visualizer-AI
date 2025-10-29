
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-lg p-4">
      <div className="container mx-auto flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div>
          <h1 className="text-2xl font-bold text-white">Nmap Visualizer AI</h1>
          <p className="text-sm text-gray-400">Interactive Network Graph & Security Analysis</p>
        </div>
      </div>
    </header>
  );
};

export default Header;