
import { GoogleGenAI } from "@google/genai";
import { NmapData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. AI analysis will not be available.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeHostWithAI(hostData: NmapData): Promise<string> {
  if (!API_KEY) {
      return "AI analysis is unavailable because the API key is not configured.";
  }

  const model = "gemini-2.5-flash";

  const openPorts = hostData.ports.map(p => 
    `- Port ${p.portid}/${p.protocol}: ${p.service?.name || 'unknown'} ${p.service?.product || ''} ${p.service?.version || ''}`.trim()
  ).join('\n');

  const osInfo = hostData.os && hostData.os.length > 0 
    ? hostData.os.map(o => `${o.name} (Accuracy: ${o.accuracy}%)`).join(', ') 
    : 'Not detected';

  const prompt = `
You are a senior cybersecurity analyst. Your task is to provide a brief, actionable security assessment based on the following Nmap scan data.

**Host Information:**
- **IP Address:** ${hostData.id}
- **Hostname:** ${hostData.hostname || 'N/A'}
- **Detected OS:** ${osInfo}
- **Open Ports & Services:**
${openPorts || '  - None detected'}

**Your Analysis:**
Based on the data provided, please perform the following:
1.  **Identify Potential Vulnerabilities:** Briefly list the top 2-3 potential security risks. For each risk, mention the port/service and the nature of the vulnerability (e.g., outdated software, weak configuration, sensitive service exposure).
2.  **Suggest Remediation Steps:** For each identified risk, provide a concise, practical recommendation for mitigation.
3.  **Provide a General Security Posture:** Give a one-sentence summary of the host's security posture (e.g., "appears hardened," "has several areas for improvement," "presents significant risk").

Format your response clearly using markdown for readability. Be professional and direct. Do not include any preamble or sign-off.
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            return "Error: The provided API Key is invalid. Please check your configuration.";
        }
        return `An error occurred during AI analysis: ${error.message}`;
    }
    return "An unknown error occurred during AI analysis.";
  }
}