import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  center: {
    textAlign: 'center'
  }
});



function DenseTable(props) {
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

  const handleDateRu = (dateFromDB) => {
    if (dateFromDB){
      let getDate = dateFromDB.split('T');
      let fullDate = getDate[0].split('-')
      return `${fullDate[2]}/${fullDate[1]}/${fullDate[0]}`;
    } else {
      return 'unknown'
    }
  }

  const lang = props.menus.lang
  const text = {
    en: {
      fileName: 'File Name',
      file: 'File',
      qrCode: 'QR Code',
      uploaded: 'Uploaded',
      openFile: 'Open File',
      openQr: 'Open QR',
    },
    ru: {
      fileName: 'Имя Файла',
      file: 'Файл',
      qrCode: 'QR Код',
      uploaded: 'Дата Загрузки',
      openFile: 'Открыть Файл',
      openQr: 'Открыть QR Код',
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.center}>{text[lang].fileName}</TableCell>
            <TableCell className={classes.center} align="right">{text[lang].file}</TableCell>
            <TableCell className={classes.center} align="right">{text[lang].qrCode}</TableCell>
            <TableCell className={classes.center} align="right">{text[lang].uploaded}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.slice(0).reverse().map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.link.split('/')[row.link.split('/').length - 1]}
              </TableCell>
             <TableCell className={classes.center} align="right"><a href={row.link} target="_blank">{text[lang].openFile}</a></TableCell>
              <TableCell className={classes.center} align="right"><a href={row.qr_code_link} target="_blank">{text[lang].openQr}</a></TableCell>
              <TableCell className={classes.center} align="right">{(lang === 'en') ? handleDate(row.updated_at) : handleDateRu(row.updated_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(DenseTable);