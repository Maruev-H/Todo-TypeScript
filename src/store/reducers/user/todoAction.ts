import { createAsyncThunk} from '@reduxjs/toolkit';
import { ITodos } from "../../../types/ITodos";

export const baseURL = "https://unicode-todo.onrender.com";


// Получение Задач
export const getTodos = createAsyncThunk("users/upload", async function () {
  const res = await fetch(`${baseURL}/todos`);
  return await res.json();
});


//Добавление задачи
export const addTodo = createAsyncThunk(
    "todos/add", 
    async function (title: string) {
        const res = await fetch("https://unicode-todo.onrender.com/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });
        return await res.json();
    }
);


//Удаление задачи
export const deleteTodo = createAsyncThunk<string, string>(
  "todos/delete",
  async function (_id: string, ) {
    await fetch(`https://unicode-todo.onrender.com/todos/${_id}`, {
      method: "DELETE",
    });
    return _id;
  },
);

//Изменение задачи
export const changeTodo = createAsyncThunk<ITodos, {_id: string; completed: boolean}>(
  "todos/patch",
  async function ({_id, completed}) {
    const res = await fetch(`https://unicode-todo.onrender.com/todos/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await res.json();
  },
);

