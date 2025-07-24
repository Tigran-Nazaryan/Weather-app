// SearchBar.jsx
export default function SearchBar({ searchQuery, onChange, onSearch }) {
    return (
        <div className="flex w-full max-w-md">
            <input
                type="text"
                className="border p-2 w-full"
                value={searchQuery}
                onChange={onChange}
                placeholder="Enter city"
            />
            <button
                onClick={onSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            >
                Search
            </button>
        </div>
    );
}
