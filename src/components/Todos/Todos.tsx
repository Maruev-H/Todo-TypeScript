import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getTodos } from "../../store/reducers/user/todoAction";
import "./Todos.scss";
import Todo from "./Todo";
import Cliboard from "../../pictures/Clipboard.png";

export default function Todos() {

  const dispatch = useAppDispatch();
  const { todos, isLoading } = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="Loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div className="TaskBoard">
      <div className="Info">
        <div>
          <span>Всего задач</span> <div className="circle">{todos.length}</div>
        </div>
        <div>
          <span>Выполнено</span>{" "}
          <div className="circle">
            {todos.filter((item) => item.completed === true).length}
          </div>
        </div>
      </div>
      {!todos.length ? (
        <div className="emptyTodos">
          <img src={Cliboard} alt="sa" />
          <h1>У вас пока нет добавленных задач</h1>
        </div>
      ) : (
        todos.map((todo) => <Todo key={todo._id} {...todo} />)
      )}
    </div>
  );
}
