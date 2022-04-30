import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import ApplyLeave from "./components/ApplyLeave";
import axios from "axios";

import "../src/styles.css";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link, useNavigate } from 'react-router-dom';

function LeaveApplication() {

    const [remLeaves, setRemLeaves] = useState(localStorage.getItem('user-leaves-rem'));

    return (

        <Container>
            <div>
                <h4>Number of leaves remaining - {remLeaves} !!! </h4>
            </div>
            <ApplyLeave disable={true}/>
        </Container>
        
    );

}

export default LeaveApplication;