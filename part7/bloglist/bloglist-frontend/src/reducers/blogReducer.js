import { createSlice } from '@reduxjs/toolkit'
import service from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      console.log('setBlogs', action.payload)
      return action.payload
    },
  }
})

export const { setBlogs } = blogSlice.actions


export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await service.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateBlogs = (blogs) => {
  return (dispatch) => {
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
