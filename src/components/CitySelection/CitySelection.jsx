import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import './CitySelection.css';

const cities = [
    { name: 'Yapkashnagar', distance: 60, image: 'yapakshanagar.png' },
    { name: 'Lihaspur', distance: 50, image: 'lihaspur.png' },
    { name: 'Narmis City', distance: 40, image: 'narmis.png' },
    { name: 'Shekharvati', distance: 30,image: 'shekarvati.png' },
    { name: 'Nuravgram', distance: 20, image: 'nurvagram.png' }
];

const CitySelection = ({ cop, onCitySelect }) => {
    const handleCityClick = (city) => {
        onCitySelect(cop, city);
    };

    return (
        <Box my={2}>
            <Typography variant="h6">Step 1: Select City</Typography>
            <Grid container spacing={2}>
                {cities.map(city => (
                    <Grid item xs={4} key={city.name}>
                        <Box
                            className="city"
                            onClick={() => handleCityClick(city)}
                            sx={{ textAlign: 'center', cursor: 'pointer' }}
                        >
                            <img src={`/images/cities/${city.image}`} alt={city.name} className="city-image" />
                            <Typography>{city.name}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CitySelection;
