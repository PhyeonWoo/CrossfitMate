// src/utils/localStorage.js

const FAVORITES_KEY = "favorites";

// 배열 꺼내기
export const getFavorites = () => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("localStorage parse error", err);
    return [];
  }
};

// 즐겨찾기 여부
export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.includes(String(id));
};

// 추가
export const addFavorite = (id) => {
  const favorites = getFavorites();
  const newList = [...new Set([...favorites, String(id)])];
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(newList));
};

// 제거
export const removeFavorite = (id) => {
  const favorites = getFavorites();
  const newList = favorites.filter((x) => x !== String(id));
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(newList));
};

// 🔥 여기 추가해야 함! (공통 토글 기능)
export const toggleFavorite = (id) => {
  if (isFavorite(id)) {
    removeFavorite(id);
  } else {
    addFavorite(id);
  }
};