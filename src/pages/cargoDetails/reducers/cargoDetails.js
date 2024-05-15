import {
    CREATE_NEW_CARGO,
    FETCH_CARGO_BY_ID_FAILURE,
    FETCH_CARGO_BY_ID_SUCCESS,
    SET_IS_CARGO_DATA_UPDATED,
} from "../../../app/constants/actionTypes";

const initialState = {
    cargoById: null,
    cargoByIdError: null,
    vehicleNumbers: {},
    newCargo: null,
    newCargoError: null,
    isCargoDataUpdated: false,
};

export default function cargoDetailsReducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_CARGO_BY_ID_SUCCESS:
            const {cargoById, cargoByIdError} = action.payload;
            return {
                ...state,
                cargoById: cargoById,
                cargoByIdError: cargoByIdError,
            };

        case FETCH_CARGO_BY_ID_FAILURE:
            return {
                ...state,
                cargoByIdError: action.payload,
            };

        case CREATE_NEW_CARGO:
            const {newCargo, newCargoError} = action.payload;
            return {
                ...state,
                newCargo: newCargo,
                newCargoError: newCargoError
            };

        case SET_IS_CARGO_DATA_UPDATED:
            return {
                ...state,
                isCargoDataUpdated: action.payload,
            };
        default:
            return state;
    }
}
