import useField from '../hooks/useField'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewComment } from '../reducers/blogReducer'

const Comments = () => {
  const { setValue, ...comment } = useField('text')
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs).find(
    (blog) => blog.id === id
  )
  const dispatch = useDispatch()

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    dispatch(addNewComment(blog, comment.value))
    setValue('')
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
