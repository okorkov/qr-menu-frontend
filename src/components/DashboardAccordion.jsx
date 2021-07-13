import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DashboardTable from './DashboardTable';

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

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Single Files</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <DashboardTable data={props.data.allFiles.reverse()}/>

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>QR Menu</Typography>
        </AccordionSummary>
        <AccordionDetails style={{textAlign: 'center', justifyContent: 'center'}}>
          <>
          {
            props.data.menuQRLink ?
            <a href={props.data.menuQRLink} style={{marginRight:'2em'}} target="_blank">View QR Code</a>
            :
            <p style={{marginRight:'2em'}}>No QR Code Generated</p>
          }
          {
            props.data.menuFile ?
            <>
            <a href={props.data.domainLink} style={{marginRight:'2em'}} target="_blank">View File</a>
            </>
            :
            <p style={{marginLeft:'2em'}}>No File Uploaded </p>
          }
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
