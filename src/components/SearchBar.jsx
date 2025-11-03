export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="flex gap-2 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#31694E]"
        />
        <button
          onClick={onSearch}
          className="bg-[#658C58] hover:bg-[#31694E] text-white px-6 py-3 rounded-lg transition-all duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
}
