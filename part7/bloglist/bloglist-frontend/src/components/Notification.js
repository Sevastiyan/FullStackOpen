const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, type } = notification
  console.log(type)

  if (type === 'error') {
    return <div className="error">{message}</div>
  } else {
    return <div className="success">{message}</div>
  }
}

export default Notification
