// src/utils/scriptLoader.js
// 네이버 지도 JS SDK 동적 로더
const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID || "YOUR_CLIENT_ID"; // 키 넣으세요
let cached;

export function loadNaverMap() {
  if (cached) return cached;
  cached = new Promise((resolve, reject) => {
    if (window.naver && window.naver.maps) return resolve(window.naver);
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`;
    script.async = true;
    script.onload = () => resolve(window.naver);
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return cached;
}