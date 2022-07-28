type getData = {
  type: "GET_DATA";
  payload: any;
};
type addTicketPackage = {
  type: "ADD_DATA";
  payload: any;
};
type filterByText = {
  type: "FILTER_BY_TEXT";
  payload: any;
};
type updateTicketPackage = {
  type: "UPDATE_DATA";
  payload: any;
};
export type TicketPackageAction =
  | getData
  | addTicketPackage
  | filterByText
  | updateTicketPackage;
