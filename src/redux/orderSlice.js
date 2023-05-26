import { createSlice } from '@reduxjs/toolkit';

let id = 0;

export const todoSlice = createSlice({
    name: 'orders',
    initialState: {
        orderslist: [],
    },
    reducers: {
        addOrder: (state, action) => {
            state.orderslist = [...state.orderslist, { id: ++id, idrobotproductpartdevices: action.payload }];
        },
        deleteOrder: (state, action) => {
            state.orderslist = [...state.orderslist.filter(todo => todo.id != action.payload)];
        },
    },
});

export const { addOrder, deleteOrder } = todoSlice.actions;

export const selectTodos = state => state.orderslist;

export default todoSlice.reducer;
