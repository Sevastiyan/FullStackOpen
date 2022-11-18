import useField from '../hooks/useField'
import service from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewComment } from '../reducers/blogReducer'

const Comments = () => {
  const { id } = useParams()
  const { blogs } = useSelector((state) => state)
  const blog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()
  const comment = useField('text')

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    try {
      const savedComment = await service.addComment(id, comment.value)
      dispatch(addNewComment(blog, savedComment))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Comments</h2>
      <br />
      <form onSubmit={handleCommentSubmit}>
        <input {...comment} />
        <button>create</button>
      </form>
      <ul>
        {blog.comments.map((c) => {
          return <li key={c.id}>{c.content}</li>
        })}
      </ul>
    </div>
  )
}

export default Comments
