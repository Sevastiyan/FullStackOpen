import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // useEffect(() => {
  //   const loggedUserJson = window.localStorage.getItem('loggedUser')
  //   if (loggedUserJson) {
  //     const user = JSON.parse(loggedUserJson)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // })

  // const handleLogin = async (event) => { 
  //   event.preventDefault()

  //   try { 
  //     const user = await loginService.login({
  //       username, password
  //     })
  //   } catch {
  //     console.log('Wrong Credentials');
  //   }
  // }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
