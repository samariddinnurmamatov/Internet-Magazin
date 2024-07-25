import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../slice/productsSlice';
import basketReducer from '../slice/basketSlice';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        basket: basketReducer,
    },
});
