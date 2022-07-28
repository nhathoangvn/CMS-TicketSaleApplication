type getData = {
  type: "GET_DATA";
  payload: any;
};

type search = {
  type: "SEARCH_DATA";
  payload: string;
};
type filterByTinhTrang = {
  type: "FILTER_BY_TINH_TRANG";
  payload: any;
};
type filterByCongCheckIn = {
  type: "FILTER_BY_CONG_CHECKIN";
  payload: any;
};
type filterByTinhTrangDoiSoat = {
  type: "FILTER_BY_TINH_TRANG_DOI_SOAT";
  payload: any;
};
type filterByDate = {
  type: "FILTER_BY_DATE";
  payload: any;
};
export type TicketAction =
  | getData
  | search
  | filterByTinhTrang
  | filterByCongCheckIn
  | filterByTinhTrangDoiSoat
  | filterByDate;
