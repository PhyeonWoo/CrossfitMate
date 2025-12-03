
// ===== src/pages/WorkoutDetail.js =====
import React from "react";
import { useParams } from "react-router-dom";
import { workouts } from "../data/workouts";
import WorkoutDetailCard from "../components/WorkoutDetailCard";
import { toggleFavorite, isFavorite } from "../utils/localStorage";

export default function WorkoutDetail() {
  const { id } = useParams();
  const workout = workouts.find((w) => String(w.id) === id);
  const [fav, setFav] = React.useState(isFavorite(workout?.id));

  if (!workout) return <p>운동을 찾을 수 없어요.</p>;

  return (
    <div>
      <WorkoutDetailCard workout={workout} />
      <div className="center">
        <button className="btn primary" onClick={() => {
          toggleFavorite(workout);
          setFav(isFavorite(workout.id));
        }}>
          {fav ? "★ 즐겨찾기 해제" : "☆ 즐겨찾기"}
        </button>
      </div>
    </div>
  );
}
