
export default function SearchBar({ searchQuery, onChange, onSearch }) {
   const handleKeyDown = (e) => {
       if (e.key === "Enter") {
           e.preventDefault();
           onSearch(searchQuery);
       }
   }
    return (
        <div className="flex w-full max-w-md">
            <input
                type="text"
                className="border p-2 border-r-0"
                value={searchQuery}
                onChange={onChange}
                placeholder="Enter city"
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={onSearch}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition cursor-pointer"
            >
                Search
            </button>
        </div>
    );
}
