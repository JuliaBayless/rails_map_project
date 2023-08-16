// Map.tsx
import React, { forwardRef, useEffect } from "react";
import { createUseStyles } from "react-jss";

declare var google: any;

const Map = forwardRef<HTMLDivElement, {}>(
  (props, ref: React.RefObject<HTMLDivElement>) => {
    const classes = useStyles();
    useEffect(() => {
      if (ref.current) {
        const mapOptions = {
          zoom: 8,
          center: { lat: 44.980553, lng: -93.270035 }, // Minneapolis
        };

        const map = new google.maps.Map(ref.current, mapOptions);
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
      }
    }, [ref]);

    return <div className={classes.mapDiv} ref={ref}></div>;
  },
);

export default Map;

const useStyles = createUseStyles({
  mapDiv: {
    height: "500px",
    width: "100%",
    border: "1px solid #ddd",
  },
});
