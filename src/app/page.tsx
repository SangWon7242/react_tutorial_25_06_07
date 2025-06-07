"use client";

import { useState } from "react";

export default function App() {
  // 리액트는 마지막에 변한 값을 기억!
  // 기억한 값을 count 변수에 저장
  const [count, setCount] = useState(0);

  return (
    <>
      <div>count : {count}</div>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </>
  );
}
