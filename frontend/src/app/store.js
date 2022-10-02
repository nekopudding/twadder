import { configureStore } from '@reduxjs/toolkit'
import currUserReducer from './currUserSlice';
import toastReducer from './toastSlice'

export default configureStore({
  reducer: {
    currUser: currUserReducer,
    toast: toastReducer
  }
})