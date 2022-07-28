import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ListTicketPackage from "./pages/ListTicketPackage/ListTicketPackage";
import ManageTicket from "./pages/ManageTicket/ManageTicket";
import Statistic from "./pages/Statistic/Statistic";
import TicketChange from "./pages/TicketChange/TicketChange";
import Home from "./views/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Statistic />} />
          <Route path="/manage-ticket" element={<ManageTicket />} />
          <Route path="/ticket-change" element={<TicketChange />} />
          <Route path="/list-ticket-package" element={<ListTicketPackage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
