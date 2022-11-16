import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { logoutUser } from './reducers/loginReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const { blogs, user } = useSelector((state) => {
    return state
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleCreateBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(
        notify(
          {
            message: `A new blog ${blogObject.title} has been added`,
            type: '',
          },
          2
        )
      )
    } catch (error) {
      dispatch(notify({ message: 'Title or Url missing', type: 'error' }, 3))
      console.log('Error: ', error)
    }
  }

  const handleLike = async (blogObject) => {
    console.log('🚀 ~ file: App.js ~ line 49 ~ blogObject', blogObject)
    try {
      dispatch(likeBlog(blogObject))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blogObject}`, type: 'error' }, 3)
      )
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      dispatch(removeBlog(blogObject))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blogObject}`, type: 'error' }, 3)
      )
    }
  }

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
        <Notification />
        <h2>Blogs</h2>
        <p>
          Logged in as {user.name}
          <button id="logout-button" onClick={handleLogOut}>
            logout
          </button>
        </p>
        <Togglable buttonLabel="New Blog">
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>
        <br />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={handleLike}
            isPersonal={blog.user.username === user.username}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  )
}

export default App
