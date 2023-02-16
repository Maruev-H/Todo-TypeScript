import React, { useState } from "react";
import "./Input.scss";
import Logo from "../../pictures/byunicode1.png";
import Logo1 from "../../pictures/byunicode.png";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addTodo } from "../../store/reducers/user/todoAction";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiLoader4Fill } from "react-icons/ri";

export default function Input() {

  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const { isLoadingAddTodo } = useAppSelector((state) => state.todos);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleClickAdd(event: React.FormEvent) {
    if (search.length) {
      event.preventDefault();
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
        <input
          value={search}
          onChange={handleChange}
          placeholder="Что вы планируете сделать?"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClickAdd}
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
      </div>
    </div>
  );
}
