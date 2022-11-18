import { useSelector } from 'react-redux'
import '../index.css'
import { Alert } from '@mui/material'

const Notification = () => {

  const notification = useSelector((state) => {
    return state.notification
  })
  
  const { message, type } = notification
  if (message === '') {
    return
  }

  console.log('Notificaiton type: ', type)

  if (type === 'error') {
    return <Alert className="error">{message}</Alert>
  } else {
    return <Alert className="success">{message}</Alert>
  }
}

export default Notification
