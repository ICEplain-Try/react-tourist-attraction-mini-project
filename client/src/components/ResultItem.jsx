import React from "react";
import ResultDetails from "./ResultDetails";

function ResultItem({ place, handleTagClick }) {
  return (
    <div className="result-item">
      {/* เพิ่มลิงก์ครอบ .result-image */}
      <a href={place.url} target="_blank" rel="noopener noreferrer">
        <div className="result-image">
          <img src={place.photos[0]} alt={place.title} />
        </div>
      </a>
      <ResultDetails place={place} handleTagClick={handleTagClick} />
    </div>
  );
}

export default ResultItem;
