import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    mealSelected: [],
  },
  reducers: {
    addMeal: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

        state.mealSelected.push({
            _id: action.payload._id,
            imageUrl: action.payload.imageUrl,
            name: action.payload.name,
            description:  action.payload.description,
            price:  action.payload.price,
            quantity: action.payload.quantity,
        })
    },
    removeMeal: (state, action) => {
        state.mealSelected = state.mealSelected.filter( e => e.mealId !== action.payload )
    },
    clearCart: (state,action) => {
      state.mealSelected = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addMeal, removeMeal, clearCart} = cartSlice.actions

export default cartSlice.reducer