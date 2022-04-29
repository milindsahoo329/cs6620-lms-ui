import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';

import Login from './Login';

import Dashboard from './dashboard';
import DashboardAdmin from "./dashboardAdmin";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import "./styles.css";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/dashboardAdmin" element={<DashboardAdmin/>}/>
        </Routes>
    </Router>
  );
}



export default App;
