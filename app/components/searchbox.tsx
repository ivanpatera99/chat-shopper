import React from 'react';

interface SearchBoxProps {
    searchText: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleButtonClick: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = function ({
    searchText,
    handleInputChange,
    handleButtonClick
}) {
    return (
        <div className="flex items-center">
            <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-dark-500 text-black"
                value={searchText}
                onChange={handleInputChange}
            />
            <button
                type="button"
                className="px-4 py-2 h-full bg-blue-900 text-white rounded-r-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-dark-500"
                onClick={handleButtonClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 16a7 7 0 100-14 7 7 0 000 14zm5.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchBox;