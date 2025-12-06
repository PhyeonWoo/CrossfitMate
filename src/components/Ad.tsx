// 메인 홈 광고
import React, { useState } from "react";
import ad1 from "../assets/ad1.jpg";
import ad2 from "../assets/ad2.jpg";
import ad3 from "../assets/ad3.jpg";

interface AdType {
    id: number;
    src: string;
    alt: string;
}

const ads: AdType[] = [
  { id: 1, src: ad1, alt: "광고 1" }, 
  { id: 2, src: ad2, alt: "광고 2" },
  {id: 3, src: ad3, alt: "광고 3"},
];

const Ad = () => {
    const [index,setIndex] = useState<number>(0);

  const prev = () => {
    setIndex((prevIdx) => (prevIdx === 0 ? ads.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setIndex((prevIdx) => (prevIdx === ads.length - 1 ? 0 : prevIdx + 1));
  };

  const current = ads[index];

   return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "16px auto 32px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <button
        onClick={prev}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: "28px",
          cursor: "pointer",
        }}
      >
        ‹
      </button>

      <div
        style={{
          width: "100%",
          height: "360px",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          background: "#222",
        }}
      >
        <img
          src={current.src}
          alt={current.alt}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <button
        onClick={next}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: "28px",
          cursor: "pointer",
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Ad;
