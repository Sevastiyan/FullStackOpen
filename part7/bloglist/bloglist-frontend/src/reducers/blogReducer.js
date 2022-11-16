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
    add(state, action) {
      return [...state, action.payload]
    },
    like(state, action) {
      const blogToChange = action.payload
      const id = blogToChange.id
      return state.map((blog) => (blog.id !== id ? blog : blogToChange))
    },
    remove(state, action) {
      const blogToDelete = action.payload
      const id = blogToDelete.id
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, like, remove, add } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await service.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await service.postBlog(blogObject)
    console.log('🚀 newBlog', newBlog)
    dispatch(add(newBlog))
  }
}

export const updateBlogs = (blogs) => {
  return (dispatch) => {
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await service.updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(like(updatedBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await service.deleteBlog(blog)
    dispatch(remove(blog))
  }
}

export default blogSlice.reducer
