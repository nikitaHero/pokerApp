import { combineReducers } from "redux";
import desk from "./scenes/Desk/ducks";
import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({ desk, toastr });
