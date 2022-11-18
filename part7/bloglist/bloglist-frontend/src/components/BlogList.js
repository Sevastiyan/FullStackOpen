import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import '../index.css'
import {
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material'

const BlogList = () => {
  const dispatch = useDispatch()
  const { blogs, users } = useSelector((state) => {
    return state
  })

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

  const user = (blog) => {
    const u = users.find((u) => u.id === blog.user.id)
    return u ? u.username : ''
  }

  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Likes</TableCell>
              <TableCell align="right">Added by</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell align="right">{blog.author}</TableCell>
                <TableCell align="right">{blog.likes}</TableCell>
                <TableCell align="right">
                  <Link to={`/users/${blog.user.id}`}>{user(blog)}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
