import { createSelector } from "reselect";
import { state } from "../reducers";

export const ticketSelector = (state: state) => state.ticket.ticketList;
export const manageTicketSelector = (state: state) => state.ticket.manageTicket;

export const filterSearchByText = (state: state) =>
  state.ticket.filter.searchText;
export const filterByTinhTrang = (state: state) =>
  state.ticket.filter.tinhTrang;
export const filterByCongCheckInSelector = (state: state) =>
  state.ticket.filter.congCheckIn;
export const filterByTinhTrangDoiSoat = (state: state) =>
  state.ticket.filter.tinhTrangDoiSoat;
export const filterByFromDate = (state: state) => state.ticket.filter.fromDate;
export const filterByToDate = (state: state) => state.ticket.filter.toDate;

export const ticketRemainingSelector = createSelector(
  ticketSelector,
  filterSearchByText,
  filterByTinhTrang,
  filterByCongCheckInSelector,
  (list, searchText, tinhTrang, listCongCheckIn: string[]) => {
    return list.filter((item: any) => {
      return listCongCheckIn.length
        ? listCongCheckIn?.includes(item.congCheckIn) &&
            item.soVe?.toLowerCase()?.includes(searchText?.toLowerCase()) &&
            (tinhTrang !== "all"
              ? item.tinhTrang?.includes(tinhTrang)
              : item.soVe?.toLowerCase()?.includes(searchText?.toLowerCase()))
        : item.soVe?.toLowerCase()?.includes(searchText?.toLowerCase()) &&
            (tinhTrang !== "all"
              ? item.tinhTrang?.includes(tinhTrang)
              : item.soVe?.toLowerCase()?.includes(searchText?.toLowerCase()));
    });
  }
);
export const ticketChangeRemainingSelector = createSelector(
  manageTicketSelector,
  filterSearchByText,
  filterByTinhTrangDoiSoat,
  (list, searchText, tinhTrangDoiSoat) => {
    return list.filter((item: any) => {
      return (
        item.soVe?.toLowerCase()?.includes(searchText?.toLowerCase()) &&
        (tinhTrangDoiSoat !== "all"
          ? item.tinhTrangSoatVe
              ?.toLowerCase()
              ?.includes(tinhTrangDoiSoat?.toLowerCase())
          : item.soVe?.toLowerCase()?.includes(searchText?.toLowerCase()))
      );
    });
  }
);
