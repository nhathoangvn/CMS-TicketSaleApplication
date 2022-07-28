import { createSelector } from "reselect";
import { state } from "../reducers";

export const ticketPackageSelector = (state: state) =>
  state.tickePackage.ticketPackageList;
export const filterByTextSelector = (state: state) =>
  state.tickePackage.filter.searchText;

export const ticketPackageRemainingSelector = createSelector(
  ticketPackageSelector,
  filterByTextSelector,
  (list, searchText: string) => {
    return list.filter((item: any) => {
      return item.maGoi
        ?.toLowerCase()
        ?.includes(searchText?.toLocaleLowerCase());
    });
  }
);
