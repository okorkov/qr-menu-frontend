import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  center: {
    textAlign: 'center'
  }
});



export default function DenseTable(props) {
  const classes = useStyles();

  const handleDate = (dateFromDB) => {
    if (dateFromDB){
      let getDate = dateFromDB.split('T');
      let fullDate = getDate[0].split('-')
      return `${fullDate[1]}/${fullDate[2]}/${fullDate[0]}`;
    } else {
      return 'unknown'
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.center}>File Name</TableCell>
            <TableCell className={classes.center} align="right">File </TableCell>
            <TableCell className={classes.center} align="right">QR Code</TableCell>
            <TableCell className={classes.center} align="right">Uploaded</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.link.split('/')[row.link.split('/').length - 1]}
              </TableCell>
             <TableCell className={classes.center} align="right"><a href={row.link} target="_blank">Open File</a></TableCell>
              <TableCell className={classes.center} align="right"><a href={row.qr_code_link} target="_blank">Open QR</a></TableCell>
              <TableCell className={classes.center} align="right">{handleDate(row.updated_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}