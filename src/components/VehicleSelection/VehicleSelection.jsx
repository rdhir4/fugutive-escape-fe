import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import './VehicleSelection.css';

const vehicles = [
    { name: 'EV Bike', range: 60, count: 2, image: 'evBike.png' },
    { name: 'EV Car', range: 100, count: 1, image: 'evCar.png' },
    { name: 'EV SUV', range: 120, count: 1, image: 'evSuv.png' }
];

const VehicleSelection = ({ cop, distance, onVehicleSelect }) => {
    const handleVehicleClick = (vehicle) => {
        onVehicleSelect(cop, vehicle);
    };

    return (
        <Box my={2}>
            <Typography variant="h6">Step 2: Select Vehicle</Typography>
            <Grid container spacing={2}>
                {vehicles.map(vehicle => (
                    <Grid item xs={4} key={vehicle.name}>
                        <Box
                            className="vehicle"
                            onClick={() => handleVehicleClick(vehicle)}
                            sx={{ textAlign: 'center', cursor: 'pointer' }}
                        >
                            <img src={`/images/vehicles/${vehicle.image}`} alt={vehicle.name} className="vehicle-image" />
                            <Typography>{vehicle.name}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default VehicleSelection;
