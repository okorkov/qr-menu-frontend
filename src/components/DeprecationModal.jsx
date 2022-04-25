import React from 'react';
import ReactJsAlert from "reactjs-alert"

const Deprecationmodal = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ReactJsAlert
        status={open}   // true or false
        type="warning"   // success, warning, error, info
        title="The project is being deprecated and will be shut down on 06/01/2022. Thank you for using the platform!"   // title you want to display
        Close={handleClose}   // callback method for hide
      />
    </div>
  );
}

export default Deprecationmodal;
