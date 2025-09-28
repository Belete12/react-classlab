import { useState, useEffect } from 'react';

import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 8px;
`;

const StyledInput = styled.input`
  margin-right: 8px;
  padding: 4px;
`;

const StyledSelect = styled.select`
  margin-right: 8px;
  padding: 4px;
`;

const StyledButton = styled.button`
  padding: 4px 8px;
`;

function TodosViewForm({
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  const preventRefresh = (event) => {
    event.preventDefault();
  };

  return (
    <StyledForm onSubmit={preventRefresh}>
      <div>
        <label htmlFor="searchTodos">Search todos</label>
        <StyledInput
          id="searchTodos"
          type="text"
          value={localQueryString}
          onChange={(event) => setLocalQueryString(event.target.value)}
        />
        <StyledButton type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </StyledButton>
      </div>

      <div>
        <label htmlFor="sortBy">Sort by</label>
        <StyledSelect
          id="sortBy"
          value={sortField}
          onChange={(event) => setSortField(event.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>

        <label htmlFor="direction">Direction</label>
        <StyledSelect
          id="direction"
          value={sortDirection}
          onChange={(event) => setSortDirection(event.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </div>
    </StyledForm>
  );
}

export default TodosViewForm;
