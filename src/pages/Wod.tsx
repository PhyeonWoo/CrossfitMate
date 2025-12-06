// src/pages/Wod.tsx
import React, {
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { db, auth } from "../firebase/firebaseConfig";
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// 노트 타입 정의
interface Note {
  id: string;
  title: string;
  memo: string;
  createdAt?: Date;
  uid: string;
  email: string | null;
}

// 저장, 수정, 삭제 + 검색
const Wod = () => {
  const [title, setTitle] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [myNotes, setMyNotes] = useState<Note[]>([]);
  const [keyword, setKeyword] = useState<string>(""); // 🔍 검색어

  // 수정 모드 상태
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editMemo, setEditMemo] = useState<string>("");

  // 내 노트 불러오기
  const fetchMyNotes = async (): Promise<void> => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(
        collection(db, "notes"),
        where("uid", "==", user.uid)
      );

      const snap = await getDocs(q);

      const list: Note[] = snap.docs
        .map((docu) => {
          const data = docu.data() as any;
          return {
            id: docu.id,
            title: data.title ?? "",
            memo: data.memo ?? "",
            uid: data.uid,
            email: data.email ?? null,
            createdAt: data.createdAt ? data.createdAt.toDate() : undefined,
          };
        })
        .sort(
          (a, b) =>
            (b.createdAt?.getTime() || 0) -
            (a.createdAt?.getTime() || 0)
        );

      setMyNotes(list);
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchMyNotes();
  }, []);

  // 🔍 검색된 노트 (제목/내용에 keyword 포함)
  const filteredNotes = myNotes.filter((note) => {
    if (!keyword.trim()) return true; // 검색어 없으면 전체
    const lower = keyword.toLowerCase();
    return (
      note.title.toLowerCase().includes(lower) ||
      note.memo.toLowerCase().includes(lower)
    );
  });

  // 저장
  const handleSave = async (): Promise<void> => {
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
      fetchMyNotes();
    } catch (error) {
      console.error(error);
      alert("저장 실패");
    }
  };

  // 수정 저장
  const handleUpdate = async (): Promise<void> => {
    if (!editId) return;

    try {
      const noteRef = doc(db, "notes", editId);
      await updateDoc(noteRef, {
        title: editTitle,
        memo: editMemo,
      });

      alert("수정 완료!");
      setEditId(null);
      setEditTitle("");
      setEditMemo("");
      fetchMyNotes();
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 실패");
    }
  };

  // 삭제
  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const noteRef = doc(db, "notes", id);
      await deleteDoc(noteRef);
      alert("삭제 완료");
      fetchMyNotes();
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 저장 입력창 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "25vh",
        }}
      >
        <h2>WOD 저장</h2>

        <input
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          style={{ 
            width: "100%",
            padding: 8,
            marginBottom: 8,
            borderRadius: 8,
            border: "1px solid #444",
            background: "#000",
            color: "#fff",
          }}
        />
        <textarea
          placeholder="메모 입력"
          value={memo}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setMemo(e.target.value)
          }
          style={{
            width: "100%",
            height: 120,
            padding: 8,
            marginBottom: 8,
            borderRadius: 8,
            border: "1px solid #444",
            background: "#000",
            color: "#fff",
          }}
        />

        <button onClick={handleSave} style={{ padding: "8px 20px" }}>
          저장
        </button>
      </div>

      {/* 🔍 검색 입력 */}
      <div
        style={{
          marginTop: "30px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <input
          type="text"
          placeholder="제목 또는 내용으로 검색"
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          style={{
            padding: 8,
            width: "260px",
            borderRadius: 8,
            border: "1px solid #444",
            background: "#111",
            color: "#fff",
          }}
        />
      </div>

      {/* 목록 출력 */}
      <div style={{ marginTop: "20px" }}>
        <h3>내가 저장한 WOD</h3>

        {filteredNotes.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              style={{
                padding: "12px",
                border: "1px solid #444",
                borderRadius: "8px",
                marginBottom: "12px",
                background: "#111",
              }}
            >
              {editId === note.id ? (
                <>
                  {/* 🔥 수정 모드 */}
                  <input
                    value={editTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditTitle(e.target.value)
                    }
                    style={{ width: "100%", marginBottom: 8, padding: 6 }}
                  />
                  <textarea
                    value={editMemo}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setEditMemo(e.target.value)
                    }
                    style={{ width: "100%", height: 80, padding: 6 }}
                  />

                  <button
                    onClick={handleUpdate}
                    style={{
                      marginTop: 8,
                      padding: "6px 14px",
                      background: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                    }}
                  >
                    수정 완료
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    style={{
                      marginLeft: 8,
                      padding: "6px 14px",
                      background: "#888",
                      color: "#fff",
                      borderRadius: 6,
                    }}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  {/* 🔥 기본 모드 */}
                  <h4 style={{ marginBottom: "5px" }}>{note.title}</h4>
                  <p style={{ whiteSpace: "pre-wrap" }}>{note.memo}</p>
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    {note.createdAt?.toLocaleString()}
                  </div>

                  <button
                    onClick={() => {
                      setEditId(note.id);
                      setEditTitle(note.title);
                      setEditMemo(note.memo);
                    }}
                    style={{
                      marginTop: 6,
                      padding: "4px 10px",
                      background: "#444",
                      color: "#fff",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  >
                    ✏️ 수정하기
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    style={{
                      marginLeft: 8,
                      marginTop: 6,
                      padding: "4px 10px",
                      background: "#822",
                      color: "#fff",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  >
                    🗑 삭제하기
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wod;