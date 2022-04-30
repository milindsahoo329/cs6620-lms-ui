import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserDetails from "./components/userDetails";
import LeaveTableApplied from "./components/leaveTableApplied";
import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import axios from "axios";

import "./styles.css";

import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import image1 from './images/logo192.png';


function LeaveHistory() {

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

      <LeaveAppliedList />

      <DashboardCard />

    </Container>

  );



}

function LeaveAppliedList() {

  //const [dataAppliedListRows, setDataAppliedListRows] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  let dataAppliedListRows = [];

  async function getData() {
    try {
      setIsLoading(true);
      let data = await postAxiosForApprovalList();
      setIsLoading(false);
      setData(data);
    } catch (err) {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    getData();
  }, []);

  async function postAxiosForApprovalList() {
    return new Promise(function (resolve, reject) {
      // let data = [
      //   {
      //     "approver_emp_no": 0,
      //     "status": "completed",
      //     "timestamp": "2022-04-28T04:00:38.212Z",
      //     "accepted": "no",
      //     "case_no": "7398c419-1771-475f-958c-93adb84ad6dc",
      //     "emp_no": 2,
      //     "reason": "Personal work"
      //   }
      // ];

      // resolve(data);

      var config = {
        method: 'get',
        url: 'https://9gxa5cbffj.execute-api.us-east-1.amazonaws.com/default/lms-get-leave-history',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      axios(config)
        .then(function (response) {
          //console.log(response.data.Items)
          resolve(response.data.Items);
        })
        .catch(function (error) {
          console.log(error);
          resolve(false);
        });


    });
  }

  return (
    <>
      <div style={{ marginTop: 20 + 'px' }}><b>Leaves Applied</b></div>

      <Box mt={5 + 'px'}>
        <LeaveTableApplied rows={data} />
      </Box>
    </>
  );

}

function DashboardCard() {

  const navigate = useNavigate();
  const handleSubmitLeaveHistory = async (event) => {
    event.preventDefault();
    if (localStorage.getItem('user-role') == "approver") {
      navigate("/dashboardAdmin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }


  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Done watching ??
        </Typography>
        <Typography variant="h5" component="div">
          LETS GET BACK TO DASHBOARD
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSubmitLeaveHistory}>CLICK TO GO BACK TO HOME</Button>
      </CardActions>
    </React.Fragment>
  );


  return (
    <Box m={2} pt={3} sx={{ minWidth: 300 }} display="inline-block">
      <Card variant="outlined">{card}</Card>
    </Box>
  );

}


export default LeaveHistory;
