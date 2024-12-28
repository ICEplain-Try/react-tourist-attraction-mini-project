import React from "react";

function SearchInput({ searchQuery, handleSearch, onSearch }) {
  // ฟังก์ชันจัดการการกดปุ่มในช่อง Input
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSearch(); // เรียกฟังก์ชันค้นหาเมื่อกด Enter
    }
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="ค้นหาที่เที่ยว..."
        value={searchQuery} // ผูก State ของคำค้นหา
        onChange={handleSearch} // เรียกฟังก์ชัน handleSearch เมื่อ Input มีการเปลี่ยนแปลง
        onKeyDown={handleKeyDown} // ตรวจจับการกดปุ่ม Enter
        className="search-input"
      />
    </div>
  );
}

export default SearchInput;
