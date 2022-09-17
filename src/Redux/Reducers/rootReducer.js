import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../../Store/history";
import SignInReducer from "./SignInReducer";
import DashBoardReducer from "./DashboardReducer";
import UserManagementReducer from "./UsermanageReducer";
import ChallengeManagementReducer from "./ChallengeManageReducer";
import PostManagementReducer from "./PostManageReducer";
import ContentManagementReducer from "./ContentManageReducer";
import ProfileReducer from "./ProfileReducer"
import toggleSubnavReducer from "./ToggleSubnavReducer"
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { persistReducer } from "redux-persist";
const persistConfig = {
  key: "config",
  storage
};

const rootReducer = combineReducers({
  SignInReducer,
  DashBoardReducer,
  UserManagementReducer,
  ChallengeManagementReducer,
  PostManagementReducer,
  ContentManagementReducer,
  ProfileReducer,
  toggleSubnavReducer,
  router: connectRouter(history)
});
export default persistReducer(persistConfig, rootReducer);
