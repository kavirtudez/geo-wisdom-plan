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
  const [circleCenter, setCircleCenter] = useState<[number, number] | null>(null);
  const [circleRadius, setCircleRadius] = useState(40);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawStart = useRef<[number, number] | null>(null);

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

    map.current.on('load', () => {
      if (map.current) {
        // Add source for selected area
        map.current.addSource('selected-area', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });

        map.current.addLayer({
          id: 'selected-area-circle',
          type: 'circle',
          source: 'selected-area',
          paint: {
            'circle-radius': ['get', 'radius'],
            'circle-color': 'hsl(180, 100%, 50%)',
            'circle-opacity': 0.3,
            'circle-stroke-width': 2,
            'circle-stroke-color': 'hsl(180, 100%, 50%)',
          }
        });
      }
    });

    // Handle click to start drawing circle
    map.current.on('mousedown', (e) => {
      if (!map.current) return;
      setIsDrawing(true);
      const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      drawStart.current = coords;
      setCircleCenter(coords);
      setCircleRadius(20);
    });

    // Handle mouse move to adjust circle size
    map.current.on('mousemove', (e) => {
      if (!isDrawing || !drawStart.current || !map.current) return;
      
      const start = map.current.project(drawStart.current);
      const current = map.current.project([e.lngLat.lng, e.lngLat.lat]);
      const distance = Math.sqrt(
        Math.pow(current.x - start.x, 2) + Math.pow(current.y - start.y, 2)
      );
      
      setCircleRadius(Math.max(20, Math.min(distance, 100)));
    });

    // Handle mouse up to finish drawing
    map.current.on('mouseup', () => {
      if (isDrawing && circleCenter) {
        setIsDrawing(false);
        setAreaSelected(true);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update circle visualization when center or radius changes
  useEffect(() => {
    if (!map.current || !circleCenter) return;

    const source = map.current.getSource('selected-area') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: circleCenter
        },
        properties: {
          radius: circleRadius
        }
      });
    }
  }, [circleCenter, circleRadius]);

  const handleConfirmArea = () => {
    if (map.current) {
      map.current.setPaintProperty('selected-area-circle', 'circle-opacity', 0.15);
    }
    onAreaConfirmed();
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0 scanning-overlay" />
      
      {!areaSelected && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-border shadow-lg">
          <p className="text-sm text-foreground font-medium">Click and drag to select an area</p>
        </div>
      )}
      
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
