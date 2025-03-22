// SearchBar.jsx (Child Component)
import ErrorMessage from "./ErrorMessage";
function SearchBar({ city, setCity, handleSearch, loading, error }) {
  return (
    <form onSubmit={handleSearch} className="justify-center mb-8 mt-auto">
      <div className="flex">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-slate-200 opacity-55 text-black placeholder-black rounded-l-3xl w-200 h-11 text-center focus:shadow-2xl focus:shadow-white transition duration-100 hover:border-none"
        />
        <button
          type="submit"
          className="bg-slate-500 rounded-r-xl rounded-l-none w-24 hover:bg-slate-400 transition duration-90"
        >
          Search
        </button>
      </div>

      <div className="mt-4">
        {loading && <div className="text-white text-center">Loading...</div>}
        <ErrorMessage error={error} />
      </div>
    </form>
  );
}

export default SearchBar;
