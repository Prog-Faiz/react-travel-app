import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import LocationDetails from "../LocationDetails/LocationDetails";

import useStyles from "./styles";

const List = ({ locations, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles();
  const [eleRefs, setEleRefs] = useState([]);

  useEffect(() => {
    const refs = Array(locations?.length)
      .fill()
      .map((_, i) => eleRefs[i] || createRef());
    setEleRefs(refs);
  }, [locations]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Hotels, Restraurants & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="4rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3</MenuItem>
              <MenuItem value={4}>Above 4</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {locations?.map((location, i) => (
              <Grid item key={i} xs={12}>
                <LocationDetails
                  location={location}
                  selected={Number(childClicked) === i}
                  refProp={eleRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
