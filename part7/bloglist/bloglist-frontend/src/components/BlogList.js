import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { notify } from './reducers/notificationReducer'
import Blog from './Blog'
import blogService from './services/blogs'


const Bloglist = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => {
    console.log(blogs)
    return blogs
  })

  const handleLike = async (blogObject) => {
    try {
      blogObject.likes = blogObject.likes + 1
      const likedBlog = await blogService.updateBlog(blogObject)
      dispatch(initializeBlogs(
        blogs.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog))
      ))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blogObject}`, type: 'error' }, 3)
      )
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      const removedBlog = await blogService.deleteBlog(blogObject)
      console.log(removedBlog)
      dispatch(initializeBlogs(blogs.filter((blog) => blog.id !== blogObject.id)))
    } catch (error) {
      dispatch(
        notify({ message: `Problem with like ${blogObject}`, type: 'error' }, 3)
      )
    }
  }


  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={handleLike}
          // isPersonal={blog.user.username === user.username}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}

export default Bloglist
