// src/App.jsx
import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import TodosPage from './pages/TodosPage';
import About from './pages/About';
import Header from './shared/Header';

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [queryString, setQueryString] = useState('');
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');

  const location = useLocation();

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(() => {
    const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    const searchQuery = queryString
      ? `&filterByFormula=SEARCH("${queryString}",+title)`
      : '';
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString, url]);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
      case '/todos':
        document.title = 'Todo List';
        break;
      case '/about':
        document.title = 'About';
        break;
      default:
        document.title = 'Not Found';
    }
  }, [location.pathname]);

  return (
    <>
      <Header title="Todo List" />
      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />
        <Route
          path="/todos"
          element={
            <TodosPage
              todoState={todoState}
              dispatch={dispatch}
              todoActions={todoActions}
              encodeUrl={encodeUrl}
              token={token}
              queryString={queryString}
              setQueryString={setQueryString}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;

// import { useReducer, useState, useEffect, useCallback } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
// import TodoList from './features/TodoList/TodoList';
// import TodoForm from './features/TodoForm';
// import TodosViewForm from './features/TodosViewForm';

// import styles from './App.module.css';

// import {
//   reducer as todosReducer,
//   actions as todoActions,
//   initialState as initialTodosState,
// } from './reducers/todos.reducer';

// function App() {
//   const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

//   const [queryString, setQueryString] = useState('');
//   const [sortField, setSortField] = useState('createdTime');
//   const [sortDirection, setSortDirection] = useState('desc');

//   const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
//     import.meta.env.VITE_TABLE_NAME
//   }`;
//   const token = `Bearer ${import.meta.env.VITE_PAT}`;

//   const encodeUrl = useCallback(() => {
//     const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
//     const searchQuery = queryString
//       ? `&filterByFormula=SEARCH("${queryString}",+title)`
//       : '';
//     return encodeURI(`${url}?${sortQuery}${searchQuery}`);
//   }, [sortField, sortDirection, queryString, url]);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       dispatch({ type: todoActions.fetchTodos });

//       const requestUrl = encodeUrl();
//       const options = {
//         method: 'GET',
//         headers: {
//           Authorization: token,
//         },
//       };

//       try {
//         const resp = await fetch(requestUrl, options);
//         if (!resp.ok) {
//           throw new Error(`Failed to fetch todos (status ${resp.status})`);
//         }

//         const data = await resp.json();
//         dispatch({ type: todoActions.loadTodos, records: data.records });
//       } catch (error) {
//         dispatch({ type: todoActions.setLoadError, error });
//       } finally {
//         dispatch({ type: todoActions.endRequest });
//       }
//     };

//     fetchTodos();
//   }, [sortField, sortDirection, queryString, encodeUrl]);

//   //AddTodo

//   const addTodo = async (newTodo) => {
//     dispatch({ type: todoActions.startRequest });
//     const payload = {
//       records: [
//         {
//           fields: {
//             title: newTodo.title,
//             isCompleted: newTodo.isCompleted,
//           },
//         },
//       ],
//     };

//     const options = {
//       method: 'POST',
//       headers: {
//         Authorization: token,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     };

//     try {
//       const resp = await fetch(encodeUrl(), options);
//       if (!resp.ok) {
//         throw new Error(resp.statusText);
//       }

//       const { records } = await resp.json();
//       dispatch({ type: todoActions.addTodo, record: records[0] });
//     } catch (error) {
//       dispatch({ type: todoActions.setLoadError, error });
//     } finally {
//       dispatch({ type: todoActions.endRequest });
//     }
//   };
//   //completeTodos

//   const completeTodos = async (id) => {
//     dispatch({ type: todoActions.completeTodo, id });
//     const originalTodo = todoState.todoList.find((todo) => todo.id === id);
//     if (!originalTodo) return;

//     const payload = {
//       records: [
//         {
//           id,
//           fields: {
//             isCompleted: true,
//           },
//         },
//       ],
//     };

//     const options = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//       body: JSON.stringify(payload),
//     };

//     try {
//       const resp = await fetch(encodeUrl(), options);
//       if (!resp.ok)
//         throw new Error(`Failed to complete todo (status ${resp.status})`);
//     } catch (error) {
//       dispatch({
//         type: todoActions.revertTodo,
//         editedTodo: originalTodo,
//         error,
//       });
//     } finally {
//       dispatch({ type: todoActions.endRequest });
//     }
//   };

//   //updateTodo

//   const updateTodo = async (editedTodo) => {
//     dispatch({ type: todoActions.startRequest });
//     const originalTodo = todoState.todoList.find(
//       (todo) => todo.id === editedTodo.id
//     );
//     if (!originalTodo) return;

//     const payload = {
//       records: [
//         {
//           id: editedTodo.id,
//           fields: {
//             title: editedTodo.title,
//           },
//         },
//       ],
//     }; // payload end

//     const options = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//       body: JSON.stringify(payload),
//     };

//     try {
//       const resp = await fetch(encodeUrl(), options);
//       if (!resp.ok) {
//         throw new Error(`Failed to update todo (status ${resp.status})`);
//       }
//       dispatch({ type: todoActions.updateTodo, editedTodo });
//     } catch (error) {
//       dispatch({ type: todoActions.revertTodo, editedTodo, error });
//     } finally {
//       dispatch({ type: todoActions.endRequest });
//     }
//   };

//   // updatetodo async function end
//   return (
//     <div className={styles.appContainer}>
//       <h2>Todo List</h2>

//       <TodoForm onAddTodo={addTodo} />
//       <TodoList
//         todoList={todoState.todoList}
//         onCompleteTodo={completeTodos}
//         onUpdateTodo={updateTodo}
//         isLoading={todoState.isLoading}
//         isSaving={todoState.isSaving}
//       />

//       <hr />
//       <TodosViewForm
//         sortField={sortField}
//         setSortField={setSortField}
//         sortDirection={sortDirection}
//         setSortDirection={setSortDirection}
//         setQueryString={setQueryString}
//       />

//       {todoState.errorMessage && (
//         <div className={styles.errorMessageContainer}>
//           <hr />
//           <p>{todoState.errorMessage || 'No errors yet.'}</p>
//           <button onClick={() => dispatch({ type: todoActions.clearError })}>
//             Dismiss Error Message
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
