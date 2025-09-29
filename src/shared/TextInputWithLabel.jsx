import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  padding: 6px;
  margin-bottom: 8px;
`;

function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <>
      <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
