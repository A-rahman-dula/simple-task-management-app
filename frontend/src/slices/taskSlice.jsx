import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: '',
};

const BASE_URL = 'http://localhost:5000/api/tasks';

//GET
export const getTaskFromServer = createAsyncThunk(
  'tasks/getTaskFromServer',
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: 'No Task Found' });
    }
  },
);

//POST
export const addTaskToServer = createAsyncThunk(
  'tasks/addTaskToServer',
  async (task, { rejectWithValue }) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: 'Task Not Added' });
    }
  },
);

//PATCH
export const updateTaskInServer = createAsyncThunk(
  'tasks/updateTaskInServer',
  async (task, { rejectWithValue }) => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify(task),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    const response = await fetch(BASE_URL + '/' + task._id, options);

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: 'Task Not Updated' });
    }
  },
);

//DELETE
export const deleteTaskFromServer = createAsyncThunk(
  'tasks/deleteTaskFromServer',
  async (task, { rejectWithValue }) => {
    const options = {
      method: 'DELETE',
    };
    const response = await fetch(BASE_URL + '/' + task._id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: 'Task Not Deleted' });
    }
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTaskFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task._id !== action.payload._id,
      );
    },

    selectTaskFromList: (state, action) => {
      state.selectedTask =
        state.tasksList.find((task) => task._id === action.payload._id) || {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.tasksList = action.payload;
      })
      .addCase(getTaskFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.tasksList = [];
      })
      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.tasksList.push(action.payload);
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.tasksList = state.tasksList.map((task) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload }
            : task,
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
      })
      .addCase(deleteTaskFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export const {
  addTaskToList,
  removeTaskFromList,
  updateTaskInList,
  selectTaskFromList,
} = taskSlice.actions;
export default taskSlice.reducer;
