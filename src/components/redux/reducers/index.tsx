import { combineReducers } from "redux";
import userReducer from "./UserProfileReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
