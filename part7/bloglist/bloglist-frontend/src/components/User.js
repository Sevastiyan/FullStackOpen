const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div key={user.id}>
      {user.blogs.map((blog) => (
        <ul key={String(Math.floor(Math.random() * 100))}>
          <li>{blog.title}</li>
        </ul>
      ))}
    </div>
  )
}

export default User
