import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const dispatch = useDispatch()
  const { blogs, user } = useSelector((state) => {
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

  const handleLike = async (blogObject) => {
    try {
      dispatch(likeBlog(blogObject))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blogObject}`, type: 'error' }, 3)
      )
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      dispatch(removeBlog(blogObject))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blogObject}`, type: 'error' }, 3)
      )
    }
  }

  return (
    <div>
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
  )
}

export default BlogList
