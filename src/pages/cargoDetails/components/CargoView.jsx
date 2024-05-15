import Paper from "@mui/material/Paper";
import {Box, Grid, IconButton, InputLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import {Link} from "react-router-dom";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import Typography from "@mui/material/Typography";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {formatString} from "../util/editResponseData";

const CargoView = ({cargoData, onEdit}) => {
    return (
        <Paper elevation={3}>
            <Box sx={{padding: 5, position: 'relative'}}>
                <Box sx={{position: 'absolute', top: 20, right: 20}}>
                    <IconButton component={Link} to={pageURLs[pages.cargosList]} color="primary" aria-label="back">
                        <ArrowBackIcon fontSize="large"/>
                    </IconButton>
                    <IconButton onClick={onEdit} color="primary" aria-label="edit">
                        <BorderColorIcon/>
                    </IconButton>
                </Box>
                <Typography variant="h4" gutterBottom sx={{paddingBottom: 5}}>
                    {`Cargo Details №${cargoData.id}`}
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sm={2} sx={{alignContent: "center"}}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                fontWeight: 700,
                            }}
                        >
                            №
                        </InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{readOnly: true}}

                            value={cargoData.id}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} sx={{alignContent: "center"}}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                fontWeight: 700,
                            }}
                        >
                            Delivery status
                        </InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="url"
                            name="text"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{readOnly: true}}
                            value={formatString(cargoData.status)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{alignContent: "center"}}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                fontWeight: 700,
                            }}
                        >
                            Cargo weight, kg
                        </InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{readOnly: true}}
                            value={cargoData.weight}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4}></Grid>

                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                fontWeight: 700,
                            }}
                        >
                            Description
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            fullWidth
                            rows={4}
                            InputProps={{readOnly: true}}
                            value={cargoData.description}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{alignContent: "center"}}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                fontWeight: 700,
                            }}
                        >
                            Vehicle number
                        </InputLabel>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="url"
                            name="url"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{readOnly: true}}
                            value={cargoData.vehicle.vehicleNumber}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} sx={{alignContent: "center"}}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700,
                            }}
                        >
                            Vehicle type
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="url"
                            name="url"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{readOnly: true}}
                            value={formatString(cargoData.vehicle.type)}
                        />
                    </Grid>


                    <Grid item xs={12} sm={2} sx={{alignContent: "center"}}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                fontWeight: 700,
                            }}
                        >
                            Delivery to
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="url"
                            name="url"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{readOnly: true}}
                            value={cargoData.vehicle.routeTo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{alignContent: "center"}}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                fontWeight: 700,
                            }}
                        >
                            Delivery from
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            InputProps={{readOnly: true}}
                            value={cargoData.vehicle.routeFrom}
                        />
                    </Grid>


                </Grid>
            </Box>
        </Paper>
    );
}

export default CargoView;
