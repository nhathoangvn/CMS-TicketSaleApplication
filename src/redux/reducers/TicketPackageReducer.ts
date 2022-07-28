import { TicketPackageAction } from "../actions/TicketPackageAction";

const initialState = {
  ticketPackageList: [],
  filter: {
    searchText: "",
  },
};
const TicketPackageReducer = (
  state: any = initialState,
  action: TicketPackageAction
) => {
  switch (action.type) {
    case "GET_DATA": {
      state.ticketPackageList = action.payload.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return { ...state };
    }
    case "ADD_DATA": {
      return { ...state };
    }
    case "FILTER_BY_TEXT": {
      return {
        ...state,
        filter: {
          searchText: action.payload,
        },
      };
    }
    case "UPDATE_DATA": {
      return { ...state };
    }
    default:
      return state;
  }
};
export default TicketPackageReducer;
