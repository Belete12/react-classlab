import TodoListItem from "./TodoListItem";

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  isLoading,
  isSaving,
}) {
  if (isLoading || isSaving) {
    return <p>Todo list loading...</p>;
  }

  // Filter out completed todos
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  if (!filteredTodoList || filteredTodoList.length === 0) {
    return <p>Add a todo above to get started</p>;
  }

  return (
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
          isLoading={isLoading}
          isSaving={isSaving}
        />
      ))}
    </ul>
  );
}

export default TodoList;
