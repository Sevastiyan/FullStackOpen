import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('User: ', action.payload)
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (user) => {
  return async (dispatch) => {
    const returnedUser = await loginService.login(user)
    console.log('🚀 ~ file: userReducer.js ~ line 20 ~ returnedUser', returnedUser)
    dispatch(setUser(returnedUser))
  }
}

export default userSlice.reducer