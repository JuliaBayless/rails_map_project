import React, { useState, useEffect, useRef, FormEvent } from 'react';

declare var google: any;

const MapPage: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
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

    const formSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
        getDirections(startAddress, endAddress);
    };

    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <input
                    type="text"
                    value={startAddress}
                    onChange={e => setStartAddress(e.target.value)}
                    placeholder="Starting Address"
                />
                <input
                    type="text"
                    value={endAddress}
                    onChange={e => setEndAddress(e.target.value)}
                    placeholder="Ending Address"
                />
                <input type="submit" value="Get Directions" />
            </form>
            <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
        </div>
    );
};

export default MapPage;
