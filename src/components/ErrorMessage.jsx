import { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
    
const Message = (props) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  if (!show) {
    return null;
  }
  return (
    <div>
      {props.errors.email ? props.errors.email.map(err => <Alert severity="error" style={{textAlign: 'center', justifyContent: 'center'}}> <AlertTitle>Error</AlertTitle>{err}</Alert>) : null}
      {props.errors.password ? props.errors.password.map(err => <Alert severity="error" style={{textAlign: 'center', justifyContent: 'center'}}> <AlertTitle>Error</AlertTitle>{err}</Alert>) : null}
      {props.errors.password_confirmation ? props.errors.password_confirmation.map(err => <Alert severity="error" style={{textAlign: 'center', justifyContent: 'center'}}> <AlertTitle>Error</AlertTitle>{err}</Alert>) : null}
    </div>
  )
}

export default Message;

