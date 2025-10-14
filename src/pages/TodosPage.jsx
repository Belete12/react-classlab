import React, { useEffect } from 'react';
import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';
import styles from '../App.module.css';

const TodosPage = ({
  todoState,
  dispatch,
  todoActions,
  encodeUrl,
  token,
  queryString,
  setQueryString,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}) => {
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      try {
        const resp = await fetch(encodeUrl(), {
          method: 'GET',
          headers: { Authorization: token },
        });
        if (!resp.ok)
          throw new Error(`Failed to fetch todos (status ${resp.status})`);
        const data = await resp.json();
        dispatch({ type: todoActions.loadTodos, records: data.records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      } finally {
        dispatch({ type: todoActions.endRequest });
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, queryString, encodeUrl]);

  const addTodo = async (newTodo) => {
    dispatch({ type: todoActions.startRequest });

    const payload = {
      records: [
        { fields: { title: newTodo.title, isCompleted: newTodo.isCompleted } },
      ],
    };

    try {
      const resp = await fetch(encodeUrl(), {
        method: 'POST',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error(resp.statusText);
      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, record: records[0] });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodos = async (id) => {
    dispatch({ type: todoActions.completeTodo, id });
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    if (!originalTodo) return;

    const payload = {
      records: [{ id, fields: { isCompleted: true } }],
    };

    try {
      const resp = await fetch(encodeUrl(), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(payload),
      });
      if (!resp.ok)
        throw new Error(`Failed to complete todo (status ${resp.status})`);
    } catch (error) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error,
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const updateTodo = async (editedTodo) => {
    dispatch({ type: todoActions.startRequest });
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );
    if (!originalTodo) return;

    const payload = {
      records: [{ id: editedTodo.id, fields: { title: editedTodo.title } }],
    };

    try {
      const resp = await fetch(encodeUrl(), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(payload),
      });
      if (!resp.ok)
        throw new Error(`Failed to update todo (status ${resp.status})`);
      dispatch({ type: todoActions.updateTodo, editedTodo });
    } catch (error) {
      dispatch({ type: todoActions.revertTodo, editedTodo, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  return (
    <div className={styles.appContainer}>
      <h2>Todo List</h2>

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodos}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
        isSaving={todoState.isSaving}
      />

      <hr />

      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        setQueryString={setQueryString}
      />

      {todoState.errorMessage && (
        <div className={styles.errorMessageContainer}>
          <hr />
          <p>{todoState.errorMessage || 'No errors yet.'}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>
            Dismiss Error Message
          </button>
        </div>
      )}
    </div>
  );
};

export default TodosPage;
