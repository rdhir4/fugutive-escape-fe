import React, { useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import "./VehicleSelection.css";



const VehicleSelection = ({
  cop,
  onVehicleSelect,
  distance,
  selectedVehicle,
}) => {
    const [vehicles, setVehicles] = useState( [
        { id: 1, name: "EV Bike", range: 40, count: 2, image: "evBike.png" },
        { id: 2, name: "EV Car", range: 100, count: 1, image: "evCar.png" },
        { id: 3, name: "EV SUV", range: 120, count: 1, image: "evSuv.png" },
      ])
  const [errorMessage, setErrorMessage] = useState({});

  const handleVehicleClick = (vehicle) => {
    if (distance > vehicle.range) {
      setErrorMessage((prev) => ({ ...prev, [vehicle.id]: "Not enough fuel" }));
    } else {
      setErrorMessage({});
      onVehicleSelect(cop, vehicle);
    }
  };

  return (
    <Box my={2}>
      <Typography variant="h6">Step 2: Select Vehicle</Typography>
      <Grid container spacing={2}>
        {vehicles.map((vehicle) => (
          <Grid item xs={4} key={vehicle.name}>
            <Button
              className="vehicle"
              onClick={() =>
                handleVehicleClick({ id: vehicle.id, range: vehicle.range })
              }
              sx={{ textAlign: "center", cursor: "pointer" }}
              disabled={vehicle.count === 0}
            >
              <img
                src={`/images/vehicles/${vehicle.image}`}
                alt={vehicle.name}
                className={`vehicle-image ${
                  selectedVehicle?.id === vehicle.id ? "selected" : ""
                }`}
              />
              <Typography>{vehicle.name}</Typography>
              <Typography>Count: {vehicle.count}</Typography>
              {errorMessage[vehicle.id] && (
                <Typography color="#d32f2f">
                  {errorMessage[vehicle.id]}
                </Typography>
              )}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VehicleSelection;
