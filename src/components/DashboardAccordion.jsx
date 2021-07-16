import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DashboardTable from './DashboardTable';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'theme.palette.text.secondary',
  },
}));

function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const lang = props.menus.lang
  const text = {
    en: {
      singleFile: 'Single Files',
      qrmenu: "QR Menu",
      viewQr: 'View QR Code',
      noQr: 'No QR Code Generated',
      viewFile: 'View File',
      noFile: 'No File Attached'
    },
    ru: {
      singleFile: 'Одиночные Файлы',
      qrmenu: 'QR Меню',
      viewQr: 'Посмотреть QR код',
      noQr: 'QR не сгенерирован',
      viewFile: 'Посмотреть Файл',
      noFile: 'Файл не загружен'
    }
  }

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>{text[lang].singleFile}</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <DashboardTable data={props.data.allFiles}/>

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>{text[lang].qrmenu}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{textAlign: 'center', justifyContent: 'center'}}>
          <>
          {
            props.data.menuQRLink ?
            <a href={props.data.menuQRLink} style={{marginRight:'2em'}} target="_blank">{text[lang].viewQr}</a>
            :
            <p style={{marginRight:'2em'}}>{text[lang].noQr}</p>
          }
          {
            props.data.menuFile ?
            <>
            <a href={`/menu/${props.data.domainLink.split('/')[props.data.domainLink.split('/').length - 1]}`} target="_blank">{text[lang].viewFile}</a>
            
            </>
            :
            <p style={{marginLeft:'2em'}}>{text[lang].noFile}</p>
          }
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(ControlledAccordions);