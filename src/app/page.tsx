"use client";

import { useState } from "react";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [record, setRecord] = useState<number | null>(null);

  return (
    <>
      <div>count : {count}</div>
      <div className="btn-group">
        <button onClick={() => setCount(count + 1)}>증가</button>
        &nbsp;
        <button onClick={() => setCount(count - 1)}>감소</button>
        &nbsp;
        <button
          onClick={() => {
            if (count === 0) return;

            setCount(0);
            setRecord(count);
          }}
        >
          기록
        </button>
        &nbsp;
        <button onClick={() => setRecord(null)}>초기화</button>
      </div>
      <div className="recordForm">
        {record == null ? (
          <h1 className="text-lg font-bold">기록이 없습니다.</h1>
        ) : (
          <>
            <h1 className="text-lg font-bold">기록</h1>
            <div>기록 : {record}</div>
          </>
        )}
      </div>
    </>
  );
}
