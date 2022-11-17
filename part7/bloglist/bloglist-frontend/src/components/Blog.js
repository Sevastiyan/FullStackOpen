import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
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
      dispatch(removeBlog(blog))
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
    <div id="blog" style={blogStyle} className="blogDetails">
      <h1 className="title">Title: {blog.title}</h1>
      <p className="author">Author: {blog.author}</p>
      Likes: {blog.likes}
      <button onClick={() => handleLike()}>like</button>

      <p className="url">url: {blog.url}</p>
      <div>
        {isPersonal ? (
          <div>
            <button onClick={() => handleRemove()}>remove</button>
          </div>
        ) : (
          <br />
        )}
      </div>
    </div>
  )
}

export default Blog
