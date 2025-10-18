import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import ChatInterface from './ChatInterface';
import { Info, Download, X } from 'lucide-react';
import { generateAnalysisPDF } from '@/lib/pdfGenerator';

interface DataAnalysisCardProps {
  onClose?: () => void;
}

const DataAnalysisCard = ({ onClose }: DataAnalysisCardProps) => {
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const recommendations = [
    {
      icon: '🏖️',
      establishment: 'Eco-Resort / Retreat',
      insight: 'Highest profit potential with stable coastline and clear water (Copernicus / PhilSA).',
      condition: 'MUST: Install on-site water treatment to protect the reef (Gemini interpretation).',
      risk: false
    },
    {
      icon: '🐠',
      establishment: 'Sustainable Aquaculture Farm',
      insight: 'High potential for food security and local income (Resource APIs).',
      condition: 'MUST: Use closed-loop systems to avoid polluting the water (DENR/BFAR requirement).',
      risk: false
    },
    {
      icon: '💨',
      establishment: 'Renewable Energy Site (Wind/Solar)',
      insight: 'Converts the high risk of storms/wind (NASA) into a profitable, clean energy asset.',
      condition: 'MUST: Structures must be elevated and resilient to storm surge.',
      risk: true
    },
    {
      icon: '🌱',
      establishment: 'Conservation Area / Mangrove Nursery',
      insight: 'Offers the highest long-term protection and ecosystem value (IUCN/World Bank studies).',
      condition: 'MUST: Restrict commercial use to guided tours and education only.',
      risk: false
    }
  ];

  const dataSources = [
    'NASA Earthdata (Flood/Storm Risk)',
    'Copernicus Sentinel (Coastal Change)',
    'PhilSA (Philippine Satellite)',
    'DENR/BFAR (Environmental Standards)',
    'World Bank & IUCN (Conservation Data)',
    'Google Gemini (AI Interpretation)'
  ];

  const handleDownloadPDF = () => {
    const pdfData = {
      recommendations,
      dataSources,
      chatMessages,
      location: 'Selected Analysis Area',
      timestamp: new Date().toLocaleString()
    };
    
    generateAnalysisPDF(pdfData);
  };

  const handleChatMessagesUpdate = (messages: any[]) => {
    setChatMessages(messages);
  };

  return (
    <Card className="w-full max-w-2xl h-full overflow-hidden flex flex-col slide-in-right bg-card border-primary/20 shadow-card">
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 relative">
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm border-border hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold mb-2">Data Analysis: Land Recommendations</h1>
        <p className="text-sm text-muted-foreground">AI-powered geospatial intelligence for sustainable development</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!showChat ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-sm">Establishment</th>
                    <th className="text-left p-3 font-semibold text-sm">Insight (The Why)</th>
                    <th className="text-left p-3 font-semibold text-sm">Condition / Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((rec, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{rec.icon}</span>
                          <span className="font-medium text-sm">{rec.establishment}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{rec.insight}</td>
                      <td className={`p-3 text-sm ${rec.risk ? 'bg-destructive/10 text-destructive' : ''} rounded`}>
                        {rec.condition}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Info className="h-4 w-4 text-primary" />
                <span>Data Sources</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {dataSources.map((source, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded">
                    • {source}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button 
                onClick={handleDownloadPDF}
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10 font-semibold"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Analysis Report (PDF)
              </Button>
              <Button 
                onClick={() => setShowChat(true)}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                Ask Gemini
              </Button>
            </div>
          </>
        ) : (
          <div className="h-full">
            <Button 
              onClick={() => setShowChat(false)}
              variant="outline"
              size="sm"
              className="mb-4"
            >
              ← Back to Analysis
            </Button>
            <div className="h-[calc(100%-3rem)]">
              <ChatInterface onMessagesUpdate={handleChatMessagesUpdate} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DataAnalysisCard;
