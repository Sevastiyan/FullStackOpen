import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const userInput = { username, password }
    console.log(userInput)

    try {
      await dispatch(loginUser(userInput))
    } catch (exception) {
      dispatch(
        notify({ message: 'Wrong Username or Password', type: 'error' }, 3)
      )
      console.log('Wrong Credentials', exception)
    }
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
