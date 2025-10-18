import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';

interface MapViewProps {
  onAreaConfirmed: () => void;
}

const MapView = ({ onAreaConfirmed }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [areaSelected, setAreaSelected] = useState(false);
  const circleLayer = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1Ijoia2F2ZXJzZSIsImEiOiJjbTI3aTljc3QxZjRvMmxwdWlqN2p3cWhuIn0.tyq03HoWjNUDgw7m9RnweQ';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [121.7740, 12.8797], // Philippines center
      zoom: 6,
      pitch: 0,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Simulate area selection after map loads
    map.current.on('load', () => {
      setTimeout(() => {
        if (map.current) {
          // Add a circle to represent selected area
          map.current.addSource('selected-area', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [121.7740, 12.8797]
              },
              properties: {}
            }
          });

          map.current.addLayer({
            id: 'selected-area-circle',
            type: 'circle',
            source: 'selected-area',
            paint: {
              'circle-radius': 40,
              'circle-color': 'hsl(180, 100%, 50%)',
              'circle-opacity': 0.3,
              'circle-stroke-width': 2,
              'circle-stroke-color': 'hsl(180, 100%, 50%)',
            }
          });

          setAreaSelected(true);
        }
      }, 1500);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleConfirmArea = () => {
    if (map.current) {
      // Dim the map
      map.current.setPaintProperty('selected-area-circle', 'circle-opacity', 0.15);
    }
    onAreaConfirmed();
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0 scanning-overlay" />
      
      {areaSelected && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Button 
            onClick={handleConfirmArea}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg glow-effect shadow-lg"
          >
            Confirm Area
          </Button>
        </div>
      )}
    </div>
  );
};

export default MapView;
