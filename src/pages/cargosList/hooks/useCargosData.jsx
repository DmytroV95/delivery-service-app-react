import {useCallback} from "react";
import axios from "axios";

import {useDispatch, useSelector} from "react-redux";
import {deleteCargoState, fetchCargosFailure, fetchCargosSuccess} from "../actions/cargo";
import {formatString} from "../util/editResponseData";

const CARGOS_API_BASE_URL = "http://localhost:8080/api/cargos";

export default function useCargosData() {
    const dispatch = useDispatch();
    const pageNumber = useSelector(state => state.cargoReducer.pageNumber)
    const rowsPerPage = useSelector(state => state.cargoReducer.rowsPerPage)
    const vehiclesFilterTypes = useSelector(state => state.filterReducer.vehicleFilters)
    const deliveryFilterStatuses = useSelector(state => state.filterReducer.deliveryStatusFilters);

    const getParameterizedURL = useCallback(() => {
        let url = `${CARGOS_API_BASE_URL}/_list?page=${pageNumber + 1}&size=${rowsPerPage}`;

        if (vehiclesFilterTypes && Object.keys(vehiclesFilterTypes).length > 0) {
            Object.entries(vehiclesFilterTypes).forEach(([key, value]) => {
                url += `&type=${value}`;
            });
        }
        if (deliveryFilterStatuses && Object.keys(deliveryFilterStatuses).length > 0) {
            Object.entries(deliveryFilterStatuses).forEach(([key, value]) => {
                url += `&status=${value}`;
            });
        }
        return url;
    }, [pageNumber, rowsPerPage, vehiclesFilterTypes, deliveryFilterStatuses]);


    const getCargos = useCallback(async () => {
        try {
            const url = getParameterizedURL()
            const response = await axios.get(url);
            if (!response.status === 200) {
                throw new Error("Error fetching data with HTTP status ", response.status);
            }
            const fetchedData = processData(response)
            dispatch(fetchCargosSuccess(fetchedData));
            return fetchedData;
        } catch (error) {
            dispatch(fetchCargosFailure(error.message));
            console.error("Error fetching cargos data:", error.message);
            throw error;
        }
    }, [dispatch, getParameterizedURL]);

    const deleteCargoById = async (id) => {
        try {
            await axios.delete(`${CARGOS_API_BASE_URL}/${id}`);
            dispatch(deleteCargoState({ success: true, error: false }));
        } catch (error) {
            console.error('Error deleting cargo:', error);
            dispatch(deleteCargoState({ success: false, error: true }));
            return null;
        }
    };

    const processData = (data) => {
        if (data && Array.isArray(data.list)) {
            return {
                list: data.list.map((item) => ({
                    id: item.id,
                    type: item.vehicle.type,
                    vehicleNumber: item.vehicle.vehicleNumber,
                    description: item.description,
                    weight: item.weight,
                    status: formatString(item.status),
                })),
                currentPageNumber: data.currentPageNumber,
                totalPages: data.totalPages,
            };
        } else {
            return {list: [], currentPageNumber: 0, totalPages: 0};
        }
    };
    return {getCargos, deleteCargoById};
}
