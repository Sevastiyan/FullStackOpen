import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(
        blogs.sort((a, b) => {
          return a.likes < b.likes
        })
      )
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      console.log(user);
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (userInput) => {
    console.log(userInput)
    try {
      const user = await loginService.login(userInput)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
    } catch {
      notify(`Wrong Username or Password`, 'error')
      console.log('Wrong Credentials')
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const blog = await blogService.postBlog(blogObject)
      notify(`A new blog ${blogObject.title} has been added`)
      setBlogs([...blogs, blog])
    } catch (error) {
      notify(`Title or Url missing`, 'error')
      console.log('Error: ', error)
    }
  }

  const handleLike = async (blogObject) => {
    try {
      blogObject.likes = blogObject.likes + 1
      const likedBlog = await blogService.updateBlog(blogObject)
      setBlogs(
        blogs.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog))
      )
    } catch {
      notify(`Problem with like ${blogObject}`, 'error')
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      const removedBlog = await blogService.deleteBlog(blogObject)
      console.log(removedBlog)
      setBlogs(
        blogs.filter((blog) => (blog.id !== blogObject.id))
      )
    } catch {
      notify(`Problem with like ${blogObject}`, 'error')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken('')
  }

  if (user === null) {
    return <LoginForm onSubmit={handleLogin} />
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <p>
          Logged in as {user.name}
          <button onClick={handleLogOut}>logout</button>
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
