import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import Comments from './Comments'

import { Box, Typography, Button } from '@mui/material'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store)
  const isPersonal = blog.user.username === user.username

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blog}`, type: 'error' }, 3)
      )
    }
  }

  const handleRemove = async () => {
    try {
      dispatch(deleteBlog(blog))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blog}`, type: 'error' }, 3)
      )
    }
  }

  if (!blog) {
    return null
  }

  return (
    <Box sx={{ pb: 7 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" className="author">{blog.author}</Typography>
      <Typography className="url">url: {blog.url}</Typography>
      <Typography>Likes: {blog.likes}</Typography>
      <Button
        variant="contained"
        onClick={() => handleLike()}
      >
        like
      </Button>
      <div>
        {isPersonal ? (
          <Button onClick={() => handleRemove()}>remove</Button>
        ) : (
          <br />
        )}
      </div>
      <Comments blog={blog} />
    </Box>
  )
}

export default Blog
