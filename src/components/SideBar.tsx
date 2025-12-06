// src/components/SideBar.tsx
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

const Sidebar = () => {
  const onLogout = (): void => {
    auth.signOut();
  };

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

      <nav>
        <NavLink
          to="/home"
          style={({ isActive }): React.CSSProperties => ({
            ...linkBaseStyle,
            background: isActive ? "#222" : "transparent",
            color: isActive ? "#fff" : "#ccc",
          })}
        >
          🏠 홈
        </NavLink>

        <NavLink
          to="/workouts"
          style={({ isActive }): React.CSSProperties => ({
            ...linkBaseStyle,
            background: isActive ? "#222" : "transparent",
            color: isActive ? "#fff" : "#ccc",
          })}
        >
          🏋️‍♂️ 운동 목록
        </NavLink>

        <NavLink
          to="/wod"
          style={({ isActive }): React.CSSProperties => ({
            ...linkBaseStyle,
            background: isActive ? "#222" : "transparent",
            color: isActive ? "#fff" : "#ccc",
          })}
        >
          📅 Today WOD
        </NavLink>

        <div style={{ marginTop: "16px" }}>
          <button
            onClick={onLogout}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #555",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;