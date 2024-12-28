// Import libraries ที่จำเป็น
import React, { useState, useEffect } from "react";
import axios from "axios"; // ใช้สำหรับการส่ง HTTP Request
import "./App.css"; // Import ไฟล์ CSS
import SearchInput from "./components/SearchInput";
import ResultItem from "./components/ResultItem";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // เก็บคำค้นหา
  const [trips, setTrips] = useState([]); // เก็บผลลัพธ์การค้นหา
  const [error, setError] = useState(""); // เก็บข้อความ Error
  const [hasSearched, setHasSearched] = useState(false); // ตรวจสอบว่ามีการค้นหาหรือไม่
  const [loading, setLoading] = useState(false); // ตรวจสอบสถานะการโหลดข้อมูล
  const [triggerSearch, setTriggerSearch] = useState(false); // ใช้สำหรับบังคับให้ fetchTrips เริ่มทำงานหลังจากอัปเดต searchQuery เสร็จ

  // ฟังก์ชันจัดการเมื่อผู้ใช้พิมพ์คำค้นหาในช่อง Input
  function handleSearchChange(event) {
    const query = event.target.value; // ดึงค่าจาก Input
    setSearchQuery(query); // อัปเดต State
  }

  // ฟังก์ชันสำหรับค้นหาสถานที่ท่องเที่ยวผ่าน API
  function fetchTrips() {
    if (searchQuery.trim() === "") {
      setError("กรุณาใส่คำที่ต้องการค้นหา");
      setTrips([]); // ล้างผลลัพธ์การค้นหาเดิม
      setHasSearched(false); // ยังไม่ได้เริ่มค้นหาอย่างถูกต้อง
      setLoading(false); // ซ่อนสถานะ Loading
      return;
    }

    setLoading(true); // เริ่มแสดงสถานะ Loading
    setError(""); // ล้างข้อความ Error
    setTrips([]); // ล้างข้อมูลเก่า

    setTimeout(function () {
      axios
        .get(`http://localhost:4001/trips?keywords=${searchQuery}`) // เรียกใช้ API พร้อมส่งคำค้นหา
        .then(function (response) {
          setTrips(response.data.data); // อัปเดตข้อมูลสถานที่
          setHasSearched(true); // บันทึกว่ามีการค้นหาแล้ว
        })
        .catch(function () {
          setError("เกิดข้อผิดพลาด ไม่สามารถดึงข้อมูลได้");
          setHasSearched(true); // บันทึกว่ามีการค้นหาแล้ว
        })
        .finally(function () {
          setLoading(false); // ซ่อนสถานะ Loading เมื่อเสร็จสิ้น
        });
    }, 1500); // เพิ่มเวลา Loading อย่างน้อย 1.5 วินาที
  }

  // ฟังก์ชันที่ส่งให้ Tags เพื่อให้สามารถค้นหาอัตโนมัติได้
  function handleTagClick(tag) {
    setSearchQuery(tag); // อัปเดตคำค้นหาเป็นชื่อ Tag
    setTriggerSearch(true); // บังคับให้เริ่มต้นการค้นหา
  }

  // ใช้ useEffect เพื่อตรวจสอบการเปลี่ยนแปลงของ searchQuery และ triggerSearch
  useEffect(
    function () {
      if (triggerSearch) {
        fetchTrips(); // เรียกใช้การค้นหา
        setTriggerSearch(false); // รีเซ็ตค่า triggerSearch
      }
    },
    [searchQuery, triggerSearch] // ตรวจจับการเปลี่ยนแปลง
  );

  return (
    <div className="App">
      {/* Header */}
      <h1 className="header">เที่ยวไหนดี</h1>

      {/* ช่องค้นหา */}
      <div className="search-container">
        <SearchInput
          searchQuery={searchQuery}
          handleSearch={handleSearchChange}
          onSearch={fetchTrips} // รองรับการกด Enter
        />
        <button onClick={fetchTrips} className="search-button">
          ค้นหา
        </button>

        {/* แสดงจำนวนผลลัพธ์ที่ค้นพบ */}
        {hasSearched && !loading && (
          <p className="result-count">
            สถานที่เที่ยวจากคำที่คุณค้นหามี {trips.length} รายการ
          </p>
        )}
      </div>

      {/* แสดงข้อความ Loading */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>..Loading..</p>
        </div>
      )}

      {/* แสดงข้อความ Error */}
      {error && <p className="error-message">{error}</p>}

      {/* แสดงผลลัพธ์ */}
      {!loading && (
        <div className="results-container">
          {hasSearched && trips.length === 0 ? (
            <p className="no-results">ไม่พบข้อมูล</p>
          ) : (
            trips.map(function (trip) {
              return (
                <ResultItem
                  key={trip.eid}
                  place={trip}
                  handleTagClick={handleTagClick} // ส่งฟังก์ชัน handleTagClick
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default App;
