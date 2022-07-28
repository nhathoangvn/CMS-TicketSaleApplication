import { TicketAction } from "../actions/TicketAction";

const initialState = {
  manageTicket: [],
  ticketList: [],
  filter: {
    searchText: "",
    tinhTrang: "all",
    congCheckIn: [],
    tinhTrangDoiSoat: "all",
    fromDate: "",
    toDate: "",
  },
};
const TicketReducer = (state: any = initialState, action: TicketAction) => {
  switch (action.type) {
    case "GET_DATA": {
      state.ticketList = action.payload.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      state.manageTicket = action.payload.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return { ...state };
    }
    case "SEARCH_DATA": {
      return {
        ...state,
        filter: {
          ...state.filter,
          searchText: action.payload,
        },
      };
    }
    case "FILTER_BY_TINH_TRANG": {
      return {
        ...state,
        filter: {
          ...state.filter,
          tinhTrang: action.payload,
        },
      };
    }
    case "FILTER_BY_CONG_CHECKIN": {
      return {
        ...state,
        filter: {
          ...state.filter,
          congCheckIn: action.payload,
        },
      };
    }
    case "FILTER_BY_TINH_TRANG_DOI_SOAT": {
      return {
        ...state,
        filter: {
          ...state.filter,
          tinhTrangDoiSoat: action.payload,
        },
      };
    }
    case "FILTER_BY_DATE": {
      return {
        ...state,
        filter: {
          ...state.filter,
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
        },
      };
    }
    default:
      return state;
  }
};
export default TicketReducer;
