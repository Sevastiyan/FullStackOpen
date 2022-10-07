import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

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

export const notify = (text, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(text))
    setTimeout(() => {
      console.log(seconds)
      dispatch(setNotification(''))
    }, seconds * 1000)
    console.log(seconds)
  }
}

export default notificationSlice.reducer
