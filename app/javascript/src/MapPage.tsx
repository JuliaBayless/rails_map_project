import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { createUseStyles } from 'react-jss';
import AddressForm from './components/map/AddressForm'

declare var google: any;

const MapPage: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const classes = useStyles();

    const [startAddress, setStartAddress] = useState<string>('');
    const [endAddress, setEndAddress] = useState<string>('');

    useEffect(() => {
        if (mapRef.current) {
            const mapOptions = {
                zoom: 8,
                center: { lat: 37.77, lng: -122.42 } // Default to San Francisco for example
            };

            const map = new google.maps.Map(mapRef.current, mapOptions);
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
        }
    }, []);

    const getDirections = (start: string, end: string) => {
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: start,
                destination: end,
                travelMode: 'DRIVING'
            },
            (response, status) => {
                if (status === 'OK') {
                    const directionsRenderer = new google.maps.DirectionsRenderer({
                        map: new google.maps.Map(mapRef.current as Element, {
                            zoom: 8,
                            center: { lat: 37.77, lng: -122.42 }
                        })
                    });
                    directionsRenderer.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }
        );
    };

    return (
      <div className={classes.container}>
      <AddressForm onValidSubmit={(start, end) => getDirections(start, end)} />
      <div className={classes.mapDiv} ref={mapRef}></div>
  </div>

    );
};

export default MapPage;

const useStyles = createUseStyles({
  container: {
      padding: '20px'
  },
  mapDiv: {
      height: '500px',
      width: '100%',
      border: '1px solid #ddd'
  }
});