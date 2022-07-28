import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../config/firebase";
import { TicketPackageAction } from "../actions/TicketPackageAction";

export const getData =
  () => async (dispatch: Dispatch<TicketPackageAction>) => {
    try {
      const ticketPackageCollectionRef = collection(db, "ticket-package");
      const data = await getDocs(ticketPackageCollectionRef);
      dispatch({
        type: "GET_DATA",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const addTicketPackage =
  (ticketPackage: any) => async (dispatch: Dispatch<TicketPackageAction>) => {
    try {
      const ticketCollectionRef = collection(db, "ticket-package");
      const data = await addDoc(ticketCollectionRef, ticketPackage);
      dispatch({
        type: "ADD_DATA",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const filterBySearchText =
  (searchText: string) => async (dispatch: Dispatch<TicketPackageAction>) => {
    try {
      dispatch({
        type: "FILTER_BY_TEXT",
        payload: searchText,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const updateTicketPackage =
  (id: string, ticketPackage: any) =>
  async (dispatch: Dispatch<TicketPackageAction>) => {
    try {
      const docRef = doc(db, "ticket-package", id);
      const data = await setDoc(docRef, ticketPackage);
      dispatch({
        type: "UPDATE_DATA",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
