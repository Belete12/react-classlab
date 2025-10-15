import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import { useSearchParams } from 'react-router-dom';

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  isLoading,
  isSaving,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  function handlePreviousPage() {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  }
  function handleNextPage() {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  }

  if (isLoading || isSaving) {
    return <p>Todo list loading...</p>;
  }

  // Filter out completed todos
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  if (!filteredTodoList || filteredTodoList.length === 0) {
    return <p>Add a todo above to get started</p>;
  }
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  // const paginatedTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);
  return (
    <>
      <ul className={styles.todoList}>
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

      <div className={styles.paginationControls}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  );
}

export default TodoList;
