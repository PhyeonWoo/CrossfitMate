// src/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Signup } from './Signup';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // 에러 메시지 초기화

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert(`로그인 성공! ${userCredential.user.email}`);
      // navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('유효하지 않은 이메일 형식입니다.');
          break;
        case 'auth/user-not-found':
          setError('등록된 이메일이 아닙니다.');
          break;
        case 'auth/wrong-password':
          setError('비밀번호를 다시 확인해주세요');
          break;
        case 'auth/missing-password':
          setError('비밀번호를 입력하세요.');
          break;
        default:
          setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "25vh" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/Signup')}>회원가입하러가기</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;