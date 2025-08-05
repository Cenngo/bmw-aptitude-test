import { NavLink, useParams } from "react-router"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const DetailsPage = () => {
    const params = useParams();
    const {carId} = params;

    const {data: car, error, isLoading} = useSWR<ICar>({url: `/cars/${carId}`});

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" width="100vw">
            <Box p={4} display="flex" alignContent="center">
                <Button>
                    <NavLink to="/">
                        <ArrowBackIcon/>
                    </NavLink>
                </Button>
                <Typography variant="h3" gutterBottom >Car Details</Typography>
            </Box>
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Error loading car details</Typography>}
            {
                car && (<Grid container spacing={2} columns={4} p={4}>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Brand</Typography>
                        <Typography variant="body1">{car?.brand}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Model</Typography>
                        <Typography variant="body1">{car?.model}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Acceleration (0-100 km/h)</Typography>
                        <Typography variant="body1">{car?.accelSec} seconds</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Top Speed</Typography>
                        <Typography variant="body1">{car?.topSpeedKmh} km/h</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Range</Typography>
                        <Typography variant="body1">{car?.rangeKm} km</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Efficiency</Typography>
                        <Typography variant="body1">{car?.efficiencyWhKm} Wh/km</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Fast Charge Speed</Typography>
                        <Typography variant="body1">{car?.fastChargeKmH ? `${car.fastChargeKmH} km/h` : 'N/A'}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Rapid Charge</Typography>
                        <Typography variant="body1">{car?.rapidCharge ? 'Yes' : 'No'}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Power Train</Typography>
                        <Typography variant="body1">{car?.powerTrain}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Plug Type</Typography>
                        <Typography variant="body1">{car?.plugType}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Body Type</Typography>
                        <Typography variant="body1">{car?.bodyType}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Segment</Typography>
                        <Typography variant="body1">{car?.segment}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Seats</Typography>
                        <Typography variant="body1">{car?.seats}</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Price</Typography>
                        <Typography variant="body1">{car?.priceEuro} €</Typography>
                    </Grid>
                    <Grid size={1} p={2} bgcolor="black" borderRadius={2}>
                        <Typography variant="body2" gutterBottom color="primary">Date</Typography>
                        <Typography variant="body1">{car?.date ? new Date(car?.date).toLocaleDateString() : 'N/A'}</Typography>
                    </Grid>
                </Grid>)
            }
        </Box>
    )
}