import React, { useState, useEffect, useRef, FormEvent } from "react";
import { createUseStyles } from "react-jss";
import { formatDistanceFromDecimal, parseDistanceToDecimal } from "./utilities";
import { RouteData } from "./types";
import { useMutation } from "react-query";
import {
  fetchAddress,
  saveRouteData,
  updateUserAddress,
} from "./api/distanceCalculations";
import { useNavigate, useParams } from "react-router-dom";
import DirectionsForm from "./components/map/DirectionsForm";
import Map from "./components/map/Map";

declare var google: any;

const initialRouteData: RouteData = {
  address_1: "",
  lat_1: 0,
  lng_1: 0,
  address_2: "",
  lat_2: 0,
  lng_2: 0,
  distance: 0,
  title: "",
};

const MapPage: React.FC = () => {
  const { routeId } = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const classes = useStyles();

  const [distance, setDistance] = useState<string>("");
  const [showSaveOption, setShowSaveOption] = useState<boolean>(false);
  const [routeData, setRouteData] = useState<RouteData>(initialRouteData);

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
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          const directionsRenderer = new google.maps.DirectionsRenderer({
            map: new google.maps.Map(mapRef.current as Element, {
              zoom: 8,
              center: { lat: 37.77, lng: -122.42 },
            }),
          });
          directionsRenderer.setDirections(response);
          const routeDistance = parseDistanceToDecimal(
            response.routes[0].legs[0].distance.text,
          );
          const startLocation = response.routes[0].legs[0].start_location;
          const endLocation = response.routes[0].legs[0].end_location;

          setRouteData((prevData) => ({
            ...prevData,
            address_1: start,
            lat_1: startLocation.lat(),
            lng_1: startLocation.lng(),
            address_2: end,
            lat_2: endLocation.lat(),
            lng_2: endLocation.lng(),
            distance: routeDistance,
          }));

          setShowSaveOption(true);
          setDistance(response.routes[0].legs[0].distance.text);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      },
    );
  };

  const handleStartAddressChange = (address: string) => {
    setRouteData((prevData) => ({ ...prevData, address_1: address }));
  };

  const handleEndAddressChange = (address: string) => {
    setRouteData((prevData) => ({ ...prevData, address_2: address }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setRouteData((prevData) => ({ ...prevData, title: newTitle }));
  };

  const saveMutation = useMutation(saveRouteData);

  const updateMutation = useMutation((newRouteData: RouteData) =>
    updateUserAddress(Number(routeId), newRouteData),
  );

  const handleSaveToAddressBook = (e: FormEvent) => {
    e.preventDefault();
    if (routeId) {
      updateMutation.mutate(routeData);
    } else {
      saveMutation.mutate(routeData);
    }
    navigate("/list");
  };

  return (
    <>
      <DirectionsForm
        onValidSubmit={getDirections}
        startAddress={routeData.address_1 || ""}
        endAddress={routeData.address_2 || ""}
        title={routeData.title}
        onStartAddressChange={handleStartAddressChange}
        onEndAddressChange={handleEndAddressChange}
        handleTitleChange={handleTitleChange}
        handleSaveToAddressBook={handleSaveToAddressBook}
        routeId={routeId}
        showSaveOption={showSaveOption}
      />
      <div className={classes.distanceContainer}>
        {distance ? (
          <span className={classes.distance}>Distance: {distance}</span>
        ) : (
          <span className={classes.distance} style={{ visibility: "hidden" }}>
            Distance: Placeholder
          </span>
        )}
      </div>
      <Map ref={mapRef} />
    </>
  );
};
export default MapPage;

const useStyles = createUseStyles({
  container: {
    padding: "20px",
    display: "flex",
    flexDirection: "row",
  },
  distanceContainer: {
    margin: "5px",
    minHeight: "25px",
    display: "flex",
    alignItems: "center",
  },
  distance: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    fontFamily: "outfit, sans-serif",
    letterSpacing: "1px",
  },
});
