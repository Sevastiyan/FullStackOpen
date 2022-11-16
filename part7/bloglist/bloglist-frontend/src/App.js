import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const { user, users } = useSelector((state) => {
    return state
  })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const match = useMatch('/users/:id')
  const userToDisplay = match
    ? users.find((u) => u.id === match.params.id)
    : null

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <div>
        <div>
          <Link style={{ padding: 5 }} to="/">
            home
          </Link>
          <Link style={{ padding: 5 }} to="/users">
            users
          </Link>
        </div>
        <Notification />
        <h2>Blogs App</h2>
        <p>
          Logged in as {user.name}
          <button id="logout-button" onClick={handleLogOut}>
            logout
          </button>
        </p>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User user={userToDisplay} />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
