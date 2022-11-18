import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const loggedUserJson = JSON.parse(window.localStorage.getItem('loggedUser'))
const initialState = loggedUserJson ? loggedUserJson : null
initialState
  ? blogService.setToken(initialState.token)
  : blogService.setToken('')

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('User: ', action.payload)
      return action.payload
    },
  },
})

export const { setUser } = loginSlice.actions

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const returnedUser = await loginService.login(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
      dispatch(setUser(returnedUser))
      blogService.setToken(returnedUser.token)
    } catch (exception) {
      dispatch(
        notify({ message: 'Wrong Username or Password', type: 'error' }, 3)
      )
      console.log('Wrong Credentials', exception)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken('')
    dispatch(setUser(null))
  }
}

export default loginSlice.reducer
