import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import TodosPage from './pages/TodosPage';
import Header from './shared/Header';
import About from './pages/About';
import NotFound from './pages/NotFound';
import styles from './App.module.css';

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
    <div className={styles.appContainer}>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
