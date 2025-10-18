import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapView from '@/components/MapView';
import DataAnalysisCard from '@/components/DataAnalysisCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <img src="/LANDsense_Logo.png" alt="LandSense Logo" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Landsense</h1>
              <p className="text-xs text-muted-foreground">Sustainable Urban Planning</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
              <span>AI-Powered Geospatial Intelligence</span>
            </div>
            <Button 
              onClick={() => navigate('/premium')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg"
            >
              ✨ Premium
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 pt-[73px] flex">
        {/* Map Section */}
        <div className={`transition-all duration-500 ${showAnalysis ? 'w-1/2' : 'w-full'}`}>
          <MapView onAreaConfirmed={() => setShowAnalysis(true)} />
        </div>

        {/* Analysis Card Section */}
        {showAnalysis && (
          <div className="w-1/2 h-[calc(100vh-73px)] p-6 overflow-hidden relative z-10">
            <DataAnalysisCard onClose={() => setShowAnalysis(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
