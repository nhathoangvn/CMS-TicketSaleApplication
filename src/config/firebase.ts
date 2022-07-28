import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBlf6cgMSInXSgMTnc-hoaOg_iCRobRIxc",
  authDomain: "cms-ticket-sale-applicat-8f40d.firebaseapp.com",
  projectId: "cms-ticket-sale-applicat-8f40d",
  storageBucket: "cms-ticket-sale-applicat-8f40d.appspot.com",
  messagingSenderId: "783246767118",
  appId: "1:783246767118:web:25911a0c24cd5e308cf85f",
  measurementId: "G-FXDZ98T7X5",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
