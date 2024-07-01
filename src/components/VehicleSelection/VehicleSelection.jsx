import React, { useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import "./VehicleSelection.css";



const VehicleSelection = ({
    cop,
    onVehicleSelect,
    distance,
    selectedVehicle,
    vehicles
}) => {
   
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
                {vehicles?.map((vehicle) => (
                    <Grid item xs={4} key={vehicle.name}>
                        <Button
                            className="vehicle"
                            onClick={() =>
                                handleVehicleClick({ id: vehicle.id, range: vehicle.range })
                            }
                            sx={{ textAlign: "center", cursor: "pointer", textTransform: 'none' }}
                            disabled={vehicle.count === 0}
                        >
                            <img
                                src={`/images/vehicles/${vehicle.image}`}
                                alt={vehicle.name}
                                className={`vehicle-image ${selectedVehicle?.id === vehicle.id ? "selected" : ""
                                    }`}
                            />
                            <Typography>{vehicle.name}</Typography>
                            <Typography>Count: {vehicle.count}</Typography>
                            <Typography>Range: {vehicle.range} km</Typography>
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
