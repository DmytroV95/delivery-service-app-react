import axios from "axios";
import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {createNewCargo, fetchCargoByIdData, setIsCargoDataUpdated} from "../actions/cargoDetails";

const CARGOS_API_BASE_URL = "http://localhost:8080/api/cargos";

export default function useCargoDetailData() {
    const dispatch = useDispatch();
    const [isCargoUpdated, setIsCargoUpdated] = useState(false);

    const fetchCargoById = useCallback(async (id) => {
        try {
            const response = await axios.get(`${CARGOS_API_BASE_URL}/${id}`);
            dispatch(fetchCargoByIdData(response, null))
            return response;
        } catch (error) {
            console.error("Error fetching cargo by ID:", error);
            dispatch(fetchCargoByIdData(null, error))
            return null;
        }
    }, [dispatch]);

    const saveCargo = async (cargo) => {
        try {
            const response = await axios.post(`${CARGOS_API_BASE_URL}`, cargo, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            dispatch(createNewCargo(response, null));
        } catch (error) {
            console.error('Error saving cargo:', error);
            dispatch(createNewCargo(null, error))
        }
    };

    const updateCargo = async (id, cargo) => {
        try {
            const response = await axios.put(`${CARGOS_API_BASE_URL}/${id}`, cargo, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setIsCargoUpdated(true)
            dispatch(setIsCargoDataUpdated(true));
            return response;
        } catch (error) {
            console.error('Error updating cargo:', error);
            setIsCargoUpdated(false)
        }
    }

    return {
        isCargoUpdated,
        updateCargo,
        saveCargo,
        fetchCargoById
    };
}
