import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';

import Login from './Login';

import Dashboard from './dashboard';
import DashboardAdmin from "./dashboardAdmin";
import LeaveHistory from "./leaveHistory";
import LeaveApprovals from "./leaveApprovals";
import LeaveApplication from "./leaveApplication";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import "./styles.css";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/dashboardAdmin" element={<DashboardAdmin/>}/>
          <Route exact path="/leavehistory" element={<LeaveHistory/>}/>
          <Route exact path="/leaveapprovals" element={<LeaveApprovals/>}/>
          <Route exact path="/leaveapp" element={<LeaveApplication/>}/>
        </Routes>
    </Router>
  );
}



export default App;
