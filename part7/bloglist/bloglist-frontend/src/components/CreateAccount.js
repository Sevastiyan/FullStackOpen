import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/usersReducer'
import service from '../services/login'

const CreateAccount = () => {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const name = event.target.name.value
    const password = event.target.password.value
    const userInput = { username, name, password }
    console.log(userInput)
    const returnedUser = await service.create(userInput)
    dispatch(notify({ message: `${returnedUser} has been created` }, 2))
    dispatch(initializeUsers())
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          Username:{''}
          <input id="username" type="text" name="Username" />
        </div>
        <div>
          Name:
          <input id="name" type="name" name="Name" />
        </div>
        <div>
          Password:{''}
          <input id="password" type="password" name="Password" />
        </div>
        <button id="login-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default CreateAccount
