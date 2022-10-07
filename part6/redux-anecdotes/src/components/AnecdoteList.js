import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((a) => a.content.includes(filter))
  })

  // anecdotes.sort((a, b) => {
  //   console.log(a.votes, b.votes)
  //   return parseFloat(a.votes) - parseFloat(b.votes)
  // })

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        // .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => {
          return (
            <Anecdote
              anecdote={anecdote}
              handleVote={() => {
                console.log(anecdote)
                dispatch(voteFor(anecdote))
                dispatch(notify(`You voted for '${anecdote.content}'`, 2))
              }}
            />
          )
        })}
    </div>
  )
}

export default AnecdoteList
