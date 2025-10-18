import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, DollarSign, Maximize2, TrendingUp, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandAlternatives = () => {
  const navigate = useNavigate();

  const landParcels = [
    {
      id: 'P-4401',
      location: 'Brgy. Candelaria, Inland Buffer Zone',
      price: '₱ 15,500,000',
      size: '4,500 SqM',
      score: '92%',
      scoreLabel: 'Highest Suitability',
      insight: 'Low Flood Risk. Flat topography with ideal sandy loam soil for construction (DepEd/Soil Data). Close to existing residential clusters.',
      contact: '+63 123 456 6789'
    },
    {
      id: 'P-4402',
      location: 'Near Major Highway Exit, Brgy. San Juan',
      price: '₱ 22,100,000',
      size: '3,000 SqM',
      score: '85%',
      scoreLabel: 'High Accessibility',
      insight: 'Excellent Accessibility. Zoned Commercial/Institutional. High price per square meter due to proximity to the main transport corridor (LGU Zoning).',
      contact: '+63 123 456 6789'
    },
    {
      id: 'P-4403',
      location: 'Elevated Residential Area (New Subdivision)',
      price: '₱ 12,000,000',
      size: '5,500 SqM',
      score: '78%',
      scoreLabel: 'Good Potential',
      insight: 'Zero Flood Risk. Requires less expensive foundation work. Price is lower due to longer distance from major roads (3.5 km) (Elevation Data).',
      contact: '+63 123 456 6789'
    },
    {
      id: 'P-4404',
      location: 'Adjacent to Agricultural Conversion Zone',
      price: '₱ 9,800,000',
      size: '7,500 SqM',
      score: '65%',
      scoreLabel: 'Conditional',
      insight: 'Largest Size/Lowest Cost. Zoning reclassification may be required from Agricultural to Institutional (DAR/CLUP). Soil needs deep geotechnical check.',
      contact: '+63 123 456 6789'
    }
  ];

  const getScoreColor = (score: string) => {
    const numScore = parseInt(score);
    if (numScore >= 90) return 'text-secondary';
    if (numScore >= 80) return 'text-primary';
    if (numScore >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analysis
          </Button>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20">
            <h1 className="text-3xl font-bold mb-2">📈 Safer Alternative Land List</h1>
            <p className="text-muted-foreground">
              Institutional Suitability Analysis - Nearby parcels evaluated for optimal suitability for school construction 
              (low flood/erosion risk, proximity to population, and appropriate size/slope).
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {landParcels.map((parcel) => (
            <Card key={parcel.id} className="p-6 bg-card border-border hover:border-primary/40 transition-all hover:shadow-card">
              <div className="grid md:grid-cols-12 gap-6">
                {/* Left Section - Main Info */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary font-mono font-bold text-lg">{parcel.id}</span>
                        <span className={`text-sm font-semibold ${getScoreColor(parcel.score)}`}>
                          {parcel.score} ({parcel.scoreLabel})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{parcel.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Price</div>
                        <div className="font-bold text-lg">{parcel.price}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-lg">
                      <Maximize2 className="h-5 w-5 text-secondary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Land Size</div>
                        <div className="font-bold text-lg">{parcel.size}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-primary mb-1">Gemini Insight</div>
                        <p className="text-sm text-foreground leading-relaxed">{parcel.insight}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Contact */}
                <div className="md:col-span-4 flex flex-col justify-between">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <div className="text-xs text-muted-foreground mb-2">Contact Number</div>
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="font-mono font-semibold text-lg">{parcel.contact}</span>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted/20 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> All suitability scores and insights are generated through 
            AI-powered analysis of geospatial data (flood risk, soil composition, zoning, accessibility) combined with 
            regulatory requirements. Please conduct independent due diligence and site verification before purchase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandAlternatives;
