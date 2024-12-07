import React from "react";

function SearchInput({ searchQuery, handleSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="ค้นหาที่เที่ยว..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}

export default SearchInput;
