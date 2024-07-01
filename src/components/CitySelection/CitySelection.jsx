import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import "./CitySelection.css";

const cities = [
  { id: 1, name: "Yapkashnagar", distance: 60, image: "yapakshanagar.png" },
  { id: 2, name: "Lihaspur", distance: 50, image: "lihaspur.png" },
  { id: 3, name: "Narmis City", distance: 40, image: "narmis.png" },
  { id: 4, name: "Shekharvati", distance: 30, image: "shekarvati.png" },
  { id: 5, name: "Nuravgram", distance: 20, image: "nurvagram.png" },
];

const CitySelection = ({ cop, onCitySelect, currentSelectedCity }) => {
  const handleCityClick = (city) => {
    onCitySelect(cop, city);
  };

  return (
    <Box my={2}>
      <Typography variant="h6">Step 1: Select City</Typography>
      <Grid container spacing={2}>
        {cities.map((city) => (
          <Grid item xs={4} key={city.name}>
            <Box
              className={`city`}
              onClick={() =>
                handleCityClick({ id: city.id, distance: city.distance })
              }
              sx={{ textAlign: "center", cursor: "pointer" }}
            >
              <img
                src={`/images/cities/${city.image}`}
                alt={city.name}
                className={`city-image ${
                  currentSelectedCity?.id === city.id ? "selected" : ""
                }`}
              />
              <Typography>{city.name}</Typography>
              <Typography>Distance: {`${city.distance} km`}</Typography>

            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CitySelection;
