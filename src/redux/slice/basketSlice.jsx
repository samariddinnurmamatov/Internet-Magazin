import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: JSON.parse(localStorage.getItem('basketProducts')) || [],
  reducers: {
    addToBasket: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        state[existingProductIndex].quantity += product.quantity;
      } else {
        state.push(product);
      }
      localStorage.setItem('basketProducts', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { id, increment } = action.payload;
      const updatedBasket = state.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + increment } : item
      );
      localStorage.setItem('basketProducts', JSON.stringify(updatedBasket));
      return updatedBasket;
    },
    removeFromBasket: (state, action) => {
      const updatedBasket = state.filter(item => item.id !== action.payload);
      localStorage.setItem('basketProducts', JSON.stringify(updatedBasket));
      return updatedBasket;
    },
    clearBasket: () => {
      localStorage.removeItem('basketProducts');
      return [];
    }
  }
});

export const { addToBasket, updateQuantity, removeFromBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
