import { createSlice } from '@reduxjs/toolkit';

const likedProductsFromStorage = localStorage.getItem('likedProducts');
const initialState = likedProductsFromStorage ? JSON.parse(likedProductsFromStorage) : {};

const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
          toggleLike(state, action) {
            const productId = action.payload;
            state[productId] = !state[productId];
            localStorage.setItem('likedProducts', JSON.stringify(state));
        },
        setLikes(state, action) {
            return action.payload;
        }
    }
});

export const { toggleLike, setLikes } = likeSlice.actions;

export default likeSlice.reducer;
