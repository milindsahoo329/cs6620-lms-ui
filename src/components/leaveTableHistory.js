import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import React, { useState } from "react";
import axios from 'axios';


function LeaveTableHistory({ rows }) {

    return (


        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Case Number</TableCell>
                        <TableCell align="right">Employee Name</TableCell>
                        <TableCell align="right">Employee Number</TableCell>
                        {/* <TableCell align="right">Approved Status</TableCell> */}
                        <TableCell align="right">Reason</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.case_no}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.case_no}
                            </TableCell>
                            <TableCell align="right">John Doe</TableCell>
                            <TableCell align="right">{row.emp_no}</TableCell>
                            {/* <TableCell align="right">{row.status}</TableCell> */}
                            <TableCell align="right">{row.reason}</TableCell>
                            <TableCell>
                                <CustomButton value={"test"} case_no={"xyz"} status={row.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function CustomButton({ case_no, value, status }) {

    const [disable, setDisable] = useState(false);

    return (
        <>
            <Button disabled={disable} onClick={() => {
                setDisable(true);
                // make a axios call to approve
                var data = JSON.stringify({
                    "case_no": case_no
                });

                var config = {
                    method: 'post',
                    url: 'https://9gxa5cbffj.execute-api.us-east-1.amazonaws.com/default/lms-approve-leave',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }}>
                APPROVE
            </Button>
            <Button disabled={disable} onClick={() => {
                setDisable(true);
                // make a axios call to deny

                var data = JSON.stringify({
                    "case_no": case_no
                });

                var config = {
                    method: 'post',
                    url: 'https://9gxa5cbffj.execute-api.us-east-1.amazonaws.com/default/lms-disapprove-leave',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }}>
                DENY
            </Button>
        </>

    );
}

export default LeaveTableHistory;