import React, { useState } from "react";
import ReactDOM from "react-dom";
import UserDetails from "./components/userDetails";
import LeaveTableHistory from "./components/leaveTableHistory";
import Container from '@mui/material/Container';
import { Box } from "@mui/system";

import "./styles.css";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Dashboard() {

  const isSubmitted = true;

  return (
    <Container>

      <Box>
        <UserDetails rows={rows} />
      </Box>

      <Box mt={10}>
        <LeaveTableHistory rows={rows} />
      </Box>

    </Container>

  );



}



export default Dashboard;
