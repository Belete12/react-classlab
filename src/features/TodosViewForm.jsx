


function TodosViewForm({ sortField, sortDirection, setSortField, setSortDirection }) {
  return (
    <form>
      <div>
        <label htmlFor="sortBy">Sort by</label>
        <select id="sortBy" 
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
          >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="direction">Direction</label>
        <select
          id="direction"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>


      </div>
    </form>
  );
}

export default TodosViewForm;
