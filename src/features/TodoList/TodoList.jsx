import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  isLoading,
  isSaving,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const paginatedTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfFirstTodo + itemsPerPage
  );

  useEffect(() => {
    if (
      (filteredTodoList.length > 0 && totalPages > 0 && isNaN(currentPage)) ||
      currentPage < 1 ||
      currentPage > totalPages
    ) {
      navigate('/');
    }
  }, [currentPage, totalPages, navigate, filteredTodoList.length]);

  if (isLoading || isSaving) {
    return <p>Todo list loading...</p>;
  }

  if (!filteredTodoList || filteredTodoList.length === 0) {
    return <p>Add a todo above to get started</p>;
  }

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

  return (
    <>
      <ul className={styles.todoList}>
        {paginatedTodos.map((todo) => (
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
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default TodoList;
