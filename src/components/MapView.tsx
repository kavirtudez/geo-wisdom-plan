import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface MapViewProps {
  onAreaConfirmed: () => void;
}

const MapView = ({ onAreaConfirmed }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [areaSelected, setAreaSelected] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showLandForm, setShowLandForm] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [mapUpdateTrigger, setMapUpdateTrigger] = useState(0);
  
  // Cursor circle state
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null);
  const [circleSize, setCircleSize] = useState(40);
  const [placedCircles, setPlacedCircles] = useState<Array<{lng: number, lat: number, size: number}>>([]);

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    try {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia2F2ZXJzZSIsImEiOiJjbTI3aTljc3QxZjRvMmxwdWlqN2p3cWhuIn0.tyq03HoWjNUDgw7m9RnweQ';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [121.7740, 12.8797],
        zoom: 6,
        pitch: 0,
        preserveDrawingBuffer: true,
        antialias: false,
        failIfMajorPerformanceCaveat: false,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setMapLoaded(true);
        setMapError(false);
        console.log('Map loaded successfully');
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError(true);
      });

      // Handle WebGL context loss
      map.current.on('webglcontextlost', (e) => {
        console.warn('WebGL context lost');
        if (e.originalEvent) {
          e.originalEvent.preventDefault();
        }
        setMapLoaded(false);
      });

      map.current.on('webglcontextrestored', () => {
        console.log('WebGL context restored');
        setMapLoaded(true);
        setMapError(false);
      });

      // Handle map click to place circle
      const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
        if (!map.current) return;
        
        const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        
        console.log('Map clicked - placing circle');
        
        setPlacedCircles(prev => [...prev, { lng: coords[0], lat: coords[1], size: circleSize }]);
        setSelectedLocation(coords);
        setAreaSelected(true);
      };
      
      // Handle mouse move for cursor circle
      const handleMouseMove = (e: mapboxgl.MapMouseEvent) => {
        if (!map.current) return;
        
        const point = map.current.project([e.lngLat.lng, e.lngLat.lat]);
        setMousePosition({ x: point.x, y: point.y });
      };
      
      // Handle wheel for circle size adjustment
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -5 : 5;
        setCircleSize(prev => Math.max(20, Math.min(100, prev + delta)));
      };

      map.current.on('click', handleMapClick);
      map.current.on('mousemove', handleMouseMove);
      
      // Add event listeners for map movement to trigger re-rendering
      map.current.on('move', () => {
        setMapUpdateTrigger(prev => prev + 1);
      });
      
      map.current.on('zoom', () => {
        setMapUpdateTrigger(prev => prev + 1);
      });
      
      // Add wheel event listener to the map container
      const container = mapContainer.current;
      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false });
      }
      
      // Cleanup function
      return () => {
        if (container) {
          container.removeEventListener('wheel', handleWheel);
        }
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(true);
    }
  }, []); // Empty dependency array - initialize only once!

  const handleConfirmArea = () => {
    console.log('Confirming area at:', selectedLocation);
    onAreaConfirmed();
  };

  const handleSaveLand = () => {
    console.log('Opening land form for location:', selectedLocation);
    setShowLandForm(true);
  };

  const handleCloseLandForm = () => {
    setShowLandForm(false);
  };

  const handleSubmitLand = () => {
    console.log('Land submitted to Safer Alternative Land List');
    setShowLandForm(false);
    alert('Land successfully added to Safer Alternative Land List!');
  };

  const handleClearCircles = () => {
    setPlacedCircles([]);
    setAreaSelected(false);
    setSelectedLocation(null);
  };

  const handleRetryMap = () => {
    setMapError(false);
    setMapLoaded(false);
    // Force a page reload to recreate the map
    window.location.reload();
  };

  // Helper function to convert geographic coordinates to screen coordinates
  const getScreenPosition = (lng: number, lat: number) => {
    if (!map.current) return { x: 0, y: 0 };
    const point = map.current.project([lng, lat]);
    return { x: point.x, y: point.y };
  };

  return (
    <div className="relative w-full h-full">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-green-400 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/2 w-20 h-20 border-2 border-yellow-400 rounded-full"></div>
        </div>
      </div>

      {/* Map container */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 min-h-full min-w-full"
        style={{
          backgroundColor: 'transparent',
          zIndex: 1,
          visibility: mapError ? 'hidden' : 'visible'
        }}
      />
      
      {/* Error state */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-card/90 backdrop-blur-sm px-8 py-6 rounded-lg border border-border shadow-lg text-center max-w-md">
            <p className="text-lg font-semibold mb-2 text-foreground">Map Loading Error</p>
            <p className="text-sm text-muted-foreground mb-4">
              The map encountered an issue. This can happen due to browser resource limitations.
            </p>
            <Button 
              onClick={handleRetryMap}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Retry Loading Map
            </Button>
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-border shadow-lg">
            <p className="text-sm text-foreground font-medium">Loading map...</p>
          </div>
        </div>
      )}
      
      {!areaSelected && mapLoaded && !mapError && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-border shadow-lg">
          <p className="text-sm text-foreground font-medium">Move mouse to position circle, scroll to resize, click to place</p>
          <p className="text-xs text-muted-foreground mt-1">Circle size: {circleSize}px</p>
        </div>
      )}
      
      {/* Cursor Circle - follows mouse */}
      {mousePosition && !areaSelected && (
        <div 
          className="absolute z-[2] pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="border-2 border-blue-400 rounded-full"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              opacity: 0.5,
            }}
          />
        </div>
      )}
      
      {/* Placed Circles - stay on map */}
      {placedCircles.map((circle, index) => {
        const screenPos = getScreenPosition(circle.lng, circle.lat);
        // Use mapUpdateTrigger to ensure re-rendering on map movement
        return (
          <div 
            key={`${index}-${mapUpdateTrigger}`}
            className="absolute z-[2] pointer-events-none"
            style={{
              left: `${screenPos.x}px`,
              top: `${screenPos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div 
              className="border-2 border-blue-500 rounded-full bg-blue-500/20"
              style={{
                width: `${circle.size}px`,
                height: `${circle.size}px`,
              }}
            />
          </div>
        );
      })}
      
      {areaSelected && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4">
          <Button 
            onClick={handleConfirmArea}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg shadow-xl border-2 border-blue-400"
          >
            Confirm Location
          </Button>
          <Button 
            onClick={handleSaveLand}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-lg shadow-xl border-2 border-green-400"
          >
            Save Land
          </Button>
          <Button 
            onClick={handleClearCircles}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-6 text-lg shadow-xl border-2 border-gray-400"
          >
            Clear & Place More
          </Button>
        </div>
      )}

      {/* Land Form Modal */}
      {showLandForm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseLandForm}
        >
          <div 
            className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Add Land to Safer Alternative Land List</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-muted/30 rounded-lg border border-border p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Suitability Rating</label>
                    <Input 
                      defaultValue="P-440192% (Highest Suitability)" 
                      className="font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input 
                      defaultValue="Brgy. Candelaria, Inland Buffer Zone" 
                      className="font-semibold"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <Input 
                      defaultValue="₱ 15,500,000" 
                      className="font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Land Size</label>
                    <Input 
                      defaultValue="4,500 SqM" 
                      className="font-semibold"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Number</label>
                  <Input 
                    defaultValue="+63 123 456 6789" 
                    className="font-semibold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Land Analysis</label>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-sm">
                      <strong>Low Flood Risk.</strong> Flat topography with ideal sandy loam soil for construction (DepEd/Soil Data). Close to existing residential clusters. Excellent drainage system and stable foundation conditions. Zoned for residential development with easy access to utilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex gap-3 justify-end">
              <Button variant="outline" onClick={handleCloseLandForm}>
                Cancel
              </Button>
              <Button onClick={handleSubmitLand} className="bg-green-600 hover:bg-green-700">
                Add to Safer Alternative Land List
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;