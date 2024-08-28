import { Button } from '../ui/button';

import {
  AdvancedMarker,
  ControlPosition,
  Map,
  MapControl,
  Pin,
} from '@vis.gl/react-google-maps';
import { CalendarIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

// ----------------------------------------------------------------

interface IGoogleMapsMeetupDisplayProps {
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

const GoogleMapsMeetupDisplay: React.FC<IGoogleMapsMeetupDisplayProps> = ({
  location,
}) => {
  const { theme } = useTheme();
  const [zoom, setZoom] = useState(location.address ? 16 : 3);

  const [center, setCenter] = useState({
    lat: location.lat || 22.54992,
    lng: location.lng || 0,
  });

  const darkLightMode =
    theme === 'dark' ? '7a9e2ebecd32a903' : '3fec513989decfcd';

  return (
    <div className="h-60">
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={center}
        defaultZoom={zoom}
        zoom={zoom}
        gestureHandling="cooperative"
        disableDefaultUI
        mapTypeId="roadmap"
        mapId={darkLightMode}
        reuseMaps
      >
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <div className="mb-1 mr-2 flex flex-col gap-y-1">
            <Button
              className="p1-medium rounded border border-white-border bg-white-100 px-3 py-0.5 text-black-700 transition duration-300 ease-in-out hover:bg-primary-500 hover:text-white-200 dark:border-black-800 dark:bg-black-700 dark:text-white-200 hover:dark:bg-primary-500"
              type="button"
              onClick={() => setZoom((prevZoom) => prevZoom + 1)}
            >
              +
            </Button>
            <Button
              type="button"
              className="p1-medium rounded border border-white-border bg-white-100 px-3 py-0.5 text-black-700 transition duration-300 ease-in-out hover:bg-primary-500 hover:text-white-200 dark:border-black-800 dark:bg-black-700 dark:text-white-200 hover:dark:bg-primary-500"
              onClick={() => setZoom((prevZoom) => prevZoom - 1)}
            >
              -
            </Button>
          </div>
        </MapControl>
        {location.address && (
          <AdvancedMarker position={{ lat: location.lat, lng: location.lng }}>
            <Pin background="#825EF6" borderColor="#825EF6" scale={1.4}>
              <CalendarIcon className="text-white-200" />
            </Pin>
          </AdvancedMarker>
        )}
      </Map>
    </div>
  );
};

export default GoogleMapsMeetupDisplay;
