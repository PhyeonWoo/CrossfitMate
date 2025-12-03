// src/dev/SeedWorkouts.js
import React, { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { workouts } from "../data/workouts";

export default function SeedWorkouts() {
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    try {
      setStatus("업로드 중...");
      const colRef = collection(db, "workouts");

      for (const w of workouts) {
        // 기존 id를 Firestore 문서 id로 사용 (중복 실행해도 덮어쓰기)
        const docRef = doc(colRef, String(w.id));
        await setDoc(docRef, w);
      }

      setStatus("업로드 완료 ✅");
    } catch (e) {
      console.error(e);
      setStatus("에러 발생 ❌ 콘솔 확인");
    }
  };

  return (
    <div style={{ padding: 16, background: "#111", color: "white" }}>
      {/* <button onClick={handleUpload}>운동 목록을 Firebase에 업로드</button> */}
      {status && <p>{status}</p>}
    </div>
  );
}