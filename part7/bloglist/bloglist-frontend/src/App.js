import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, updateBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    return state.blogs
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userInput) => {
    console.log(userInput)
    try {
      const user = await loginService.login(userInput)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      dispatch(notify({ message: `Welcome ${user.username}` }, 5))
    } catch (error) {
      dispatch(
        notify({ message: 'Wrong Username or Password', type: 'error' }, 3)
      )
      console.log('Wrong Credentials', error)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.postBlog(blogObject)
      dispatch(
        notify(
          {
            message: `A new blog ${blogObject.title} has been added`,
            type: '',
          },
          2
        )
      )
      dispatch(updateBlogs([...blogs, newBlog]))
    } catch (error) {
      dispatch(notify({ message: 'Title or Url missing', type: 'error' }, 3))
      console.log('Error: ', error)
    }
  }

  const handleLike = async (blogObject) => {
    try {
      blogObject.likes = blogObject.likes + 1
      const likedBlog = await blogService.updateBlog(blogObject)
      dispatch(updateBlogs(
        blogs.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog))
      ))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blogObject}`, type: 'error' }, 3)
      )
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      const removedBlog = await blogService.deleteBlog(blogObject)
      console.log(removedBlog)
      dispatch(
        updateBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      )
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blogObject}`, type: 'error' }, 3)
      )
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken('')
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm onSubmit={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <Notification />
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
