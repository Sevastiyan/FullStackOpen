import { useSelector } from 'react-redux'
import '../index.css'

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
    return <div className="error">{message}</div>
  } else {
    return <div className="success">{message}</div>
  }
}

export default Notification
