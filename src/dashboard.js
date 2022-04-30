import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserDetails from "./components/userDetails";
import LeaveTableHistory from "./components/leaveTableHistory";
import LeaveTableApplied from "./components/leaveTableApplied";
import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import ApplyLeave from "./components/ApplyLeave";
import axios from "axios";

import "./styles.css";


function Dashboard() {


  return (
    <Container>

      <Box>
        <UserDetails />
      </Box>

      <LeaveAppliedList />

      <ApplyLeave />

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




export default Dashboard;
