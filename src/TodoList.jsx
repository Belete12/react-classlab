{/*extract from TodoList.jsx*/}
import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList(){
  
      const todos = [
    {id:1,text:'review resources'},
    {id:2,text:'take notes'},
    {id:3,text:'code out app'}
  ];

  return (
  
      <ul>
        {todos.map(todo => (
          // <li key={todo.id}>{todo.text}</li>

          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
  );
}

export default TodoList

