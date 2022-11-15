import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const notify = (notification, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(setNotification(initialState))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
