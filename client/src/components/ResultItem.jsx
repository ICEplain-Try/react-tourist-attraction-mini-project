import React from "react";

function ResultItem(props) {
  // ดึงข้อมูลจาก Props
  const place = props.place;
  const handleTagClick = props.handleTagClick;

  // ฟังก์ชันคัดลอก URL ไปยังคลิปบอร์ด
  function copyToClipboard() {
    navigator.clipboard.writeText(place.url).then(function () {
      alert("คัดลอกลิงก์สำเร็จ!");
    });
  }

  return (
    <div className="result-item">
      {/* เพิ่มลิงก์ครอบรูปภาพ */}
      <a href={place.url} target="_blank" rel="noopener noreferrer">
        <div className="result-image">
          <img src={place.photos[0]} alt={place.title} />
        </div>
      </a>

      <div className="result-details">
        {/* เพิ่มลิงก์ครอบชื่อสถานที่ */}
        <a href={place.url} target="_blank" rel="noopener noreferrer">
          <h2 className="result-title">{place.title}</h2>
        </a>
        {/* คำอธิบายสถานที่ */}
        <p className="result-description">{place.description}</p>
        {/* แสดงรายการ Tags */}
        <div className="result-tags">
          {place.tags.map(function (tag, index) {
            return (
              <span
                key={index}
                className="tag"
                onClick={function () {
                  handleTagClick(tag); // เรียกฟังก์ชัน handleTagClick เมื่อคลิกที่ Tag
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        {/* แสดงรูปภาพเพิ่มเติม */}
        <div className="result-photos">
          {place.photos.slice(1).map(function (photo, index) {
            return (
              <img
                key={index}
                src={photo}
                alt={"Photo " + (index + 1)}
                className="photo"
              />
            );
          })}
          {/* ปุ่มคัดลอกลิงก์ */}
          <div className="copy-url">
            <img
              src="/src/assets/icons/icon-url-01.png"
              alt="Copy Link"
              onClick={copyToClipboard}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultItem;
