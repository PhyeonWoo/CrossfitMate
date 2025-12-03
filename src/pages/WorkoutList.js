import React, { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { isFavorite, toggleFavorite } from "../utils/localStorage";
import AdCarousel from "../components/AdCarousel";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [_, force] = React.useReducer((x) => x + 1, 0);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const snap = await getDocs(collection(db, "workouts"));
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkouts(list);
      setLoading(false);
    };
    fetchWorkouts();
  }, []);

  if (loading) return <div>운동 불러오는 중...</div>;

  return (
    <div>
      <AdCarousel/>
      <h1>운동 목록</h1>
      {workouts.map((w) => (
        <WorkoutCard
          key={w.id}
          workout={w}
          favorite={isFavorite(w.id)}
          onToggleFavorite={() => {
            toggleFavorite(w.id);
            force();
          }}
        />
      ))}
    </div>
  );
}