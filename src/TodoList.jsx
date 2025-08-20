import TodoListItem from "./TodoListItem"


function TodoList({todoList,onCompleteTodo}){

//create a constant filteredTodoList that contains the todoList that has been filtered to remove any todo whose .isCompleted property is true
//replace the todoList references in the JSX with the filteredTodoList
const filteredTodoList = todoList.filter(todo => !todo.isCompleted);

    if (filteredTodoList.length === 0){
        return <p>Add todo above to get started</p>;
    }
    else {
    return(
        <ul>
            {filteredTodoList.map(todo => (<TodoListItem 
            key={todo.id} 
            todo={todo} 
            onCompleteTodo={onCompleteTodo}
            />))}
        </ul>
    )
    }

}
export default TodoList


