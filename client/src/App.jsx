import React, { useState, useEffect } from "react";
import "./App.css";
import places from "./data/places"; // Import ข้อมูล
import { filterPlaces } from "./utils/filters";
import SearchInput from "./components/SearchInput";
import ResultItem from "./components/ResultItem";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);
    const results = filterPlaces(places, query);
    setFilteredResults(results);
  }

  function handleTagClick(tag) {
    setSearchQuery(tag);
    const results = filterPlaces(places, tag);
    setFilteredResults(results);
  }

  useEffect(function () {
    const randomPlaces = [...places].sort(function () {
      return 0.5 - Math.random();
    }).slice(0, 3);
    setFilteredResults(randomPlaces);
  }, []);

  return (
    <div className="App">
      <h1 className="header">เที่ยวไหนดี</h1>
      <SearchInput searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="results-container">
        {filteredResults.length === 0 ? (
          <p className="no-results">ไม่พบข้อมูลที่ค้นหา</p>
        ) : (
          filteredResults.map(function (place) {
            return (
              <ResultItem
                key={place.id}
                place={place}
                handleTagClick={handleTagClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;