import React, { useState, useEffect } from "react";
import { addDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

export default function Wod() {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [myNotes, setMyNotes] = useState([]); // 🔥 저장된 WOD 목록

  // 🔥 로그인한 유저의 WOD 불러오기
  const fetchMyNotes = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(
        collection(db, "notes"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc") // 최신순 정렬
      );

      const snap = await getDocs(q);

      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));

      setMyNotes(list);
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    }
  };

  // 화면 로딩 시 본인 기록 가져오기
  useEffect(() => {
    fetchMyNotes();
  }, []);

  // 🔥 저장 함수
  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    }

    try {
      await addDoc(collection(db, "notes"), {
        title,
        memo,
        createdAt: new Date(),
        uid: user.uid,
        email: user.email,
      });

      alert("저장 성공!");

      setTitle("");
      setMemo("");

      fetchMyNotes(); // 🔥 저장 후 내 기록 다시 불러오기
    } catch (error) {
      console.error(error);
      alert("저장 실패");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 입력 영역 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "25vh",
        }}
      >
        <h2>WOD 저장</h2>

        <input
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 10, padding: 8, width: "250px" }}
        />

        <textarea
          placeholder="메모 입력"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          style={{ marginBottom: 10, padding: 8, width: "250px", height: "100px" }}
        />

        <button onClick={handleSave} style={{ padding: "8px 20px" }}>
          저장
        </button>
      </div>

      {/* 🔥 내 WOD 목록 출력 */}
      <div style={{ marginTop: "40px" }}>
        <h3>내가 저장한 WOD</h3>

        {myNotes.length === 0 ? (
          <p>저장된 WOD가 없습니다.</p>
        ) : (
          myNotes.map((note) => (
            <div
              key={note.id}
              style={{
                padding: "12px",
                border: "1px solid #444",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            >
              <h4 style={{ marginBottom: "5px" }}>{note.title}</h4>
              <p style={{ whiteSpace: "pre-wrap" }}>{note.memo}</p>
              <div style={{ fontSize: "12px", marginTop: "4px", color: "#888" }}>
                {note.createdAt?.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}