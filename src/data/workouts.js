export const workouts = [
  {
    id: 1,
    name: "Burpee",
    category: "전신",
    difficulty: "중",
    description:
      "전신을 사용하는 고강도 운동. 스쿼트 → 플랭크 → 푸시업 → 점프를 연속 수행.",
    steps: [
      "발을 어깨너비로 벌리고 서서 스쿼트 자세로 내려간다.",
      "손을 바닥에 대고 다리를 뒤로 뻗어 플랭크/푸시업 자세를 만든다.",
      "푸시업 1회 후 다리를 다시 당겨 일어나 점프한다.",
    ],
    caution: "허리 과신전 주의, 코어 고정.",
    youtube: "https://www.youtube.com/watch?v=TU8QYVW0gDU",
    image: "../assets/burpee.jpg",
    muscles: ["가슴", "코어", "둔근", "햄스트링"],
  },
  {
    id: 2,
    name: "Kettlebell Swing",
    category: "하체/코어",
    difficulty: "중",
    description:
      "케틀벨을 힙힌지로 스윙하여 둔근/햄스트링과 코어를 단련.",
    steps: [
      "무릎은 살짝 굽히고, 엉덩이를 뒤로 빼며 힙힌지.",
      "케틀벨을 사타구니로 보냈다가 엉덩이 힘으로 앞쪽으로 스윙.",
      "어깨로 들지 않도록 주의, 팔은 가이드 역할.",
    ],
    caution: "허리로 당기지 말 것. 시선 수평 유지.",
    youtube: "https://www.youtube.com/watch?v=6TlbDQUWs0s",
    image: "/assets/kb_swing.jpg",
    muscles: ["둔근", "햄스트링", "코어"],
  },
  {
    id: 3,
    name: "Double Under",
    category: "유산소",
    difficulty: "상",
    description: "줄넘기 줄이 발 아래를 두 번 지나가도록 점프.",
    steps: [
      "팔꿈치를 몸통 가까이, 손목 스냅으로 줄 가속.",
      "평이한 상체, 무릎보다 발목 중심 점프.",
      "리듬 유지 및 호흡 조절.",
    ],
    caution: "과도한 무릎 굴곡/착지 충격 주의.",
    youtube: "https://www.youtube.com/watch?v=1BZMw4qYxZI",
    image: "/assets/double_under.jpg",
    muscles: ["종아리", "코어"],
  },
  {
    id: 4,
    name: "Snatch",
    category:"역도",
    difficulty:"상",
    description:"어쩌구 저쩌구",
    steps: [
      "ddd",
      "d"
    ],
    image: "/assets/sntach.jpg",
  },
  {
    id: 5,
    name:"Row",
    category:"유산소",
    difficulty:"중",
    description: "로잉 머신",
    steps: [
      "로잉머신을 이용한 조정",
      "ㅇㅇㅇ"
    ],
    image:"/assets/row.jpg",
  }
];
