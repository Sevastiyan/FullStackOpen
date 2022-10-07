import { createSlice } from '@reduxjs/toolkit'
import service from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const anecdoteToChange = action.payload
      const id = anecdoteToChange.id
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : anecdoteToChange
      )
    },
    addAnecote(state, action) {
      state.push(action.payload)
    },
    setAnacdotes(state, action) {
      console.log(action.payload)
      return action.payload
    },
  },
})

export const { vote, addAnecote, setAnacdotes } = anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await service.createAnecdote(content)
    dispatch(addAnecote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await service.getAll()
    dispatch(setAnacdotes(anecdotes))
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await service
      .update(anecdote.id, {
        ...anecdote,
        votes: anecdote.votes + 1
      })
    console.log('Response Anecdote: ', updatedAnecdote)

    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
