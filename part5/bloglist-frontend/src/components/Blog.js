import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, isPersonal, onLike, onRemove }) => {
  const [details, setDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // const isPersonal = true

  const increaseLike = () => {
    onLike(blog)
  }

  const removeBlog = () => {
    onRemove(blog)
  }

  if (details) {
    return (
      <div id='blog' style={blogStyle} className='blogDetails'>
        <p className='title'>
          Title: {blog.title}
          <button onClick={() => setDetails(!details)}>hide</button>
        </p>
        <p className='author'>Author: {blog.author}</p>
        <p>
          Likes: {blog.likes}
          <button onClick={() => increaseLike(blog)}>like</button>
        </p>

        <p className='url'>url: {blog.url}</p>
        <div>
          {isPersonal ? (
            <div>
              <button onClick={removeBlog}>remove</button>
            </div>
          ) : (
            <br/>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setDetails(!details)}>view</button>
    </div>
  )
}

Blog.propTypes = { 
  blog: PropTypes.object.isRequired,
  isPersonal: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default Blog
