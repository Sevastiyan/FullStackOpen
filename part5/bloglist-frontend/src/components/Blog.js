import { useState } from 'react'

const Blog = ({ blog, isPersonal, onLike, onRemove }) => {
  const [details, setDetails] = useState(false)
  console.log(blog.user)
  console.log(isPersonal)
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
      <div style={blogStyle}>
        <p>
          Title: {blog.title}
          <button onClick={() => setDetails(!details)}>hide</button>
        </p>
        <p>Author: {blog.author}</p>
        <p>
          Likes: {blog.likes}
          <button onClick={() => increaseLike(blog)}>like</button>
        </p>

        <p>url: {blog.url}</p>
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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setDetails(!details)}>view</button>
    </div>
  )
}

export default Blog
