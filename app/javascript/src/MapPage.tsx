import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { createUseStyles } from 'react-jss';
import AddressForm from './components/map/AddressForm'
import { formatDistanceFromDecimal, parseDistanceToDecimal } from './utilities';
import { RouteData } from './types';
import { useMutation } from 'react-query';
import { fetchAddress, saveRouteData } from './api/distanceCalculations';
import { useNavigate, useParams } from 'react-router-dom';

declare var google: any;

const initialRouteData: RouteData = {
  address_1: '',
  lat_1: 0,
  lng_1: 0,
  address_2: '',
  lat_2: 0,
  lng_2: 0,
  distance: 0,
  title: '',
}

const MapPage: React.FC = () => {
  const { routeId } = useParams();
    const mapRef = useRef<HTMLDivElement>(null);
    const classes = useStyles();

    const [distance, setDistance] = useState<string>('');
    const [showSaveOption, setShowSaveOption] = useState<boolean>(false);
    const [routeData, setRouteData] = useState<RouteData>(initialRouteData);


    useEffect(() => {
        if (mapRef.current) {
            const mapOptions = {
                zoom: 8,
                center: { lat: 44.980553, lng: -93.270035 } // Minneapolis
            };

            const map = new google.maps.Map(mapRef.current, mapOptions);
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
        }
    }, []);

    useEffect(() => {
      if (routeId) {
          const fetchData = async () => {
              try {
                  const data = await fetchAddress(Number(routeId));
                  getDirections(data.address_1, data.address_2);
                  setRouteData(data);
                  setDistance(formatDistanceFromDecimal(Number(data.distance)));
              } catch (error) {
                  console.error("Error fetching route data:", error);
              }
          };
          fetchData();
      }
  }, [routeId]);

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
                    const routeDistance = parseDistanceToDecimal(response.routes[0].legs[0].distance.text);
                    const startLocation = response.routes[0].legs[0].start_location;
                    const endLocation = response.routes[0].legs[0].end_location;


                    setRouteData(prevData => ({
                      ...prevData,
                      address_1: start,
                      lat_1: startLocation.lat(),
                      lng_1: startLocation.lng(),
                      address_2: end,
                      lat_2: endLocation.lat(),
                      lng_2: endLocation.lng(),
                      distance: routeDistance
                    }));

                    setShowSaveOption(true);
                    setDistance(response.routes[0].legs[0].distance.text);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }
        );
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setRouteData(prevData => ({ ...prevData, title: newTitle }));
    }
    
    const mutation = useMutation(saveRouteData, {
      onSuccess: (data) => {
        console.log('Data saved successfully!', data);

      },
      onError: (error) => {
        console.error('Error saving data:', error);
      }
    });

    const handleSaveToAddressBook = (e: FormEvent) => {
      e.preventDefault();
      console.log('save to address book', routeData);
      mutation.mutate(routeData);
    }

    return (
      <><div className={classes.container}>
        <AddressForm onValidSubmit={(start, end) => getDirections(start, end)} />
        {showSaveOption && (
          <div className={classes.saveContainer}>
            <input
              className={classes.input}
              type="text"
              value={routeData.title}
              onChange={handleTitleChange}
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