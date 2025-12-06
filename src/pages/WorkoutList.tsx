// src/pages/WorkoutList.tsx
import React, { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { isFavorite, toggleFavorite } from "../utils/localStorage";
import Ad from "../components/Ad";

// Firestore에서 가져오는 데이터 타입
interface Workout {
  id: string;
  // 나머지 필드는 자유롭게 들어갈 수 있도록
  [key: string]: any;
}

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, force] = React.useReducer((x: number) => x + 1, 0);


  // 불러오기 부분
  useEffect(() => {
    // FireStore에서 비동기로 가져오기
    const fetchWorkouts = async () => {
      const snap = await getDocs(collection(db, "workouts"));

      const list: Workout[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Workout, "id">),
      }));

      setWorkouts(list);
      setLoading(false);
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div>운동 불러오는 중...</div>;

  return (
    <div>
      <Ad />
      <h1>운동 목록</h1>
      {workouts.map((w) => (
        <WorkoutCard
          key={w.id}
          workout={w}
          favorite={isFavorite(w.id)}
          onToggleFavorite={() => {
            toggleFavorite(w.id);
            force(); // 즐겨찾기 상태 다시 렌더링
          }}
        />
      ))}
    </div>
  );
};

export default WorkoutList;