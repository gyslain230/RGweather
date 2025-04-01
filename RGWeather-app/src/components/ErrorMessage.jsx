// SearchBar.jsx (Child Component)

function ErrorMessage({ error }) {
  return (
    <div className="mt-4">
      {error && (
        <div class="text-black  text-center animate-pulse rounded-2xl bg-red-400 px-4 py-2 font-bold w-40 h-auto  ml-auto mr-auto text-nowrap ">
          {error}
        </div>
      )}
    </div>
  );
}

export default ErrorMessage;
