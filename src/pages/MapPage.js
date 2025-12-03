// ===== src/pages/MapPage.js =====
import React from "react";
import { loadNaverMap } from "../utils/scriptLoader.js";

export default function MapPage() {
  const mapRef = React.useRef(null);
  const [keyword, setKeyword] = React.useState("크로스핏");

  React.useEffect(() => {
    let map, ps, infoWindow;
    loadNaverMap().then((naver) => {
      // 기본 위치: 사용자 현재 위치 또는 서울시청
      const fallback = new naver.maps.LatLng(37.5665, 126.9780);
      const init = (center) => {
        map = new naver.maps.Map(mapRef.current, {
          center,
          zoom: 14,
        });
        infoWindow = new naver.maps.InfoWindow({ anchorSkew: true });
        // 장소 검색 서비스(Places)는 별도 제공이 없어 키워드 마커를 직접 처리하거나, 상점 좌표 목록을 사용해야 합니다.
        // 간단한 데모: 네이버 장소 검색 REST를 서버에서 프록시하거나, 임의 위치 배열을 마킹하세요.
        // 여기서는 키워드가 바뀌면 네이버 지도 웹 검색 링크만 제공하는 버튼을 노출합니다.
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => init(new naver.maps.LatLng(pos.coords.latitude, pos.coords.longitude)),
          () => init(fallback)
        );
      } else init(fallback);
    });
  }, []);

  const openNaverSearch = () => {
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(keyword)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <h1>내 주변 크로스핏 찾기</h1>
      <div className="controls">
        <input className="input" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="검색어(예: 크로스핏)" />
        <button className="btn" onClick={openNaverSearch}>네이버지도에서 검색</button>
      </div>
      <div ref={mapRef} className="map" />
      <p className="hint">※ 데모 용: 지도를 로드하고, 실제 장소 마커는 별도의 좌표 데이터/REST 프록시로 구현하세요.</p>
    </div>
  );
}
