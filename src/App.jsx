import { useState } from 'react'  
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

function App() {
  const [todoList, setTodoList] = useState([]);

 const addTodo = (title) => {
    const newTodo = { title,id: Date.now()
    };
    setTodoList([...todoList, newTodo]);
  };
  return (
    <> 
      <h2>Todo List</h2>
      <TodoForm onAddTodo={addTodo} />   
      <TodoList todoList={todoList}/> 
    </>
  )
}

export default App
