import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';


 const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

const encodeUrl = ({ sortField, sortDirection }) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  return encodeURI(`${url}?${sortQuery}`);
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

//sortField: initial value of "createdTime"
//sortDirection: initial value of "desc" as in descending

const [sortField, setSortField] = useState("createdTime");
const [sortDirection, setSortDirection] = useState("desc");

  // Airtable API setup
 // const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
  setErrorMessage("NetworkError when attempting to fetch resource.. Reverting todo...");
    const fetchTodos = async () => {
      setIsLoading(true);
      setErrorMessage("");

       const requestUrl = encodeUrl({ sortField, sortDirection });

      const options = {
        method: "GET",
        headers: {
          Authorization: token
        }
      };

      try {
        const resp = await fetch(requestUrl, options);
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }

        const data = await resp.json();
        const todos = data.records.map(record => {
          const todo = {
            id: record.id,
            ...record.fields
          };

          if (!todo.title) {
            todo.title = "";
          }

          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }

          return todo;
        });

        setTodoList(todos);

      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };


    fetchTodos();
  }, [sortField, sortDirection]);

  const addTodo = async (newTodo) => {
    setIsSaving(true);

    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl({sortField, sortDirection}), options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      const { records } = await resp.json();

      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }

      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.error("error ", error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const completeTodos = async(id) => {
    const originalTodo = todoList.find(todo => todo.id=== id);
    if(!originalTodo) return;

    const updateTodo = { ...originalTodo, isCompleted:true};
    const updatedTodos = todoList.map(todo =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList(updatedTodos);
    setErrorMessage("");
  };


  async function updateTodo (editedTodo){
    setIsSaving(true);
    const originalTodo = todoList.find(todo => todo.id === editedTodo.id);
    if(!originalTodo)return;

    const payload={
      records: [
        {
          id: editedTodo.id,
          fields:{
            title: editedTodo.title,
            isCompleted: true,
            //isCompleted: editedTodo.isCompleted
          },
        },
      ],

    }; // payload end

  const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl({sortField, sortDirection}), options);
      if (!resp.ok) {
        throw new Error(`Failed to update todo (status ${resp.status})`);
        
      }
    } catch (error) {
      console.error('Update error:', error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map(todo =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      //setIsSaving(false);
      setTodoList(revertedTodos);
    }
  }
   // updatetodo async function end
   return (
  <>
    <h2>Todo List</h2>





    <TodoForm onAddTodo={addTodo} />
    <TodoList
      todoList={todoList}
      onCompleteTodo={completeTodos}
      onUpdateTodo={updateTodo}
      isLoading={isLoading}
      isSaving={isSaving}
    />
{/* <hr  /> */}
    {errorMessage && (
  <div>
    <hr /> 
    <p>{errorMessage || "No errors yet."}</p>
  <button onClick={() => setErrorMessage("")}>Dismiss Error Message</button>
</div>

    )}
  </>
);

}

export default App;

