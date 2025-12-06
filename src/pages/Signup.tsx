// src/pages/Signup.tsx
import React, {
  useState,
  FormEvent,
  ChangeEvent,
} from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);

      // Firebase Auth 회원가입
      const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;
      const nameFromEmail = email.split("@")[0];

      await updateProfile(user, {
        displayName: nameFromEmail,
      });

      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      navigate("/"); // 회원가입 후 로그인 페이지로 이동
    } catch (error: any) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("이미 사용 중인 이메일입니다.");
          break;
        case "auth/invalid-email":
          setError("유효하지 않은 이메일 형식입니다.");
          break;
        default:
          setError(
            "회원가입에 실패했습니다. 다시 시도해주세요."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "25vh",
      }}
    >
      <h1>회원가입</h1>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호 (6자 이상)"
            value={password}
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) => setPasswordCheck(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      <p>
        이미 계정이 있나요?{" "}
        <Link to="/">로그인 하러가기</Link>
      </p>
    </div>
  );
};

export default Signup;