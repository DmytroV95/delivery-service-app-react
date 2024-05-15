import {combineReducers} from "redux";
import cargoReducer from "./cargo";
import filterReducer from "./filter";

export default combineReducers({
    cargoReducer, filterReducer
});
