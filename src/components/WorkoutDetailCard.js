import React from "react";
export default function WorkoutDetailCard({ workout }) {
  if (!workout) return null;
  return (
    <article className="detail">
      <header className="detail-header">
        {workout.image && <img src={workout.image} alt={workout.name} className="detail-img" />}
        <div>
          <h1>{workout.name}</h1>
          <p className="meta">{workout.category} · 난이도 {workout.difficulty}</p>
          <p>{workout.description}</p>
          {workout.muscles?.length && (
            <p className="chips">근육: {workout.muscles.join(", ")}</p>
          )}
        </div>
      </header>

      {workout.steps?.length > 0 && (
        <section>
          <h2>동작 단계</h2>
          <ol className="steps">
            {workout.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>
      )}

      {workout.caution && (
        <section>
          <h2>주의사항</h2>
          <p className="warn">{workout.caution}</p>
        </section>
      )}

      {workout.youtube && (
        <section>
          <h2>설명 영상</h2>
          <div className="video-wrap">
            <iframe
              width="560"
              height="315"
              src={workout.youtube.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </article>
  );
}
