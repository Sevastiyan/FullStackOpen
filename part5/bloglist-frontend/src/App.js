import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification';
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      notify(`Wrong Username or Password`, 'error')
      console.log('Wrong Credentials')
    }
  }
  
  const handleCreateNew = async (event) => {
    event.preventDefault()

    try {
      await blogService.postBlog({
        title,
        author,
        url
      })
      notify(`A new blog ${title} has been added`)

      blogService.getAll().then((blogs) => setBlogs(blogs))

      // Offline:
      // const blog = await blogService.postBlog({...})
      // setBlogs([...blogs, blog])
    } catch (error) {
      notify(`Title or Url missing`, 'error')
      console.log('Error: ', error)
    }
  }
  
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken('')
  }
  
  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <Notification notification={notification} />

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

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <p>
          Logged in as {user.name}
          <button onClick={handleLogOut}>logout</button>
        </p>
        <br />
        <h2>Create New</h2>
        <br />
        <form onSubmit={handleCreateNew}>
          <div>
            Title: {''}
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
            <br />
            Author: {''}
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
            <br />
            URL: {''}
            <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="sublit">Create</button>
        </form>
        <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default App
