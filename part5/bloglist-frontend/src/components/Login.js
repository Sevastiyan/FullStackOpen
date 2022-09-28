const Blog = ({ props, handlers }) => {
  const { username, password } = props
  const { setUsername, setPassword, handleLogin } = handlers

  return (
    <form onSubmit={handleLogin}>
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
export default Blog