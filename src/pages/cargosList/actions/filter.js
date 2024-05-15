import {SET_SELECTED_DELIVERY_STATUS, SET_SELECTED_VEHICLE_TYPE} from "../../../app/constants/actionTypes";

export const setSelectedVehicleType = (vehicleType, selected) => ({
  type: SET_SELECTED_VEHICLE_TYPE,
  payload: { vehicleType, selected },
});

export const setSelectedDeliveryStatus = (deliveryStatus, selected) => ({
  type: SET_SELECTED_DELIVERY_STATUS,
  payload: { deliveryStatus, selected },
});
