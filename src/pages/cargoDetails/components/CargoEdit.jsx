import Paper from "@mui/material/Paper";
import {Box, Grid, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import Typography from "@mui/material/Typography";
import {CARGO_STATUS_LIST, VEHICLE_NUMBERS} from "../constants/constants";
import useCargoDetailData from "../hooks/useCargoDetailData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from '@mui/icons-material/Close';
import {useValidateData} from "../hooks/useValidateData";

const emptyCargoData = {
    status: "",
    weight: "",
    vehicle: {
        vehicleNumber: "",
    },
    description: "",
};

const CargoEdit = ({cargoData, isNewCargo, onCancel, onSave, onChange}) => {
    const [localStateCargo, setLocalStateCargo] = useState(emptyCargoData);
    const {saveCargo} = useCargoDetailData();
    const {errors, setErrors, validateCargoData} = useValidateData();

    useEffect(() => {
        if (isNewCargo) {
            setLocalStateCargo(emptyCargoData);
        }
    }, [isNewCargo]);

    const handleEnterNewCargoData = (event) => {
        const {name, value} = event.target;
        setLocalStateCargo({
            ...localStateCargo,
            [name]: value,
            vehicle: {
                ...localStateCargo.vehicle,
                [name]: value
            }
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSaveNewCargoClick = () => {
        const payload = {
            vehicleNumber: localStateCargo.vehicle.vehicleNumber,
            description: localStateCargo.description,
            weight: parseFloat(localStateCargo.weight),
            status: localStateCargo.status,
        };
        if (validateCargoData(payload)) {
            saveCargo(payload)
                .then(() => {
                    setLocalStateCargo(emptyCargoData);
                })
        }
    };

    return (
        <Paper elevation={3}>
            <Box sx={{padding: 5, position: 'relative'}}>
                <Box sx={{position: 'absolute', top: 20, right: 20}}>
                    {!isNewCargo && (
                        <IconButton onClick={onCancel} color="primary" aria-label="edit">
                            <ArrowBackIcon fontSize="large"/>
                        </IconButton>
                    )}
                    <IconButton component={Link} to={pageURLs[pages.cargosList]} color="primary" aria-label="back">
                        <CloseIcon fontSize="large"/>
                    </IconButton>
                </Box>
                <Typography variant="h4" gutterBottom sx={{paddingBottom: 5}}>
                    {isNewCargo ? `Create new cargo` : `Edit Cargo Details №${cargoData.id}`}
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
                            Weight, kg
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small" error={!!errors.weight}>
                            <TextField
                                required
                                id="weight"
                                name="weight"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                value={isNewCargo ? localStateCargo.weight : cargoData.weight}
                                onChange={isNewCargo ? handleEnterNewCargoData : onChange}
                            />
                            {errors.weight &&
                                <Typography variant="body2" color="error"
                                            sx={{fontSize: 12}}>{errors.weight}</Typography>}
                        </FormControl>
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
                        <FormControl fullWidth size="small" error={!!errors.status}>
                            <Select
                                labelId="delivery-status"
                                id="delivery-status"
                                name="status"
                                value={isNewCargo ? localStateCargo.status : cargoData.status}
                                onChange={isNewCargo ? handleEnterNewCargoData : onChange}
                            >
                                {isNewCargo && <MenuItem value=""></MenuItem>}
                                {CARGO_STATUS_LIST.map(({value, name}) => (
                                    <MenuItem key={value} value={value}>{name}</MenuItem>
                                ))}
                            </Select>
                            {errors.status &&
                                <Typography color="error" sx={{fontSize: 12}}>{errors.status}</Typography>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}> </Grid>

                    <Grid item xs={12} sm={4} sx={{alignContent: "center"}}>
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
                        <FormControl fullWidth size="small" error={!!errors.vehicleNumber}>
                            <Select
                                required
                                id="vehicleNumber"
                                name="vehicleNumber"
                                value={isNewCargo
                                    ? localStateCargo.vehicle.vehicleNumber
                                    : cargoData.vehicle.vehicleNumber}
                                onChange={isNewCargo ? handleEnterNewCargoData : onChange}
                            >
                                {VEHICLE_NUMBERS.map((item) => (
                                    <MenuItem value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                            {errors.vehicleNumber &&
                                <Typography color="error" sx={{fontSize: 12}}>{errors.vehicleNumber}</Typography>}
                        </FormControl>
                    </Grid>
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
                        <FormControl fullWidth size="small" error={!!errors.description}>
                            <TextField
                                id="outlined-multiline-static"
                                name="description"
                                multiline
                                fullWidth
                                rows={4}
                                value={isNewCargo ? localStateCargo.description : cargoData.description}
                                onChange={isNewCargo ? handleEnterNewCargoData : onChange}
                            />
                            {errors.description &&
                                <Typography variant="body2" color="error"
                                            sx={{fontSize: 12}}>{errors.description}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', marginTop: 3}}>
                        {isNewCargo ? (
                            <Button variant="contained" onClick={handleSaveNewCargoClick}>Create</Button>
                        ) : (
                            <Button variant="contained" onClick={onSave}>Save</Button>
                        )}
                    </Grid>

                </Grid>
            </Box>
        </Paper>
    );
}

export default CargoEdit;
