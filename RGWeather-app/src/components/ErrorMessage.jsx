// SearchBar.jsx (Child Component)

function ErrorMessage({ error }) {
  return (
    <div className="mt-4">
      {error && <div className="text-red-400 text-center">{error}</div>}
    </div>
  );
}

export default ErrorMessage;
