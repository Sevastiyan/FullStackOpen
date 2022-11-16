import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const userInput = { username, password }
    console.log(userInput)
    dispatch(loginUser(userInput))
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:{''}
        <input
          id="username"
          type="text"
          // value={username}
          name="Username"
          // onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:{''}
        <input
          id="password"
          type="password"
          // value={password}
          name="Password"
          // onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
