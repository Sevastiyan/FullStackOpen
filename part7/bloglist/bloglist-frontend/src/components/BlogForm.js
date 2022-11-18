import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import useField from '../hooks/useField'
import { TextField, Button } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()
  const { setValue: setTitle, ...title } = useField('text', 'title')
  const { setValue: setAuthor, ...author } = useField('text', 'author')
  const { setValue: setUrl, ...url } = useField('text', 'url')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    dispatch(createBlog(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreateBlog}>
        <div className="addBlog">
          <TextField fullWidth variant="filled"  {...title} />
          <br />
          <TextField fullWidth variant="filled"   {...author} />
          <br />
          <TextField fullWidth variant="filled"  {...url} />
        </div>
        <br />
        <Button id="create-blog-button" type="sublit">
          Create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
