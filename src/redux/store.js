import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import auth from "../components/login/reducer";
import info_admin from "../redux/reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ auth, info_admin }),
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
