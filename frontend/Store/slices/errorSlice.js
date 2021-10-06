import { createSlice } from '@reduxjs/toolkit'
import testError from './testError.json'

export const errorSlice = createSlice({
  name: 'error',
  // initialState: {
  //   logged: false,
  //   userToken: null,
  //   userId: null,
  // },
//   initialState: {
//       type: null,
//       message: null,
//   },
initialState: testError,
  reducers: {
    setError: (state,action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearError: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.type = null;
      state.message = null;
    },
  },
})

// // Action creators are generated for each case reducer function
export const { setError, clearError } = errorSlice.actions

export default errorSlice.reducer