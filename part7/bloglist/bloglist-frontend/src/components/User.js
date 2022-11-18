import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, ListItem, Typography } from '@mui/material'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  const { blogs } = useSelector((store) => store)

  const blogsToDisplay = blogs.filter((blog) => blog.user.id === user.id)

  return (
    <div>
      <Typography variant='h6'>{user.username}`s saved Blogs</Typography>
      <List>
        {blogsToDisplay.map((blog) => (
          <ListItem key={blog.id} className="blogList">
            <Link to={`/blogs/${blog.id}`}>
              <Typography >{blog.title}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
