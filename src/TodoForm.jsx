//import React from 'react';
import { useRef } from 'react';
import {useState} from 'react';


function TodoForm({onAddTodo}) {
    const [workingTodoTitle, setWorkingTodo] = useState('');

    const todoTitleInput= useRef(''); 
    function handleAddTodo(event){
        event.preventDefault();
        const title = workingTodoTitle.trim();
        if(title === '')
          return;
        onAddTodo(workingTodoTitle);
        setWorkingTodo('')
      }
  
      return (
    <form onSubmit={handleAddTodo}>
          <label htmlFor="todoTitle">Todo</label>
          <input type="title" id="todoTitle" name="title" value = {workingTodoTitle}
          onChange={(event) => setWorkingTodo(event.target.value)}/>
          <button type="submit" disabled={workingTodoTitle === ""}>Add Todo</button>
        </form>
      );
}

export default TodoForm;


