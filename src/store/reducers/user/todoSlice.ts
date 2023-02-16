import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodo, changeTodo, deleteTodo, getTodos } from "./todoAction";
import { ITodos, todoState } from "../../../types/ITodos";

const initialState: todoState = {
  todos: [],
  isLoading: false,
  isLoadingAddTodo: false,
  isLoadingDeleteTodo: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // получение тудушек
    builder.addCase(getTodos.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      getTodos.fulfilled,
      (state, action: PayloadAction<ITodos[]>) => {
        state.isLoading = false;
        state.todos = action.payload;
      }
    );

    builder.addCase(getTodos.rejected, (state) => {
      alert('Ошибка');
      state.isLoading = false;
    });
    // добавление новой тудушки
    builder.addCase(addTodo.pending, (state) => {
      state.isLoadingAddTodo = true;
    });

    builder.addCase(
      addTodo.fulfilled,
      (state, action: PayloadAction<ITodos>) => {
        state.todos.push(action.payload);
        state.isLoadingAddTodo = false;
      }
    );

    builder.addCase(
      addTodo.rejected,
      (state) => {
        alert('Ошибка');
        state.isLoadingAddTodo = false;
      }
    );
    //удаление тудушки
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.isLoadingDeleteTodo = action.meta.arg;
    })

    builder.addCase(
      deleteTodo.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((item) => item._id !== action.payload);
        state.isLoadingDeleteTodo = "";
      }
    );

    builder.addCase(deleteTodo.rejected, (state) => {
      state.isLoadingDeleteTodo = "";
      alert('Ошибка');
    });

    // изменениие тудушки
    builder.addCase(
      changeTodo.fulfilled,
      (state, action: PayloadAction<ITodos>) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload;
          }
          return todo
        });
      }
    );
    builder.addCase(changeTodo.rejected, (state) => {
      alert('Ошибка');
    });
  },
});

export default todoSlice.reducer;
