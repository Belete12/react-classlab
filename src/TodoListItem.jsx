import React from 'react';

function TodoListItem({ todo }) {
  return (
    // <li>{todo.title}</li>
     <li>{todo.text}</li>
  );
}

export default TodoListItem;
