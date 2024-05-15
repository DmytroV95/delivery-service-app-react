import {SET_SELECTED_DELIVERY_STATUS, SET_SELECTED_VEHICLE_TYPE} from "../../../app/constants/actionTypes";

const initialState = {
  vehicleFilters: [],
  deliveryStatusFilters: [],
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_VEHICLE_TYPE:
      return {
        ...state,
        vehicleFilters: action.payload.selected
          ? [...state.vehicleFilters, action.payload.vehicleType]
          : state.vehicleFilters.filter(
              (type) => type !== action.payload.vehicleType
            ),
      };

    case SET_SELECTED_DELIVERY_STATUS:
      return {
        ...state,
        deliveryStatusFilters: action.payload.selected
          ? [...state.deliveryStatusFilters, action.payload.deliveryStatus]
          : state.deliveryStatusFilters.filter(
              (status) => status !== action.payload.deliveryStatus
            ),
      };
      
    default:
      return state;
  }
}
