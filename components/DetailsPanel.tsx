import React from 'react';
import { NmapData } from '../types';

interface DetailsPanelProps {
  node: NmapData | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  analysisResult: string;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ node, onAnalyze, isAnalyzing, analysisResult }) => {
  if (!node) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col items-center justify-center text-gray-500 w-full md:w-1/3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-lg font-semibold">Select a Host</h3>
        <p className="text-center text-sm">Click a node on the graph to see its details and run AI analysis.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col w-full md:w-1/3 overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-semibold mb-3 text-white sticky top-0 bg-gray-800 pb-2">3. Host Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-cyan-400">{node.id}</h3>
          {node.hostname && <p className="text-sm text-gray-400">{node.hostname}</p>}
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2 uppercase ${node.status === 'up' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {node.status}
          </span>
        </div>

        <div>
          <h4 className="font-semibold text-gray-300 border-b border-gray-700 pb-1 mb-2">Open Ports</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {node.ports.length > 0 ? node.ports.map(port => (
              <div key={port.portid} className="text-sm bg-gray-700 p-3 rounded-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <div className="text-center w-14 flex-shrink-0">
                    <p className="font-bold text-lg text-cyan-400">{port.portid}</p>
                    <p className="text-xs text-gray-400 uppercase">{port.protocol}</p>
                  </div>
                  <div className="border-l border-gray-600 pl-4 min-w-0">
                    <p className="font-semibold text-white truncate" title={port.service?.name || 'Unknown Service'}>{port.service?.name || 'Unknown Service'}</p>
                    <p className="text-xs text-gray-300 truncate" title={`${port.service?.product || ''} ${port.service?.version || ''}`.trim()}>
                      {(port.service?.product || '')} {(port.service?.version || '')}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                    port.state === 'open' ? 'bg-green-600 text-green-100' : 'bg-gray-600 text-gray-100'
                  }`}>
                    {port.state}
                  </span>
                </div>
              </div>
            )) : <p className="text-sm text-gray-500">No open ports found.</p>}
          </div>
        </div>
        
        {node.os && node.os.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-300 border-b border-gray-700 pb-1 mb-2">Operating System</h4>
            <div className="text-sm bg-gray-700 p-3 rounded-md">
              {node.os.length > 1 ? (
                <ul className="space-y-2">
                  {node.os.map((os, index) => (
                    <li key={index} className="flex justify-between items-center text-gray-200">
                      <span>{os.name}</span>
                      <span className="text-xs font-medium bg-cyan-800 text-cyan-200 px-2 py-1 rounded-full">
                        {os.accuracy}% Accuracy
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex justify-between items-center text-gray-200">
                  <span>{node.os[0].name}</span>
                  <span className="text-xs font-medium bg-cyan-800 text-cyan-200 px-2 py-1 rounded-full">
                    {node.os[0].accuracy}% Accuracy
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div>
           <button 
             onClick={onAnalyze}
             disabled={isAnalyzing}
             className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition duration-200 flex items-center justify-center gap-2 disabled:bg-indigo-800 disabled:cursor-not-allowed"
           >
              {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11.983 1.904a1 1 0 00-1.212-.723l-8.5 4.25a1 1 0 00.024 1.834l4.249.956.956 4.25a1 1 0 001.834.024l4.25-8.5a1 1 0 00-.723-1.212zM12.915 9.585l-4.249-.956-.956-4.25 7.679-3.84-3.84 7.679z" />
                  </svg>
                  Analyze with AI
                </>
              )}
            </button>
        </div>

        {analysisResult && (
          <div className="mt-4">
             <h4 className="font-semibold text-gray-300 border-b border-gray-700 pb-1 mb-2">AI Security Analysis</h4>
             <div className="text-sm bg-gray-900 p-3 rounded-md prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: analysisResult.replace(/\n/g, '<br />') }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPanel;