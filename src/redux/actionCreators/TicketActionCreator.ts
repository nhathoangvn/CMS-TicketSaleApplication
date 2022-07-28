import { collection, getDocs } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../config/firebase";
import { TicketAction } from "../actions/TicketAction";

export const getData = () => async (dispatch: Dispatch<TicketAction>) => {
  try {
    const ticketCollectionRef = collection(db, "ticket");
    const data = await getDocs(ticketCollectionRef);
    dispatch({
      type: "GET_DATA",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const search =
  (searchText: string) => async (dispatch: Dispatch<TicketAction>) => {
    try {
      dispatch({
        type: "SEARCH_DATA",
        payload: searchText,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const filterByTinhTrang =
  (tinhTrang: string) => async (dispatch: Dispatch<TicketAction>) => {
    try {
      dispatch({
        type: "FILTER_BY_TINH_TRANG",
        payload: tinhTrang,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const filterByCongCheckIn =
  (congCheckIn: Set<string>) => async (dispatch: Dispatch<TicketAction>) => {
    try {
      dispatch({
        type: "FILTER_BY_CONG_CHECKIN",
        payload: Array.from(congCheckIn),
      });
    } catch (error) {
      console.log(error);
    }
  };
export const filterByTinhTrangDoiSoat =
  (tinhTrangDoiSoat: string) => async (dispatch: Dispatch<TicketAction>) => {
    try {
      dispatch({
        type: "FILTER_BY_TINH_TRANG_DOI_SOAT",
        payload: tinhTrangDoiSoat,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const filterByDate =
  (fromDate: string, toDate: string) =>
  async (dispatch: Dispatch<TicketAction>) => {
    try {
      dispatch({
        type: "FILTER_BY_DATE",
        payload: { fromDate: fromDate, toDate: toDate },
      });
    } catch (error) {
      console.log(error);
    }
  };
