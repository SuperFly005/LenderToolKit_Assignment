import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4} from 'uuid';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
    },
    reducers: {
        addTask: (state, action) => {
            const todo = {
                id: uuidV4(),
                ...action.payload,
            };
            state.todos.push(todo);
        },
        removeTask: (state, action) => {
            const index = state.todos.findIndex((todo) => (todo.id === action.payload));
            state.todos.splice(index, 1);
        }
    }
});

export const { addTask, removeTask } = todoSlice.actions;

export default todoSlice.reducer;