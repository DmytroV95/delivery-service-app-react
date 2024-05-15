import {useState} from "react";

export const useValidateData = () => {
    const [errors, setErrors] = useState({});

    const validateCargoData = (localStateCargo) => {
        const validationErrors = {};

        for (const key in localStateCargo) {
            switch (key) {
                case "vehicleNumber":
                    if (!localStateCargo[key].vehicleNumber) {
                        console.log('localStateCargo[key].vehicleNumber', localStateCargo[key].vehicleNumber)
                        validationErrors.vehicleNumber = "Vehicle number must be selected";
                    }
                    break;
                case "description":
                    if (!localStateCargo[key]) {
                        validationErrors.description = "Description must not be blank";
                    }
                    break;
                case "weight":
                    if (
                        localStateCargo[key] === "" ||
                        localStateCargo[key] === null ||
                        isNaN(localStateCargo[key]) ||
                        parseFloat(localStateCargo[key]) < 0 ||
                        !/^\d+(\.\d+)?$/.test(localStateCargo[key])
                    ) {
                        validationErrors.weight = "Weight must be a positive float number";
                    }
                    break;
                case "status":
                    if (!localStateCargo[key]) {
                        validationErrors.status = "Status must be selected";
                    }
                    break;
                default:
                    break;
            }
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { errors, setErrors, validateCargoData};
}
