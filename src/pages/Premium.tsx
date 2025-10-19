import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Premium = () => {
  const navigate = useNavigate();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2024-01-01' });

  // Dummy data for demonstration
  const historicalData = {
    ndvi: [
      { date: '2023-01-01', value: 0.65, area: 'Area A' },
      { date: '2023-04-01', value: 0.72, area: 'Area A' },
      { date: '2023-07-01', value: 0.68, area: 'Area A' },
      { date: '2023-10-01', value: 0.75, area: 'Area A' },
      { date: '2024-01-01', value: 0.78, area: 'Area A' },
    ],
    temperature: [
      { date: '2023-01-01', value: 28.5, area: 'Area A' },
      { date: '2023-04-01', value: 32.1, area: 'Area A' },
      { date: '2023-07-01', value: 35.2, area: 'Area A' },
      { date: '2023-10-01', value: 30.8, area: 'Area A' },
      { date: '2024-01-01', value: 29.2, area: 'Area A' },
    ]
  };

  const predictiveInsights = {
    vegetationStability: 'High (85%)',
    degradationRisk: 'Low (15%)',
    sustainabilityScore: 'A+',
    recommendations: [
      'Maintain current vegetation density',
      'Monitor temperature trends',
      'Consider climate adaptation measures'
    ]
  };

  const multiAreaData = [
    { name: 'Area A', ndvi: 0.78, temperature: 29.2, suitability: 'High' },
    { name: 'Area B', ndvi: 0.65, temperature: 31.5, suitability: 'Medium' },
    { name: 'Area C', ndvi: 0.82, temperature: 27.8, suitability: 'High' }
  ];

  const satelliteUpdates = [
    { 
      source: 'NASA GIBS', 
      timestamp: '2024-01-15T10:30:00Z', 
      type: 'Near Real-Time Imagery',
      status: 'Available'
    },
    { 
      source: 'Copernicus Sentinel-2', 
      timestamp: '2024-01-15T09:45:00Z', 
      type: 'NRT Data',
      status: 'Available'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
              <img src="/LOGO.png" alt="LIKAS Logo" className="w-9 h-9 object-contain rounded" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">LIKAS Premium</h1>
              <p className="text-xs text-blue-200">Advanced Geospatial Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              ✨ Premium Features
            </Badge>
            <Button 
              onClick={() => navigate('/app')}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              ← Back to Map
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-[73px] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Premium Features</h2>
            <p className="text-xl text-gray-300">
              Advanced geospatial analysis powered by NASA, Copernicus, and AI insights
            </p>
          </div>

          <Tabs defaultValue="historical" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="historical" className="data-[state=active]:bg-white/20">Historical Data</TabsTrigger>
              <TabsTrigger value="predictive" className="data-[state=active]:bg-white/20">Predictive Modeling</TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-white/20">Custom Reports</TabsTrigger>
              <TabsTrigger value="multiarea" className="data-[state=active]:bg-white/20">Multi-Area Analysis</TabsTrigger>
              <TabsTrigger value="realtime" className="data-[state=active]:bg-white/20">Real-Time Updates</TabsTrigger>
            </TabsList>

            {/* Historical Data Comparison */}
            <TabsContent value="historical" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    📊 Historical Data Comparison
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">NASA MODIS</Badge>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Copernicus</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Compare past environmental data to current readings to identify trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Start Date</Label>
                      <Input 
                        type="date" 
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">End Date</Label>
                      <Input 
                        type="date" 
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">NDVI Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {historicalData.ndvi.map((point, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded">
                              <span className="text-white text-sm">{point.date}</span>
                              <span className="text-green-400 font-semibold">{point.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Temperature Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {historicalData.temperature.map((point, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded">
                              <span className="text-white text-sm">{point.date}</span>
                              <span className="text-orange-400 font-semibold">{point.value}°C</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Predictive Land Suitability Modeling */}
            <TabsContent value="predictive" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    🤖 Predictive Land Suitability Modeling
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">AI-Powered</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    AI analysis of historical data to predict environmental sustainability trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-green-500/10 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{predictiveInsights.vegetationStability}</div>
                          <div className="text-sm text-green-300">Vegetation Stability</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-red-500/10 border-red-500/30">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{predictiveInsights.degradationRisk}</div>
                          <div className="text-sm text-red-300">Degradation Risk</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-500/10 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{predictiveInsights.sustainabilityScore}</div>
                          <div className="text-sm text-blue-300">Sustainability Score</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">AI Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {predictiveInsights.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-white">
                            <span className="text-green-400">✓</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Custom Report Generation */}
            <TabsContent value="reports" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    📄 Custom Report Generation
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">PDF Export</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Generate detailed reports with maps, insights, and data sources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Report Type</Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                          <SelectItem value="environmental">Environmental Impact</SelectItem>
                          <SelectItem value="suitability">Land Suitability</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Export Format</Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Report Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Executive Summary</h4>
                          <p className="text-gray-300 text-sm">
                            Analysis of selected area shows high vegetation stability (85%) with low degradation risk (15%). 
                            Recommended for sustainable development with climate adaptation measures.
                          </p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Data Sources</h4>
                          <div className="flex gap-2">
                            <Badge className="bg-blue-500/20 text-blue-300">NASA MODIS</Badge>
                            <Badge className="bg-green-500/20 text-green-300">Copernicus Sentinel-2</Badge>
                            <Badge className="bg-purple-500/20 text-purple-300">AI Analysis</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3">
                    📊 Generate Report
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Multi-Area Analysis */}
            <TabsContent value="multiarea" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    🔄 Multi-Area Analysis
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Comparative</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Compare multiple areas side by side with comprehensive analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {multiAreaData.map((area, index) => (
                      <Card key={index} className="bg-white/5 border-white/10">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">{area.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">NDVI:</span>
                            <span className="text-green-400 font-semibold">{area.ndvi}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Temperature:</span>
                            <span className="text-orange-400 font-semibold">{area.temperature}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Suitability:</span>
                            <Badge className={
                              area.suitability === 'High' 
                                ? 'bg-green-500/20 text-green-300' 
                                : 'bg-yellow-500/20 text-yellow-300'
                            }>
                              {area.suitability}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Comparative Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Best Performing Area</h4>
                          <p className="text-gray-300">Area C shows the highest NDVI (0.82) and optimal temperature (27.8°C)</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Development Recommendations</h4>
                          <p className="text-gray-300">Focus development on Area A and C for optimal environmental conditions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Real-Time Satellite Updates */}
            <TabsContent value="realtime" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    🛰️ Real-Time Satellite Update Fetching
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Live Data</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Access the latest satellite imagery and near real-time data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Data Source</Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select data source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nasa">NASA GIBS (Near Real-Time)</SelectItem>
                          <SelectItem value="copernicus">Copernicus Sentinel-2 NRT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Time Filter</Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latest">Latest Available</SelectItem>
                          <SelectItem value="24h">Last 24 Hours</SelectItem>
                          <SelectItem value="7d">Last 7 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Available Updates</h4>
                    {satelliteUpdates.map((update, index) => (
                      <Card key={index} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-white font-semibold">{update.source}</div>
                              <div className="text-gray-300 text-sm">{update.type}</div>
                              <div className="text-gray-400 text-xs">{update.timestamp}</div>
                            </div>
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                              {update.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3">
                    🛰️ Fetch Latest Updates
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Premium;
