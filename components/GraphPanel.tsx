
import React, { useEffect, useRef } from 'react';
import Cytoscape from 'cytoscape';
import { NmapData, CytoscapeElement, Layout } from '../types';

// We must declare cytoscape as it's loaded from a CDN
declare const cytoscape: any;

interface GraphPanelProps {
  graphData: CytoscapeElement[];
  layoutName: Layout;
  onNodeClick: (nodeData: NmapData) => void;
  selectedNodeId?: string;
}

const GraphPanel: React.FC<GraphPanelProps> = ({ graphData, layoutName, onNodeClick, selectedNodeId }) => {
  const cyRef = useRef<Cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: graphData,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4A5568', // gray-700
            'label': 'data(label)',
            'color': '#E2E8F0', // gray-300
            'font-size': '12px',
            'text-valign': 'bottom',
            'text-halign': 'center',
            'text-margin-y': '5px',
            'border-width': '2px',
            'border-color': '#2D3748' // gray-800
          },
        },
        {
            selector: 'node[type="scanner"]',
            style: {
                'background-color': '#2B6CB0', // blue-700
                'shape': 'diamond'
            }
        },
        {
          selector: 'node:selected',
          style: {
            'border-color': '#38B2AC', // teal-400
            'border-width': '4px',
          },
        },
        {
            selector: `node[id="${selectedNodeId}"]`,
            style: {
              'border-color': '#38B2AC', // teal-400
              'border-width': '4px',
              'box-shadow': '0 0 10px #38B2AC'
            }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#4A5568', // gray-600
            'target-arrow-color': '#4A5568',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],
      layout: { name: 'grid' } // Initial layout
    });

    cyRef.current.on('tap', 'node', (event) => {
      const node = event.target;
      const nmapData = node.data('nmapData');
      if (nmapData) {
        onNodeClick(nmapData);
      }
    });

    return () => {
      cyRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cyRef.current) {
        cyRef.current.elements().remove();
        cyRef.current.add(graphData);
        cyRef.current.layout({ 
            name: layoutName, 
            animate: true,
            padding: 30,
            nodeDimensionsIncludeLabels: true
        }).run();
    }
  }, [graphData, layoutName]);

  useEffect(() => {
    if (cyRef.current) {
        cyRef.current.nodes().unselect();
        if (selectedNodeId) {
            cyRef.current.getElementById(selectedNodeId).select();
        }
    }
  }, [selectedNodeId]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-4 flex-grow flex flex-col w-full md:w-2/3">
      <h2 className="text-xl font-semibold mb-3 text-white">2. Network Graph</h2>
      {graphData.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          <p>Graph will be displayed here after visualization.</p>
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-full min-h-[300px] lg:min-h-0 flex-grow rounded-md bg-gray-900" />
      )}
    </div>
  );
};

export default GraphPanel;