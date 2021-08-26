import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
import mapStyles from "./mapStyles";

const Map = ({
  setCoordinates,
  setBoundaries,
  coordinates,
  locations,
  setChildClicked,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBoundaries({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {locations?.map((location, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(location.latitude)}
            lng={Number(location.longtitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlined color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {location.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={location.photo ? location.photo.images.large.url : ""}
                  alt={location.name}
                />
                <Rating size="small" value={Number(location.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
