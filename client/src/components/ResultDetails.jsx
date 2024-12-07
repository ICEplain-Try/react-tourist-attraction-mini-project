import React from "react";
import TagList from "./TagList";
import PhotosList from "./PhotosList";
import { truncateTextWithLink } from "../utils/truncateText";
import copyIcon from "../assets/icons/icon-url-01.png"; // Import ไอคอน

function ResultDetails({ place, handleTagClick }) {
  // ฟังก์ชันคัดลอก URL ไปยัง Clipboard
  function handleCopyURL() {
    navigator.clipboard.writeText(place.url).then(function () {
      alert("URL ถูกคัดลอกแล้ว!");
    });
  }

  return (
    <div className="result-details">
      <a href={place.url} target="_blank" rel="noopener noreferrer">
        <h2 className="result-title">{place.title}</h2>
      </a>
      <p className="result-description">
        {truncateTextWithLink(place.description, 60, place.url)}
      </p>
      <TagList tags={place.tags} handleTagClick={handleTagClick} />
      <PhotosList photos={place.photos.slice(1, 4)} />

      {/* เพิ่มไอคอน URL ที่มุมขวาล่าง */}
      <div className="copy-url">
        <img
          src={copyIcon}
          alt="Copy URL"
          onClick={handleCopyURL}
          className="copy-icon"
        />
      </div>
    </div>
  );
}

export default ResultDetails;
