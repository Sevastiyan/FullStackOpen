import useField from '../hooks/useField'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewComment } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { List, ListItemText, TextField, Button, Divider, Typography } from '@mui/material'

const Comments = () => {
  const { setValue, ...comment } = useField('text', 'text')
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
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">Comments</Typography>
      <Divider />
      <List>
        {blog.comments.map((c) => {
          return <ListItemText key={c.id}>{c.content}</ListItemText>
        })}
      </List>
      <Togglable buttonLabel="Add a Comment">
        <form onSubmit={handleCommentSubmit}>
          <TextField {...comment} />
          <br />
          <Button>Add Comment</Button>
        </form>
      </Togglable>
    </div>
  )
}

export default Comments
