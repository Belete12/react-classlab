{/*extract from TodoList.jsx*/}
import React from 'react';
function TodoList(){
  
      const todos = [
    {id:1,text:'review resources'},
    {id:2,text:'take notes'},
    {id:3,text:'code out app'}
  ];

  return (
  
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
  
  );
    
}

export default TodoList

