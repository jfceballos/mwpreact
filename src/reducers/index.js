import userReducer from "./user";
import { combineReducers } from "redux";
import assetReducer from "../features/asset";

const allReducers = combineReducers({
    user: userReducer,
    asset: assetReducer
})

export default allReducers;
