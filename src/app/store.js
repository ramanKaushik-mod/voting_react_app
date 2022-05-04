import { configureStore } from '@reduxjs/toolkit';

import mainReducers from '../features/mainSlice';

export const store = configureStore({
    reducer: {
        main: mainReducers,
    }
})