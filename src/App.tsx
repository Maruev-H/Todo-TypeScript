import "./App.scss";
import Addform from "./components/AddForm/Addform";
import Todos from "./components/Todos/Todos";


function App() {
  
  return (
    <div className="App">
      <Addform />
      <Todos />
    </div>
  );
}

export default App;
