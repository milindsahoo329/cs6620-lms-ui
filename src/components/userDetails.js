import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function UserDetails() {


    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Leaves Remaining</TableCell>
                        <TableCell align="right">Leaves Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow
                            key={localStorage.getItem('user-name')}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {localStorage.getItem('user-name')}
                            </TableCell>
                            <TableCell align="right">{localStorage.getItem('user-leaves-rem')}</TableCell>
                            <TableCell align="right">{localStorage.getItem('user-leaves-total')}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserDetails;