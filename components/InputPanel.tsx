
import React from 'react';
import { Layout, HostStatus } from '../types';

interface InputPanelProps {
  xmlText: string;
  setXmlText: (text: string) => void;
  onVisualize: () => void;
  layoutName: Layout;
  setLayoutName: (layout: Layout) => void;
  error: string;
  hostStatus: HostStatus;
}

const InputPanel: React.FC<InputPanelProps> = ({ xmlText, setXmlText, onVisualize, layoutName, setLayoutName, error, hostStatus }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-white">1. Input & Controls</h2>
      <p className="text-sm text-gray-400 mb-4">Paste your Nmap XML output below. You can generate it using `nmap -oX your-scan.xml ...`.</p>
      
      <textarea
        className="w-full flex-grow bg-gray-900 border border-gray-700 rounded-md p-3 text-xs text-gray-300 font-mono focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none"
        value={xmlText}
        onChange={(e) => setXmlText(e.target.value)}
        placeholder="Paste Nmap XML here..."
        rows={15}
      />
      <div className="mt-2 min-h-[20px]">
        {hostStatus === 'error' && error && <p className="text-sm text-red-400">{error}</p>}
        {hostStatus === 'scanning' && <p className="text-sm text-yellow-400">Scanning...</p>}
        {hostStatus === 'success' && <p className="text-sm text-green-400">Success</p>}
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <label htmlFor="layout-select" className="block text-sm font-medium text-gray-300 mb-1">Layout Style</label>
          <select 
            id="layout-select"
            value={layoutName} 
            onChange={(e) => setLayoutName(e.target.value as Layout)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="cose">Smart Organic</option>
            <option value="breadthfirst">Tree</option>
            <option value="circle">Circle</option>
            <option value="grid">Grid</option>
          </select>
        </div>
        <div className="flex-shrink-0 self-end sm:self-auto">
          <button
            onClick={onVisualize}
            className="w-full h-full px-6 py-2 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
