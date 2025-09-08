//import React from 'react';
import { useRef } from 'react';
import {useState} from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';



function TodoForm({onAddTodo, isSaving}) {
    const [workingTodoTitle, setWorkingTodo] = useState('');
    const todoTitleInput= useRef(''); 

    function handleAddTodo(event){
        event.preventDefault();
        const title = workingTodoTitle.trim();
        if(title === '')
          return;
        //onAddTodo(workingTodoTitle);
        onAddTodo({
          title:workingTodoTitle.trim(),
          isCompleted: false
        });
        setWorkingTodo('')
      }
  
      return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel 
        elementId ="todoTitle" 
        labelText = "Todo"        
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
        
 
      />
      {/* <button type="submit" disabled={workingTodoTitle === ""}>Add Todo</button> */}

      <button type="submit" disabled={workingTodoTitle.trim() === ''}>
       {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    
      </form>
 
      );
      
}

export default TodoForm;


