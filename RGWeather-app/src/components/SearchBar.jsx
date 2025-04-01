// SearchBar.jsx (Child Component)
import ErrorMessage from "./ErrorMessage";
function SearchBar({ city, setCity, handleSearch, loading, error }) {
  return (
    <form onSubmit={handleSearch} className="justify-items-center mb-8 mt-auto">
      <div className="flex ">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-slate-200 opacity-55 text-black placeholder-black rounded-l-3xl w-200 h-11 text-center focus:shadow-2xl focus:shadow-white transition duration-100 hover:border-none md:w-100 sm:w-500 lg:w-200 max-w-sm ml-auto  md:max-w-md lg:max-w-lg"
        />
        <button
          type="submit"
          className="bg-slate-500 rounded-r-xl rounded-l-none w-24 sm:w-20  hover:bg-slate-400 transition duration-90"
        >
          Search
        </button>
      </div>
      {/* loading animation and error display */}

      <div className="mt-4">
        {loading && (
          <div className="text-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-300 mx-auto"></div>
          </div>
        )}
        <ErrorMessage error={error} />
      </div>
    </form>
  );
}

export default SearchBar;
