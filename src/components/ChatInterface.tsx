import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHtml?: boolean;
  isTable?: boolean;
}

interface ChatInterfaceProps {
  onMessagesUpdate?: (messages: Message[]) => void;
}

const ChatInterface = ({ onMessagesUpdate }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  // Notify parent component when messages change
  useEffect(() => {
    if (onMessagesUpdate) {
      onMessagesUpdate(messages);
    }
  }, [messages, onMessagesUpdate]);

  const hotelResponse = {
    intro: '✅ Yes, a hotel (or resort) is strongly recommended based on the area\'s favorable natural assets (stable coast, clear water), which signal high tourism value.\n\nHowever, strict compliance is REQUIRED. To protect your investment from environmental risks (storms, erosion) and legal issues (pollution), you must build with resilience and sustainability measures integrated into the design.',
    tableTitle: '🚨 Compliance & Design Checklist',
    rows: [
      {
        category: '🌊 Wastewater Treatment (RA 9275 Clean Water Act)',
        requirement: 'Install a properly sized wastewater treatment plant (WWTP) for ALL sewage and greywater before it reaches the ocean.',
        why: 'Raw sewage will kill the coral reef and seagrass (Copernicus/PhilSA). This will collapse tourism value and trigger legal penalties.'
      },
      {
        category: '🏗️ Storm-Resilient Design (NSCB/NDRRMC Standards)',
        requirement: 'Elevate structures above the maximum storm surge level (NASA/NOAH data). Use reinforced foundations.',
        why: 'The area is exposed to storms. Non-compliant structures will be destroyed (total loss).'
      },
      {
        category: '🛡️ Coastal Erosion Buffer (DENR DAO)',
        requirement: 'Build at least 20 meters back from the high-tide line. Use natural barriers (e.g., mangroves) to reduce wave impact.',
        why: 'Copernicus data shows active coastal change. Buildings too close to the water will erode within 5-10 years.'
      },
      {
        category: '♻️ Solid Waste Management (RA 9003)',
        requirement: 'Implement a zero-waste-to-ocean policy. Separate, treat, and recycle all waste.',
        why: 'Plastic waste will destroy marine life and tourism appeal. Gemini analysis flags this as the highest reputational risk.'
      },
      {
        category: '🌱 Environmental Clearance Certificate (ECC) from DENR',
        requirement: 'Submit a full Environmental Impact Assessment (EIA) before construction.',
        why: 'Required by law for coastal developments. Failure to obtain ECC will result in Stop-Work orders and fines.'
      }
    ],
    dataSources: [
      'NASA Earthdata (Flood/Storm Risk)',
      'Copernicus Sentinel (Coastal Change)',
      'PhilSA (Philippine Satellite)',
      'DENR/BFAR (Environmental Standards)',
      'World Bank & IUCN (Conservation Data)',
      'Google Gemini (AI Interpretation)'
    ]
  };

  const schoolResponse = {
    intro: '⚠️ **High Disaster Risk**\n\nBased on the integrated geospatial analysis (NASA flood risk, NOAH storm surge, and PhilSA/Copernicus coastal erosion data), this area is **NOT RECOMMENDED** for school establishment.\n\nBuilding a school here would put students, teachers, and staff at **unacceptable safety risk** and violate DepEd site selection standards for educational institutions.',
    tableTitle: '🛑 Critical Risk Assessment',
    rows: [
      {
        category: '🌊 Storm Surge Exposure (NASA/NOAH Data)',
        requirement: 'Annual storm surge events reaching 2-3 meters in this zone',
        why: 'Students and staff would be trapped during emergency evacuations. DepEd prohibits schools in high-risk flood zones.'
      },
      {
        category: '🏖️ Active Coastal Erosion (Copernicus/PhilSA)',
        requirement: 'Shoreline retreat of 5-10 meters over the past decade',
        why: 'School infrastructure would be compromised within 5-10 years. Building foundations would become unstable.'
      },
      {
        category: '🌊 Flood Vulnerability (DTM Topography Data)',
        requirement: 'Low-lying topography makes evacuation extremely difficult',
        why: 'Emergency response teams cannot reach the area during storms. Violates DepEd safety standards for educational sites.'
      },
      {
        category: '📚 DepEd Site Selection Standards',
        requirement: 'Educational institutions must be in safe, accessible locations',
        why: 'This area fails multiple DepEd criteria for school establishment. Alternative sites are required by law.'
      }
    ],
    dataSources: [
      'NASA Earthdata (Flood/Storm Risk)',
      'Copernicus Sentinel (Coastal Change)',
      'PhilSA (Philippine Satellite)',
      'DENR/BFAR (Environmental Standards)',
      'World Bank & IUCN (Conservation Data)',
      'Google Gemini (AI Interpretation)'
    ]
  };

  const schoolAlternative = `🔎 **Safer Alternatives Nearby**

If you wish to establish a school around your chosen area, there are safer alternatives nearby that are currently at a selling price. <a href="/land-alternatives" class="text-primary hover:text-primary/80 underline font-semibold">See list (opens in new tab)</a>`;

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    
    setTimeout(() => {
      if (lowerInput.includes('hotel')) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: JSON.stringify(hotelResponse),
          isTable: true 
        }]);
      } else if (lowerInput.includes('school')) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: JSON.stringify(schoolResponse),
          isTable: true 
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: schoolAlternative,
            isHtml: true 
          }]);
        }, 1000);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'I can help you with questions about establishing a hotel or school in this area. Please ask about one of these options.' 
        }]);
      }
    }, 500);

    setInput('');
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      const href = target.getAttribute('href');
      if (href === '/land-alternatives') {
        window.open(href, '_blank');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-sm rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-lg">Ask Gemini</h3>
        <p className="text-sm text-muted-foreground">Get AI-powered insights about land use</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.isTable ? (
                <div className="w-full bg-card rounded-lg border border-border p-4">
                  {(() => {
                    const data = JSON.parse(message.content);
                    return (
                      <>
                        <div 
                          className="mb-4 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: data.intro
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\n/g, '<br>')
                          }}
                        />
                        <h4 className="font-semibold text-base mb-3">{data.tableTitle}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-muted/50">
                                <th className="border border-border p-3 text-left text-sm font-semibold">Compliance Category</th>
                                <th className="border border-border p-3 text-left text-sm font-semibold">Specific Requirement</th>
                                <th className="border border-border p-3 text-left text-sm font-semibold">Why It Matters</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.rows.map((row: any, i: number) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                  <td className="border border-border p-3 text-sm font-medium">{row.category}</td>
                                  <td className="border border-border p-3 text-sm">{row.requirement}</td>
                                  <td className="border border-border p-3 text-sm">{row.why}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        {/* Data Sources Section */}
                        {data.dataSources && (
                          <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-2 text-sm font-semibold">
                              <span className="text-primary">📊</span>
                              <span>Data Sources</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {data.dataSources.map((source: string, idx: number) => (
                                <div key={idx} className="text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded">
                                  • {source}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : message.isHtml ? (
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                  onClick={handleLinkClick}
                  dangerouslySetInnerHTML={{
                    __html: message.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
              ) : (
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br>')
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about hotel or school..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setInput('Can I establish a hotel here?');
              setTimeout(handleSend, 100);
            }}
            className="text-xs"
          >
            Can I establish a hotel here?
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setInput('Can I establish a school here?');
              setTimeout(handleSend, 100);
            }}
            className="text-xs"
          >
            Can I establish a school here?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
