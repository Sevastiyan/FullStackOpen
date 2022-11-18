import { createSlice } from '@reduxjs/toolkit'
import service from '../services/users'

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      console.log('Setting Users', action.payload)
      return action.payload
    }
  }
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const returnedUsers = await service.getUsers()
    dispatch(setUsers(returnedUsers))
  }
}

export default userSlice.reducer