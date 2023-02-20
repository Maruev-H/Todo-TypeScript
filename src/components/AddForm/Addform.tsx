import React, { useState } from "react";
import "./Addform.scss";
import Logo from "../../pictures/byunicode1.png";
import Logo1 from "../../pictures/byunicode.png";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addTodo } from "../../store/reducers/user/todoAction";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiLoader4Fill } from "react-icons/ri";

export default function Addform() {

  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const { isLoadingAddTodo } = useAppSelector((state) => state.todos);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleClickAdd();
  };

  function handleClickAdd() {
    if (search.length && !isLoadingAddTodo) {
      dispatch(addTodo(search));
      setSearch("");
    }
  }

  return (
    <div className="Input">
      <div className="Inupt__logo">
        <img className="Input__rocket" src={Logo} alt="" />
        <img src={Logo1} alt="" />
      </div>
      <div className="Input__logic">
        <form onSubmit={handleSubmit} >
        <input
        className={`input ${search.length ? 'input1' : ''}`}
          value={search}
          onChange={handleChange}
        />
        <label className="label">Что вы планируете сделать?</label>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClickAdd}
          disabled={isLoadingAddTodo}
        >
          Добавить{" "}
          {isLoadingAddTodo ? (
            <span className="spinner">
              <RiLoader4Fill />
            </span>
          ) : (
            <AiOutlinePlusCircle />
          )}
        </button>
        </form>
      </div>
    </div>
  );
}
