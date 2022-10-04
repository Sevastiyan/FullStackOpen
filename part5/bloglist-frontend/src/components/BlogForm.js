import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
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
