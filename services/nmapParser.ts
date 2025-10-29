import { xml2js } from 'xml-js';
import { CytoscapeElement, NmapData, Port, OsMatch } from '../types';

function toArray<T,>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export const parseNmapXml = (xmlText: string): { elements: CytoscapeElement[], nodes: NmapData[] } => {
  const result: any = xml2js(xmlText, { compact: true, spaces: 2 });

  if (!result.nmaprun) {
    throw new Error('Invalid Nmap XML: missing <nmaprun> root element.');
  }

  const hosts = toArray(result.nmaprun.host);
  const elements: CytoscapeElement[] = [];
  const nmapNodes: NmapData[] = [];
  
  if (hosts.length === 0) {
    return { elements, nodes: nmapNodes };
  }

  // Add the central "scanner" node
  elements.push({
    data: { id: 'scanner', label: 'Scanner', type: 'scanner' },
  });

  hosts.forEach((host: any) => {
    if (host.status._attributes.state !== 'up') return;

    const address = host.address._attributes.addr;
    const hostname = toArray(host.hostnames?.hostname)[0]?._attributes.name;

    const ports: Port[] = toArray(host.ports?.port).map((p: any) => ({
      protocol: p._attributes.protocol,
      portid: p._attributes.portid,
      state: p.state._attributes.state,
      service: p.service ? {
        name: p.service._attributes.name,
        product: p.service._attributes.product,
        version: p.service._attributes.version,
      } : undefined,
    }));
    
    const osMatches: OsMatch[] = toArray(host.os?.osmatch).map((o: any) => ({
      name: o._attributes.name,
      accuracy: o._attributes.accuracy,
    }));

    const nodeData: NmapData = {
      id: address,
      hostname: hostname,
      status: host.status._attributes.state,
      ports: ports.filter(p => p.state === 'open'),
      os: osMatches,
    };

    nmapNodes.push(nodeData);

    elements.push({
      data: {
        id: address,
        label: hostname || address,
        nmapData: nodeData,
        type: 'host'
      },
    });

    // Add an edge from the scanner to the host
    elements.push({
      data: {
        id: `edge-${address}`,
        source: 'scanner',
        target: address,
      },
    });
  });

  return { elements, nodes: nmapNodes };
};