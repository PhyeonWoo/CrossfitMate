// 사이드 바
import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";


const linkBaseStyle = {
  display: "block",
  padding: "10px 14px",
  borderRadius: "8px",
  marginBottom: "6px",
  textDecoration: "none",
  color: "#ccc",
  fontSize: "14px",
};


export default function Sidebar() {
  const onLogout = () => {
    auth.signOut();
  }
  return (
    <aside
      style={{
        width: "200px",
        padding: "16px",
        borderRight: "1px solid #333",
        background: "#000",
        boxSizing: "border-box",
      }}
    >
      {/* 로고/타이틀 */}
      <div
        style={{
          fontWeight: 700,
          fontSize: "18px",
          marginBottom: "16px",
          color: "#fff",
        }}
      >
        CrossFit Mate
      </div>

      {/* 네비게이션 링크 */}
      <nav>
        {/* <NavLink
          to="/workouts"
          style={({ isActive }) => ({
            ...linkBaseStyle,
            background: isActive ? "#222" : "transparent",
            color: isActive ? "#fff" : "#ccc",
          })}
        >
          🏠 홈
        </NavLink> */}

        <NavLink
          to="/workouts"
          style={({ isActive }) => ({
            ...linkBaseStyle,
            background: isActive ? "#222" : "transparent",
            color: isActive ? "#fff" : "#ccc",
          })}
        >
          🏋️‍♂️ 운동 목록
        </NavLink>
        
        <NavLink
          to="/wod"
          style={({ isActive }) => ({
            ...linkBaseStyle,
            background: isActive ? "#222" : "transparent",
            color: isActive ? "#fff" : "#ccc",
          })}
        >
          📅 Today WOD
        </NavLink>

        <div>
          <button onClick={onLogout}>Logout</button>
        </div>

        {/* <NavLink
          to="/calendar"
          style={({ isActive }) => ({
            ...linkBaseStyle,
            background: isActive ? "#222" : "transparent",
            color: isActive ? "#fff" : "#ccc",
          })}
        >
          📅 Calendar
        </NavLink> */}
    
        {/* 필요하면 나중에 Today WOD, 통계 등 추가 */}
        {/* 
        <NavLink ...>📅 Today WOD</NavLink>
        <NavLink ...>📊 기록 & 통계</NavLink>
        */}

        {/* <div style={{ marginTop: "16px", fontSize: "12px", color: "#666" }}>
          계정
        </div> */}
        
      </nav>
    </aside>
  );
}