import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./app/store";
import { getTodos, Todo } from './todosApi';

export interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TodoState = {
  todos: [],
  status: 'idle'
};

export const getTodosAsync = createAsyncThunk(
  'todos/getTodos',
  async() => getTodos()
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = action.payload;
      })
      .addCase(getTodosAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;
