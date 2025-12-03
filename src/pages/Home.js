// src/pages/Home.js
import React from "react";
import Sidebar from "../components/SideBar";     // ← 경로 주의! (SideBar.js)
import WorkoutList from "./WorkoutList";        // ← Home과 같은 pages 폴더라서 "./"
import { auth } from "../firebase/firebaseConfig";

export default function Home() {
  const onLogout = () => {
    auth.signOut();
  }
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
      }}
    >

      {/* 오른쪽 메인 영역 */}
      <div style={{ flex: 1, padding: 16 }}>
        <h1 style={{ marginBottom: 16 }}>운동 목록</h1>

        {/* WorkoutList 전체를 홈 안에 삽입 */}
        <WorkoutList />
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}