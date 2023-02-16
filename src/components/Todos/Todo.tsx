import React from "react";
import { BsTrash } from "react-icons/bs";
import { RiLoader4Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changeTodo, deleteTodo } from "../../store/reducers/user/todoAction";
import { ITodos } from "../../types/ITodos";

const Todo: React.FC<ITodos> = ({ _id, title, completed, created_at}) => {
  const dispatch = useAppDispatch();
  
  const { isLoadingDeleteTodo } = useAppSelector((state) => state.todos);

  const handleDelete = () => {
    dispatch(deleteTodo(_id));
    console.log(isLoadingDeleteTodo)
  };

  const toDoCompleted = () =>{
    dispatch(changeTodo({_id, completed}));
  }

  const CreatedAt = () =>{
    let a: number =  Math.ceil((Date.now() - created_at) / 60000)

    if( a > 24){ 
      a = Math.ceil(a / 24)
      return `${a} ${a === 1? 'день' : a > 1 || a > 5? "дня" : "дней"} назад`
    }

    if(a >= 60){
      a = Math.ceil(a / 60)
      return `${a} ${a === 1? 'час' : a > 1 || a > 5? "часа" : "часов"} назад`
    }else{
      return `${a} ${a === 1? 'минуту' : a > 1 || a > 5? "минуты" : "минут"} назад`
    }
  }

  return (
    <div>
      <div className="Todo" key={_id}>
        <input
          className="form-check-input"
          type="checkbox"
          id="checkboxNoLabel"
          value=""
          aria-label="..."
          checked={completed}
          onChange={toDoCompleted}
          disabled={isLoadingDeleteTodo !== ''}
        />
        <p className={completed ? "line-through" : ''}> {title} <span> {CreatedAt()}</span></p>
        <button onClick={handleDelete}>
          {isLoadingDeleteTodo === _id ? (
            <span className="spinner">
            <RiLoader4Fill />
          </span>
          ) : (
            <BsTrash />
          )}
        </button>
      </div>
    </div>
  );
};
export default Todo;
