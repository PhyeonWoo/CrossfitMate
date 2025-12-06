// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { getFavorites } from "../utils/localStorage";
import Ad from "../components/Ad.tsx";

// Firestore에서 가져오는 WOD 노트 타입
interface Note {
  id: string;
  title: string;
  memo: string;
  createdAt?: Date;
  uid?: string;
  email?: string | null;
}

// 대시보드 카드 컴포넌트 prop 타입
interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Home = () => {
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  // 즐겨찾기 개수
  useEffect(() => {
    try {
      const favs = getFavorites ? (getFavorites() as any[]) : [];
      setFavoriteCount(favs.length || 0);
    } catch (e) {
      console.error(e);
    }
  }, []);


  // 저장된 WOD 보기
  useEffect(() => {
    const fetchRecentNotes = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, "notes"),
          where("uid", "==", user.uid),
          limit(3),
        );

        const snap = await getDocs(q);

        const list: Note[] = snap.docs.map((docu) => {
          const data = docu.data() as any;
          return {
            id: docu.id,
            title: data.title ?? "",
            memo: data.memo ?? "",
            uid: data.uid,
            email: data.email ?? null,
            createdAt: data.createdAt ? data.createdAt.toDate() : undefined,
          };
        });

        setRecentNotes(list);
      } catch (err) {
        console.error("최근 WOD 불러오기 실패:", err);
      }
    };

    fetchRecentNotes();
  }, []);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* 상단 타이틀 */}
      <h1
        style={{
          marginBottom: 8,
          textAlign: "center",
          fontSize: "28px",
          fontWeight: 700,
        }}
      >
        CrossFit Mate
      </h1>
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
          fontSize: "13px",
          color: "#bbb",
        }}
      >
        광고문의: 010-1234-5678
      </div>

      {/* 🔥 광고 캐러셀 */}
      <Ad />

      {/* 📊 요약 카드 3개 */}
      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {/* 오늘의 WOD */}
        <DashboardCard
          title="오늘의 WOD"
          subtitle="하루 한 번, 루틴 지키기"
        >
          <Link
            to="/wod"
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #666",
              fontSize: 12,
              textDecoration: "none",
              color: "#fff",
            }}
          >
            오늘 WOD 기록하러 가기 →
          </Link>
        </DashboardCard>

        {/* 즐겨찾기 운동 */}
        <DashboardCard
          title="즐겨찾는 운동"
          subtitle="자주 하는 운동 바로가기"
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {favoriteCount}개
          </div>
          <Link
            to="/workouts"
            style={{
              fontSize: 12,
              color: "#9cf",
              textDecoration: "none",
            }}
          >
            운동 목록 보기
          </Link>
        </DashboardCard>

        {/* 최근 WOD 기록 수 */}
        <DashboardCard
          title="최근 WOD 기록"
          subtitle="최근 3개의 운동 메모"
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {recentNotes.length}개
          </div>
          <Link
            to="/wod"
            style={{
              fontSize: 12,
              color: "#9cf",
              textDecoration: "none",
            }}
          >
            전체 기록 보기
          </Link>
        </DashboardCard>
      </div>

      {/* 📚 최근 WOD 기록 미리보기 */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>최근 WOD 기록</h2>
        {recentNotes.length === 0 ? (
          <div style={{ fontSize: 13, color: "#aaa" }}>
            아직 저장된 WOD가 없습니다. 오늘 첫 기록을 남겨보세요!
          </div>
        ) : (
          recentNotes.map((note) => (
            <div
              key={note.id}
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #333",
                background: "#151515",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: 4,
                  fontSize: 14,
                }}
              >
                {note.title || "제목 없음"}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#ccc",
                  marginBottom: 4,
                  whiteSpace: "pre-wrap",
                }}
              >
                {note.memo && note.memo.length > 80
                  ? note.memo.slice(0, 80) + "..."
                  : note.memo}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#777",
                }}
              >
                {note.createdAt
                  ? note.createdAt.toLocaleString()
                  : "날짜 정보 없음"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 🔹 재사용 가능한 대시보드 카드 컴포넌트
function DashboardCard({
  title,
  subtitle,
  children,
}: DashboardCardProps) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        background: "#181818",
        border: "1px solid #333",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 12,
            color: "#aaa",
            marginBottom: 10,
          }}
        >
          {subtitle}
        </div>
      )}
      {children}
    </div>
  );
}

export default Home;