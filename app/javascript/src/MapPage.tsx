import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { createUseStyles } from 'react-jss';
import AddressForm from './components/map/AddressForm'

declare var google: any;

const MapPage: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const classes = useStyles();

    const [distance, setDistance] = useState<string>('');
    const [showSaveOption, setShowSaveOption] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')


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
                    //get distance
                    const routeDistance = response.routes[0].legs[0].distance.text;
                    setDistance(routeDistance);
                    setShowSaveOption(true);

                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }
        );
    };

    const handleSaveToAddressBook = (e: FormEvent) => {
        e.preventDefault();
        console.log('save to address book');
    }

    return (
      <><div className={classes.container}>
        <AddressForm onValidSubmit={(start, end) => getDirections(start, end)} />
        {showSaveOption && (
          <div className={classes.saveContainer}>
            <input
              className={classes.input}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title for this route" />
            <button className={classes.btn} onClick={handleSaveToAddressBook}>Save to Address Book</button>
          </div>
        )}
      </div>
      <div className={classes.distanceContainer}>
    {distance ? (
        <span className={classes.distance}>Distance: {distance}</span>
    ) : (
        <span className={classes.distance} style={{ visibility: 'hidden' }}>
            Distance: Placeholder
        </span>
    )}
</div>
      <div className={classes.mapDiv} ref={mapRef}></div></>
    );
};

export default MapPage;

const useStyles = createUseStyles({
  container: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'row',
  },
  mapDiv: {
      height: '500px',
      width: '100%',
      border: '1px solid #ddd'
  },
  saveContainer: {
    marginBottom: '20px',
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  btn: {
    padding: '8px 15px',
    backgroundColor: '#009a00',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontFamily: 'outfit, sans-serif', 
    '&:hover': {
        backgroundColor: '#008100',
    },
    alignSelf: 'center',
    width: '80%',
  },
  distanceContainer: {
    margin: '5px',
    minHeight: '25px', 
    display: 'flex',   
    alignItems: 'center', 
  },
  distance: {
    fontSize: '20px',       
    fontWeight: 'bold',   
    color: '#333',      
    fontFamily: 'outfit, sans-serif', 
    letterSpacing: '1px',  
  }
});