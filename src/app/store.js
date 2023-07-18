import { configureStore } from '@reduxjs/toolkit';
import markdownReducer from '../features/markdown/markdownSlice';
import cssReducer from '../features/css/cssSlice';

export const store = configureStore({reducer: {
    markdown: markdownReducer,
    css: cssReducer
}});
