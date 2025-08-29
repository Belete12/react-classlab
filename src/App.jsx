import { useState } from 'react'  
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'


function App() {
  const [todoList, setTodoList] = useState([]);

 const addTodo = (title) => {
    const newTodo = { 
      title,
      id: Date.now(),
      isCompleted: false
    };
    setTodoList([...todoList, newTodo]);
  };
  const completeTodos = (id) =>{
  const updatedTodos = todoList.map(todo => {
    if (todo.id === id){
      return {...todo, isCompleted: true};
    }else{
      return todo;
    }
  });

    setTodoList(updatedTodos); 

  };
  return (
    <> 
      <h2>Todo List</h2>
      <TodoForm onAddTodo={addTodo} />   
      <TodoList 
      todoList={todoList}
      onCompleteTodo={completeTodos}/> 
    </>
  )
}

export default App

