
import React, { useState, useCallback, useEffect } from 'react';
import { NmapData, CytoscapeElement, Layout, HostStatus } from './types';
import { parseNmapXml } from './services/nmapParser';
import { analyzeHostWithAI } from './services/geminiService';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import GraphPanel from './components/GraphPanel';
import DetailsPanel from './components/DetailsPanel';
import { INITIAL_XML_DATA } from './constants';

export default function App() {
  const [xmlText, setXmlText] = useState<string>(INITIAL_XML_DATA);
  const [graphData, setGraphData] = useState<CytoscapeElement[]>([]);
  const [selectedNode, setSelectedNode] = useState<NmapData | null>(null);
  const [layoutName, setLayoutName] = useState<Layout>('cose');
  const [error, setError] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [hostStatus, setHostStatus] = useState<HostStatus>('idle');

  useEffect(() => {
    if (isAnalyzing) {
      setHostStatus('scanning');
    } else if (error) {
      setHostStatus('error');
    } else if (graphData.length > 0) {
      setHostStatus('success');
    } else {
      setHostStatus('idle');
    }
  }, [isAnalyzing, error, graphData]);

  const handleVisualize = useCallback(() => {
    setError('');
    setSelectedNode(null);
    setAnalysisResult('');
    if (!xmlText.trim()) {
      setError('XML input cannot be empty.');
      setGraphData([]);
      return;
    }
    try {
      const { elements, nodes } = parseNmapXml(xmlText);
      if (elements.length === 0 || nodes.length === 0) {
        setError('Could not find any hosts in the provided Nmap data. Please check the XML format.');
        setGraphData([]);
      } else {
        setGraphData(elements);
      }
    } catch (e) {
      console.error(e);
      setError('Failed to parse XML. Please ensure it is valid Nmap XML output.');
      setGraphData([]);
    }
  }, [xmlText]);

  const handleNodeClick = useCallback((nodeData: NmapData) => {
    setSelectedNode(nodeData);
    setAnalysisResult('');
  }, []);

  const handleAnalyze = async () => {
    if (!selectedNode) return;
    setIsAnalyzing(true);
    setAnalysisResult('');
    try {
      const result = await analyzeHostWithAI(selectedNode);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setAnalysisResult('An error occurred while analyzing the host. Please check the console.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
        <div className="lg:w-1/3 xl:w-1/4 flex flex-col gap-4">
          <InputPanel
            xmlText={xmlText}
            setXmlText={setXmlText}
            onVisualize={handleVisualize}
            layoutName={layoutName}
            setLayoutName={setLayoutName}
            error={error}
            hostStatus={hostStatus}
          />
        </div>
        <div className="flex-grow lg:w-2/3 xl:w-3/4 flex flex-col md:flex-row gap-4">
          <GraphPanel 
            graphData={graphData} 
            layoutName={layoutName} 
            onNodeClick={handleNodeClick}
            selectedNodeId={selectedNode?.id}
          />
          <DetailsPanel 
            node={selectedNode} 
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            analysisResult={analysisResult}
          />
        </div>
      </main>
    </div>
  );
}
