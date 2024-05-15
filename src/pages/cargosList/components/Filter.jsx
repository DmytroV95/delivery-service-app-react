import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setSelectedDeliveryStatus, setSelectedVehicleType} from "../actions/filter";

const vehiclesTypes = [
    {id: 1, type: "CAR"},
    {id: 2, type: "TRUCK"},
    {id: 3, type: "TRAIN"},
    {id: 4, type: "PLANE"},
    {id: 5, type: "SHIP"},
    {id: 6, type: "HELICOPTER"},
    {id: 7, type: "DRONE"},
];

export const deliveryStatus = [
    {id: 1, status: "IN_TRANSIT"},
    {id: 2, status: "DELIVERED"},
    {id: 3, status: "OUT_FOR_DELIVERY"},
    {id: 4, status: "PENDING"},
    {id: 5, status: "RETURNED"},
    {id: 6, status: "LOST"},
];

const Filter = () => {
    const dispatch = useDispatch();
    const [vehiclesFilterTypes, setVehiclesFilterTypes] = useState({});
    const [deliveryFilterStatuses, setDeliveryFilterStatuses] = useState({});

    useEffect(() => {
        const savedVehiclesFilterTypes = JSON.parse(
            localStorage.getItem("vehiclesFilterTypes")) || {};
        const savedDeliveryFilterStatuses = JSON.parse(
            localStorage.getItem("deliveryFilterStatuses")) || {};

        setVehiclesFilterTypes(savedVehiclesFilterTypes);
        setDeliveryFilterStatuses(savedDeliveryFilterStatuses);

        Object.entries(savedVehiclesFilterTypes).forEach(([type, checked]) => {
            dispatch(setSelectedVehicleType(type, checked));
        });
        Object.entries(savedDeliveryFilterStatuses).forEach(([status, checked]) => {
            dispatch(setSelectedDeliveryStatus(status, checked));
        });
    }, [dispatch]);


    const saveFilterValuesToLocalStorage = (vehiclesFilterTypes, deliveryFilterStatuses) => {
        localStorage.setItem("vehiclesFilterTypes",
            JSON.stringify(vehiclesFilterTypes));
        localStorage.setItem("deliveryFilterStatuses",
            JSON.stringify(deliveryFilterStatuses));
    };

    const handleVehicleTypeChange = (type) => (event) => {
        const checked = event.target.checked;
        const updatedFilters = {...vehiclesFilterTypes, [type]: checked};
        setVehiclesFilterTypes(updatedFilters);
        saveFilterValuesToLocalStorage(updatedFilters, deliveryFilterStatuses);
        dispatch(setSelectedVehicleType(type, checked));
    };

    const handleDeliveryStatusChange = (status) => (event) => {
        const checked = event.target.checked;
        const updatedFilters = {...deliveryFilterStatuses, [status]: checked};
        setDeliveryFilterStatuses(updatedFilters);
        saveFilterValuesToLocalStorage(vehiclesFilterTypes, updatedFilters);
        dispatch(setSelectedDeliveryStatus(status, checked));
    };

    return (
        <Box sx={{display: "flex"}}>
            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                <FormLabel component="legend">Filter by Vehicle Type</FormLabel>
                <FormGroup>
                    {vehiclesTypes.map(({id, type}) => (
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox
                                    checked={vehiclesFilterTypes[type] || false}
                                    onChange={handleVehicleTypeChange(type)}
                                    name={type}
                                />
                            }
                            label={type}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                <FormLabel component="legend">Filter by Delivery Status</FormLabel>
                <FormGroup>
                    {deliveryStatus.map(({id, status}) => (
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox
                                    checked={deliveryFilterStatuses[status] || false}
                                    onChange={handleDeliveryStatusChange(status)}
                                    name={status}
                                />
                            }
                            label={status}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    );
};

export default Filter;
