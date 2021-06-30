import { useState, useEffect } from 'react'
    
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
      {props.errors.email ? props.errors.email.map(err => <p className='alert'>{err}</p>) : null}
      {props.errors.password ? props.errors.password.map(err => <p className='alert'>{err}</p>) : null}
      {props.errors.password_confirmation ? props.errors.password_confirmation.map(err => <p className='alert'>{err}</p>) : null}
    </div>
  )
}

export default Message;