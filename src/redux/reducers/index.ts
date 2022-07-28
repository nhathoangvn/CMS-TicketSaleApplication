import { combineReducers } from "redux";
import TicketPackageReducer from "./TicketPackageReducer";
import TicketReducer from "./TicketReducer";

const reducers = combineReducers({
  ticket: TicketReducer,
  tickePackage: TicketPackageReducer,
});
export default reducers;
export type state = ReturnType<typeof reducers>;
