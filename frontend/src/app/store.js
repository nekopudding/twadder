import { configureStore } from '@reduxjs/toolkit'
import currUserReducer from './currUserSlice';

export default configureStore({
  reducer: {
    currUser: currUserReducer
  }
})