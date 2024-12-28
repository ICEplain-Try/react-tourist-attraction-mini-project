import React from "react";
import TagList from "./TagList";
import PhotosList from "./PhotosList";

function ResultDetails(props) {
  // ดึงข้อมูลจาก Props
  const place = props.place;
  const handleTagClick = props.handleTagClick;

  return (
    <div className="result-details">
      {/* เพิ่มลิงก์ครอบชื่อสถานที่ */}
      <a href={place.url} target="_blank" rel="noopener noreferrer">
        <h2 className="result-title">{place.title}</h2>
      </a>

      {/* คำอธิบายสถานที่ */}
      <p className="result-description">{place.description}</p>

      {/* แสดง Tags */}
      <TagList tags={place.tags} handleTagClick={handleTagClick} />

      {/* แสดงรูปภาพเพิ่มเติม */}
      <PhotosList photos={place.photos.slice(1, 4)} />
    </div>
  );
}

export default ResultDetails;
