export interface ITodos {
  _id: string,
  title: string,
  created_at: number,
  completed: boolean,
  
}

export type todoState = {
  todos: ITodos[];
  isLoading: boolean;
  isLoadingAddTodo: boolean,
  isLoadingDeleteTodo: string
}

export type IAddTodos = {
  method: string;
  body: ITodos[]
}


 export interface RootInterfaseState {
  todos: ITodos[];
  
}