import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducer";
import logger from "redux-logger";

export default createStore(rootReducer, applyMiddleware(thunk, logger));
