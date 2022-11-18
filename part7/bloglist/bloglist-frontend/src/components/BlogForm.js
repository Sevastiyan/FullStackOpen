import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import useField from '../hooks/useField'

const BlogForm = () => {
  const dispatch = useDispatch()
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    dispatch(createBlog(blog))
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreateBlog}>
        <div className="addBlog">
          Title: {''}
          <input {...title} />
          <br />
          Author: {''}
          <input {...author} />
          <br />
          URL: {''}
          <input {...url} />
        </div>
        <br />
        <button id="create-blog-button" type="sublit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
