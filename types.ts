
export interface Port {
  protocol: string;
  portid: string;
  state: string;
  service?: {
    name: string;
    product?: string;
    version?: string;
  };
}

export interface OsMatch {
  name: string;
  accuracy: string;
}

export interface NmapData {
  id: string; // ip address
  hostname?: string;
  status: string;
  ports: Port[];
  os?: OsMatch[];
}

export interface CytoscapeElement {
  data: {
    id: string;
    label?: string; // Optional for edges
    nmapData?: NmapData;
    type?: 'host' | 'scanner';
    source?: string; // For edges
    target?: string; // For edges
  };
}

export type Layout = 'grid' | 'circle' | 'cose' | 'breadthfirst';

export type HostStatus = 'idle' | 'scanning' | 'success' | 'error';
