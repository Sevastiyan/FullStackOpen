import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { Routes, Route, Link, useMatch, Navigate } from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const { user, users, blogs } = useSelector((state) => {
    return state
  })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const userToDisplay = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogToDisplay = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
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
          Logged in as {user.name}
          <button id="logout-button" onClick={handleLogOut}>
            logout
          </button>
        </div>
        <Notification />
        <h2>Blogs App</h2>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User user={userToDisplay} />} />
          <Route
            path="/blogs/:id"
            element={
              blogToDisplay ? (
                <Blog blog={blogToDisplay} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
