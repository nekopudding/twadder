import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  displayName: 'Display Name',
  username: 'username'
}

export const currUserSlice = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    setCurrUser: (state,action) => {
      return {...action.payload};
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCurrUser } = currUserSlice.actions

export default currUserSlice.reducer;