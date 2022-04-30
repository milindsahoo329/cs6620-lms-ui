import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserDetails from "./components/userDetails";
import LeaveTableApprovals from "./components/leaveTableApprovals";
import LeaveTableApplied from "./components/leaveTableApplied";
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

import image1 from './images/logo512.png';


function DashboardAdmin() {


  return (

    <Container>

      <Box m={2} pt={3}
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src={image1}
      />

      <Box m={2} pt={3}>
        <UserDetails />
        <HistoryCard />
        <ApprovalsCard />
        <LeaveApplicationCard />
      </Box>

    </Container>

  );



}


function HistoryCard() {

  const navigate = useNavigate();
  const handleSubmitLeaveHistory = async (event) => {
    event.preventDefault();
    navigate("/leavehistory", { replace: true });
  }


  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Do you want to check your leaves ?
        </Typography>
        <Typography variant="h5" component="div">
          LEAVE HISTORY
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSubmitLeaveHistory}>CLICK TO VIEW</Button>
      </CardActions>
    </React.Fragment>
  );


  return (
    <Box m={2} pt={3} sx={{ minWidth: 300 }} display="inline-block">
      <Card variant="outlined">{card}</Card>
    </Box>
  );

}


function ApprovalsCard() {

  const navigate = useNavigate();
  const handleSubmitLeaveHistory = async (event) => {
    event.preventDefault();
    navigate("/leaveapprovals", { replace: true });
  }


  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Want to approve leaves for your employees ?
        </Typography>
        <Typography variant="h5" component="div">
          LEAVE APPROVALS
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSubmitLeaveHistory}>CLICK TO VIEW</Button>
      </CardActions>
    </React.Fragment>
  );


  return (
    <Box m={2} pt={3} sx={{ minWidth: 300 }} display="inline-block">
      <Card variant="outlined">{card}</Card>
    </Box>
  );

}


function LeaveApplicationCard() {

  const navigate = useNavigate();
  const handleSubmitLeaveHistory = async (event) => {
    event.preventDefault();
    navigate("/leaveapp", { replace: true });
  }


  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Do you want to apply for a leave ?
        </Typography>
        <Typography variant="h5" component="div">
          LEAVE APPLICATION FORM
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSubmitLeaveHistory}>CLICK TO APPLY</Button>
      </CardActions>
    </React.Fragment>
  );


  return (
    <Box m={2} pt={3} sx={{ minWidth: 300 }} display="inline-block">
      <Card variant="outlined">{card}</Card>
    </Box>
  );

}





export default DashboardAdmin;
