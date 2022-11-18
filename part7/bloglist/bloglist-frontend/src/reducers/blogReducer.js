import { createSlice } from '@reduxjs/toolkit'
import service from '../services/blogs'
import { notify } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      console.log('setBlogs', action.payload)
      return action.payload
    },
    addBlog(state, action) {
      return [...state, action.payload]
    },
    updateBlog(state, action) {
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

export const { setBlogs, updateBlog, remove, addBlog } = blogSlice.actions

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
    dispatch(addBlog(newBlog))
    try {
      dispatch(notify({ message: `${blogObject.title} was added` }, 2))
    } catch (error) {
      dispatch(notify({ message: 'Title or Url missing', type: 'error' }, 3))
      console.log('Error: ', error)
    }
  }
}
export const addNewComment = (blog, comment) => {
  return async (dispatch) => {
    const savedComment = await service.addComment(blog.id, comment)
    dispatch(updateBlog({ ...blog, comments: [...blog.comments, savedComment] }))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await service.updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await service.deleteBlog(blog)
    dispatch(remove(blog))
  }
}

export default blogSlice.reducer
