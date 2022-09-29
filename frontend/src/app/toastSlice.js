import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  msg: '',
  update: true
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state,action) => {
      console.log(action.payload)
      return {...action.payload};
    }
  }
})

// Action creators are generated for each case reducer function
export const { setToast } = toastSlice.actions

export default toastSlice.reducer;