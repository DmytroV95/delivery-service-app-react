import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {Box, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import useCargoDetailData from "../hooks/useCargoDetailData";
import {fetchCargoByIdData} from "../actions/cargoDetails";
import CargoEdit from "../components/CargoEdit";
import CargoView from "../components/CargoView";
import {CARGO_STATUS_LIST, VEHICLE_NUMBERS} from "../constants/constants";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import AlertWindowUpdate from "../components/AlertWindowUpdate";
import {useValidateData} from "../hooks/useValidateData";

function CargoDetails() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {fetchCargoById, updateCargo, isCargoUpdated} = useCargoDetailData()
    const [editMode, setEditMode] = useState(false);
    const [isNewCargo, setIsNewCargo] = useState(false);
    const [localStateCargo, setLocalStateCargo] = useState(null);
    const [openAlert, setShowAlert] = useState(false);
    const cargoDataById = useSelector((state) => state.cargoDetailsReducer.cargoById);
    const { validateCargoData } = useValidateData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id === 'create') {
                    setIsNewCargo(true);

                } else {
                    const data = await fetchCargoById(id);
                    dispatch(fetchCargoByIdData(data));

                }
            } catch (error) {
                console.error("Error fetching cargo by ID:", error);
            }
        };
        fetchData();
    }, [dispatch, fetchCargoById, id, isNewCargo, isCargoUpdated]);

    const handleEditClick = () => {
        setLocalStateCargo(cargoDataById);
        setEditMode(true);
        navigate(`${pageURLs[pages.cargosList]}/${cargoDataById.id}/edit`)
    };

    const handleSaveUpdatedCargoClick = () => {
        if (validateCargoData(localStateCargo)) {
            const payload = {
                vehicleNumber: localStateCargo.vehicle.vehicleNumber,
                description: localStateCargo.description,
                weight: parseFloat(localStateCargo.weight),
                status: localStateCargo.status,
            };
            updateCargo(localStateCargo.id, payload)
                .then((updatedCargo) => {
                    dispatch(fetchCargoByIdData(updatedCargo));
                    navigate(`${pageURLs[pages.cargosList]}/${cargoDataById.id}`)
                    setEditMode(false);
                    setShowAlert(true);
                })
        } else {
            setShowAlert(true);
        }
    };

    const handleCancelClick = () => {
        setLocalStateCargo(cargoDataById);
        setEditMode(false);
        navigate(`${pageURLs[pages.cargosList]}/${cargoDataById.id}`)
    };

    const handleChangeCargoData = (event) => {
        const {name, value} = event.target;
        setLocalStateCargo(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value,
            vehicle: {
                ...prevData.vehicle,
                [name]: value
            }

        }));
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    if (cargoDataById === null) {
        return <div>Loading...</div>;
    }

    return (
        <Paper elevation={3}>
            <Box sx={{padding: 5}}>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    {editMode ? (
                        <CargoEdit
                            isNewCargo={isNewCargo}
                            cargoData={localStateCargo}
                            onCancel={handleCancelClick}
                            onSave={handleSaveUpdatedCargoClick}
                            onChange={handleChangeCargoData}
                            vehicleNumbers={VEHICLE_NUMBERS}
                            statusMapping={CARGO_STATUS_LIST}
                        />
                    ) : (
                        <CargoView
                            cargoData={cargoDataById}
                            onEdit={handleEditClick}
                            statusMapping={CARGO_STATUS_LIST}
                        />
                    )}
                </Grid>
                <AlertWindowUpdate
                    isUpdated={isCargoUpdated}
                    openAlert={openAlert}
                    handleClose={handleCloseAlert}
                />
            </Box>

        </Paper>
    );
}

export default CargoDetails;
