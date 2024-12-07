import React from "react";

function TagList({ tags, handleTagClick }) {
  return (
    <div className="result-tags">
      {tags.map(function (tag, index) {
        return (
          <span
            key={index}
            className="tag"
            onClick={function () {
              handleTagClick(tag);
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

export default TagList;
