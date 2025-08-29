//import React from 'react';
import { useRef } from 'react';
import {useState} from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';



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
      <TextInputWithLabel         
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
        elementId ="todoTitle" 
        labelText = "Todo"
      />
      <button type="submit" disabled={workingTodoTitle === ""}>Add Todo</button>
      </form>
      );
}

export default TodoForm;


