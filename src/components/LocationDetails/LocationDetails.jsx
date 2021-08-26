import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const LocationDetails = ({ location, selected, refProp }) => {
  const classes = useStyles();

  if (selected) refProp?.curret?.scrollIntoView()({ behavior: "smooth", block: "start" })

  return (
    <Card elevation={5}>
      <CardMedia
        style={{ height: 320 }}
        image={location.photo ? location.photo.images.large.url : ""}
        title={location.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {location.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(location.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            Out of {location.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="subtitle1">
            Price
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {location.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="subtitle1">
            Ranking
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {location.ranking}
          </Typography>
        </Box>
        {location?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {location?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} classes={classes.chip} />
        ))}
        {location?.address && (
          <Typography
            gutterBottomttom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {location.address}
          </Typography>
        )}
        {location?.phone && (
          <Typography
            gutterBottomttom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {location.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(location.web_url, "_blank")}
          >
            Trip Suggestion
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(location.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default LocationDetails;
