function TodosViewForm({ sortField, sortDirection, setSortField, setSortDirection,queryString, setQueryString }) {
    //To define a function preventRefresh whose only job is to prevent the page from refreshing if a user accidentally hits enter while working with this form.
    const preventRefresh = (event) => {
        event.preventDefault();
    }

  return (
    <form onSubmit={preventRefresh}>
      <div>
            <label htmlFor="searchTodos"> Search todos </label>
            <input id="searchTodos"
            type ="text"
            value={queryString}
            onChange={(event) => setQueryString(event.target.value)} />
            <button type ="button" onClick={()=> setQueryString("")}> Clear </button>
         </div>
      <div>
        <label htmlFor="sortBy">Sort by</label>
        <select id="sortBy" 
            value={sortField}
            onChange={(event) => setSortField(event.target.value)}
          >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="direction">Direction</label>
        <select
          id="direction"
          value={sortDirection}
          onChange={(event) => setSortDirection(event.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>


      </div>
    </form>
  );
}

export default TodosViewForm;
