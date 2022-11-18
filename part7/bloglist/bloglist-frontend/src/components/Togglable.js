import { useState } from 'react'
import { Button } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id="new-blog-form-button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button id="cancel-new-blog-button" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
