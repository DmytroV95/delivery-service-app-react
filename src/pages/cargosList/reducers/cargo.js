import {
    DELETE_CARGO_STATE,
    FETCH_CARGOS_FAILURE,
    FETCH_CARGOS_SUCCESS,
    UPDATE_CURRENT_ROW_ID,
    UPDATE_PAGE_NUMBER,
    UPDATE_ROWS_PER_PAGE
} from "../../../app/constants/actionTypes";

const initialState = {
    pageNumber: 0,
    rowsPerPage: 10,
    currentRowId: null,
    cargos: {},
    deleteStateError: null,
    deleteStateSuccess: false,

};

export default function cargoReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CURRENT_ROW_ID:
            return {
                ...state,
                currentRowId: action.payload,
            };

        case UPDATE_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: action.payload,
            };

        case UPDATE_ROWS_PER_PAGE:
            return {
                ...state,
                rowsPerPage: action.payload,
            };

        case FETCH_CARGOS_SUCCESS:
            return {
                ...state,
                cargos: action.payload,
            };

        case FETCH_CARGOS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_CARGO_STATE:
            return {
                ...state,
                deleteStateSuccess: action.payload.success,
                deleteStateError: action.payload.error ? 'Error occurred during deletion' : null,
            };

        default:
            return state;
    }
}
