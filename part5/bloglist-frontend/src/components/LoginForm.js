import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ onSubmit: login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => { 
    event.preventDefault()
    login({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:{''}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:{''}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

Blog.propTypes = { 
  onSubmit: PropTypes.func.isRequired
}

export default Blog