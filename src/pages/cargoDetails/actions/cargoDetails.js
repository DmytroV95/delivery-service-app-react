import {
    CREATE_NEW_CARGO,
    FETCH_CARGO_BY_ID_SUCCESS,
    SET_IS_CARGO_DATA_UPDATED
} from "../../../app/constants/actionTypes";

export const fetchCargoByIdData = (cargoById, cargoByIdError) => ({
    type: FETCH_CARGO_BY_ID_SUCCESS,
    payload: {cargoById, cargoByIdError},
});

export const createNewCargo = (newCargo, newCargoError) => ({
    type: CREATE_NEW_CARGO,
    payload: {newCargo, newCargoError}
});

export const setIsCargoDataUpdated = (isUpdated) => ({
    type: SET_IS_CARGO_DATA_UPDATED,
    payload: isUpdated,
});
