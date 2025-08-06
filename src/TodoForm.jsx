import React from 'react';
import { useRef } from 'react';


function TodoForm({onAddTodo}) {
  const todoTitleInput= useRef(''); // Invoke useRef in the body of the component with an empty string and assign it to a const, todoTitleInput.

// Define a handleAddTodofunction above the return statement:
// The function takes an event object
// Call the event.preventDefault() in the first line of the function to prevent the page from refreshing when a user clicks the Add Todo button.
// Add a console.dir(event.target) - we will use this console statement to figure out how to access the input value from the form.
    function handleAddTodo(event){

    event.preventDefault();
    //Back in the handleAddTodo, remove the console and create a new const title and assign it the event target's title value.
    //console.dir(event.target.title) 
    //const title= event.target.title.value;
// Invoke onAddTodo that you get from the component's props and pass the title into the function's params.
// To help the user out, you then clear out the input by setting the input's value to an empty string. event.target.title.value = ""
  
   const title = todoTitleInput.current.value;
   onAddTodo(title);
   event.target.title.value = "";
   todoTitleInput.current.focus(); 

  }
  return (
<form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      {/* On the input tag, add a name props with the value of "title". */}
      <input type="title" id="todoTitle" name="title" ref={todoTitleInput}/>
      <button type="submit">Add Todo</button>

    </form>
  );
}

export default TodoForm;
