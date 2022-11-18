import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const User = ({ user }) => {
  if (!user) {
    return null
  }
  const { blogs } = useSelector((store) => store)

  const blogsToDisplay = blogs.filter((blog) => blog.user.id === user.id)

  return (
    <div key={user.id}>
      {blogsToDisplay.map((blog) => (
        <div key={blog.id} className="blogList">
          <Link to={`/blogs/${blog.id}`}>
            <h3>{blog.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default User
