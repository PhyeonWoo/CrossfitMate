// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import WorkoutList from "./pages/WorkoutList";
import WorkoutDetail from "./pages/WorkoutDetail";
import MapPage from "./pages/MapPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wod from "./pages/Wod";
import Sidebar from "./components/SideBar";
import Calendar from "./pages/Calendar";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [init, setInit] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInit(false);
    });
    return () => unsub();
  }, []);

  if (init) {
    return <div style={{ color: "#fff" }}>로딩 중...</div>;
  }

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#111",
          color: "#fff",
        }}
      >
        {/* 🔥 로그인 돼 있을 때만 사이드바 표시 */}
        {user && <Sidebar />}

        {/* 오른쪽 메인 영역 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <main style={{ padding: 16, flex: 1 }}>
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="/home" replace /> : <Login />
                }
              />
              {/* 회원가입은 로그인 여부 상관 없이 접근 가능 */}
              <Route path="/signup" element={<Signup />} />

              {/* 아래부터는 로그인 필수 페이지들 */}
              <Route
                path="/home"
                element={
                  user ? <Home /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/workouts"
                element={
                  user ? <WorkoutList /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/workouts/:id"
                element={
                  user ? <WorkoutDetail /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/map"
                element={
                  user ? <MapPage /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/wod"
                element={
                  user ? <Wod /> : <Navigate to="/" replace />
                }
              />
            
            <Route
                path="/calendar"
                element={
                  user ? <Calendar /> : <Navigate to="/" replace />
                }
              />
            </Routes>

          </main>

          <footer
            style={{
              padding: 12,
              borderTop: "1px solid #333",
              color: "#aaa",
              fontSize: "12px",
            }}
          >
            © {new Date().getFullYear()} CrossFit Mate
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}