// src/pages/Board.tsx
import React, { useEffect, useState, ChangeEvent } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  uid: string;
  email: string | null;
}

const Board = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 전체 게시글 불러오기
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "posts"));

    
      const list: Post[] = snap.docs
        .map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            title: data.title ?? "",
            content: data.content ?? "",
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

      setPosts(list);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  // 글 작성
  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      setTitle("");
      setContent("");
      await fetchPosts();
      alert("글이 등록되었습니다.");
    } catch (error) {
      console.error("글 등록 실패:", error);
      alert("글 등록에 실패했습니다.");
    }
  };

  
  // 글 삭제 (본인 글만)
  const handleDelete = async (id: string, uid: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (user.uid !== uid) {
      alert("본인이 작성한 글만 삭제할 수 있습니다.");
      return;
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      await fetchPosts();
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>전체 게시판</h2>

      {/* 글 작성 영역 */}
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          border: "1px solid #333",
          marginBottom: 24,
          background: "#111",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>새 글 작성</h3>
        <input
          type="text"
          placeholder="제목을 입력하세요"
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
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
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
        <button
          onClick={handleSubmit}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#4CAF50",
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          등록
        </button>
      </div>

      {/* 글 목록 영역 */}
      <div>
        <h3 style={{ marginBottom: 12 }}>전체 글 목록</h3>
        {loading ? (
          <div>불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div style={{ color: "#aaa", fontSize: 13 }}>
            아직 등록된 글이 없습니다. 첫 글을 남겨보세요!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #333",
                background: "#151515",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              >
                {post.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#ccc",
                  whiteSpace: "pre-wrap",
                  marginBottom: 6,
                }}
              >
                {post.content}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#777",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  {post.email ?? "알 수 없는 사용자"} /{" "}
                  {post.createdAt
                    ? post.createdAt.toLocaleString()
                    : "날짜 없음"}
                </span>
                {auth.currentUser?.uid === post.uid && (
                  <button
                    onClick={() => handleDelete(post.id, post.uid)}
                    style={{
                      marginLeft: 8,
                      padding: "3px 8px",
                      borderRadius: 6,
                      border: "none",
                      background: "#822",
                      color: "#fff",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    🗑 삭제
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;