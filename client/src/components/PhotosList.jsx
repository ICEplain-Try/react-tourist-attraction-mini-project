import React from "react";

function PhotosList({ photos }) {
  return (
    <div className="result-photos">
      {photos.map(function (photo, index) {
        return (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className="photo"
          />
        );
      })}
    </div>
  );
}

export default PhotosList;
