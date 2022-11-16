import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    handleCreateBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

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
      <br />
      <h2>Create New</h2>
      <br />
      <form onSubmit={addBlog}>
        <div className='addBlog'>
          Title: {''}
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            placeholder='title'
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          Author: {''}
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            placeholder='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          URL: {''}
          <input
            id='url'
            type="text"
            value={url}
            name="URL"
            placeholder='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-blog-button' type="sublit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
