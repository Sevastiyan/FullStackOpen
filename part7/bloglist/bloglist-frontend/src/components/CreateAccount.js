import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/usersReducer'
import service from '../services/login'
import useField from '../hooks/useField'

const CreateAccount = () => {
  const dispatch = useDispatch()
  const { setValue: setUsername, ...username } = useField('text', 'username')
  const { setValue: setName, ...name } = useField('text', 'name')
  const { setValue: setPassword, ...password } = useField(
    'password',
    'password'
  )

  const handleCreate = async (event) => {
    event.preventDefault()
    const userInput = {
      username: username.value,
      name: name.value,
      password: password.value,
    }
    console.log(userInput)
    const returnedUser = await service.create(userInput)
    dispatch(
      notify({ message: `${returnedUser.username} has been created` }, 2)
    )
    dispatch(initializeUsers())
    setUsername('')
    setPassword('')
    setName('')
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          Username:{''}
          <input {...username} />
        </div>
        <div>
          Name:
          <input {...name} />
        </div>
        <div>
          Password:{''}
          <input {...password} />
        </div>
        <button id="login-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default CreateAccount
