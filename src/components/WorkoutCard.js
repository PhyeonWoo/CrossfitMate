
// 운동 아래 설명
import React from "react";
import { Link } from "react-router-dom";
export default function WorkoutCard({ workout, onToggleFavorite, favorite }) {
  return (
    <div className="card">
      <br/>
      <div className="card-body">
        <h3 className="title">{workout.name}</h3>
        <p className="meta">{workout.category} / 난이도 {workout.difficulty}</p>
        <p className="desc">{workout.description}</p>
        <div className="row">
          <Link to={`/workouts/${workout.id}`} className="btn">자세히</Link>
          <br/>
          <br/>
          <button className={`btn ${favorite ? "secondary" : "primary"}`} onClick={onToggleFavorite}>
            {favorite ? "★ 즐겨찾기 해제" : "☆ 즐겨찾기"}
          </button>
        </div>
      </div>
    </div>
  );
}