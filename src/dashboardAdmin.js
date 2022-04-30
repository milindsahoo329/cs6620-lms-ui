import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserDetails from "./components/userDetails";
import LeaveTableHistory from "./components/leaveTableHistory";
import LeaveTableApplied from "./components/leaveTableApplied";
import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import ApplyLeave from "./components/ApplyLeave";
import axios from "axios";

import "../src/styles.css";


function DashboardAdmin() {

  return (

    <Container>

      <Box>
        <UserDetails />
      </Box>

      <LeaveAppliedList />

      <LeaveApprovalList />

      <ApplyLeave />

    </Container>

  );



}


function LeaveApprovalList() {

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);


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
        url: 'https://9gxa5cbffj.execute-api.us-east-1.amazonaws.com/default/lms-get-approvals',
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
      <div style={{ marginTop: 20 }}><b>Approvals List</b></div>

      <Box mt={5 + 'px'}>
        <LeaveTableHistory rows={data} />
      </Box>
    </>
  );

}


function LeaveAppliedList() {


  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);


  async function getData() {
    try {
      setIsLoading(true);
      let data = await postAxiosForLeaveHistory();
      setIsLoading(false);
      setData(data);
    } catch (err) {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    getData();
  }, []);

  async function postAxiosForLeaveHistory() {
    return new Promise(function (resolve, reject) {

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





export default DashboardAdmin;
