import { useState } from 'react'  // Using the useState hook
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

function App() {
  //Rename the existing state value, newTodo, to todoList and the update function, setNewTodo, to setTodoList.
 //Change the useState's initialValue to an empty array.
  const [todoList, setTodoList] = useState([]);

//  Between the useState and the return statement, create a handler function named addTodo
// It takes an argument title
// Create a const newTodo with an object that uses title, and id as keys.
// Set the id using Date.now().
// The handler then calls setTodoList passing in an array containing the destructured todoList and newTodo. 
// It should look like: setTodoList([...todoList, newTodo])

// const handleAddTodo = (title) => {
//   const newTodo = { id: Date.now(), title };
//   setTodoList((prevList) => [...prevList, newTodo]);
// };


 const addTodo = (title) => {
    const newTodo = { title,id: Date.now()
    };
    setTodoList([...todoList, newTodo]);
  };
  return (
    <>
      
      <h2>Todo List</h2>
      {/* Pass the function to an onAddTodo props on the TodoForm instance. */}
      <TodoForm onAddTodo={addTodo} />   
      {/* In App, add the todoList state value to the props of the TodoList component instance. */}
      <TodoList todoList={todoList}/> 
    </>
  )
}

export default App
