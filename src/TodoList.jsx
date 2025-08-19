import TodoListItem from "./TodoListItem"


function TodoList({todoList}){
    if (todoList.length === 0){
        return <p>Add todo above to get started</p>;
    }
    else {
    return(
        <ul>
            {todoList.map(todo => <TodoListItem key={todo.id} todo={todo} />)}
        </ul>
    )
    }

}
export default TodoList

