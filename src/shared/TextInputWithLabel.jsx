// Inside of src/shared create a new file, TextInputWithLabel.jsx
// Create a component TextInputWithLabel
// Add a label and an input that are wrapped in a React fragment to the return statement. Their props don't matter for now.
// Add a default export to the bottom of the file.

function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
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
