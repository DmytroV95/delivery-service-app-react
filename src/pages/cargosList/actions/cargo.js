import {
  DELETE_CARGO_STATE,
  FETCH_CARGOS_FAILURE,
  FETCH_CARGOS_SUCCESS,
  UPDATE_CURRENT_ROW_ID,
  UPDATE_PAGE_NUMBER,
  UPDATE_ROWS_PER_PAGE
} from "../../../app/constants/actionTypes";

export const updateCurrentRowId = (rowId) => ({
  type: UPDATE_CURRENT_ROW_ID,
  payload: rowId,
});

export const updatePageNumber = (pageNumber) => ({
  type: UPDATE_PAGE_NUMBER,
  payload: pageNumber,
});

export const updateRowsPerPage = (rowsPerPage) => ({
  type: UPDATE_ROWS_PER_PAGE,
  payload: rowsPerPage,
});

export const fetchCargosSuccess = (cargos) => ({
  type: FETCH_CARGOS_SUCCESS,
  payload: cargos,
});

export const fetchCargosFailure = (error) => ({
  type: FETCH_CARGOS_FAILURE,
  payload: error,
});

export const deleteCargoState = ({ success, error }) => ({
  type: DELETE_CARGO_STATE,
  payload: { success, error },
});
