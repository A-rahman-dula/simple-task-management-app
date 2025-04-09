import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice'; // Import the task slice

const store = configureStore({
  reducer: {
    tasks: taskReducer, // Attach tasks reducer to the store
  },
});

export default store;
