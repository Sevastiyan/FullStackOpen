import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import '../index.css'

const BlogList = () => {
  const dispatch = useDispatch()
  const { blogs } = useSelector((state) => {
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

  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <br />
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className="blogList">
            <table>
              <tbody>
                <tr>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>
                      <h3>{blog.title}</h3>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
