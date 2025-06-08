"use client";

import { useState } from "react";
import { json } from "stream/consumers";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [records, setRecords] = useState<number[]>([]);

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
            setRecords([...records, count]);
          }}
        >
          기록
        </button>
        &nbsp;
        <button onClick={() => setRecords([])}>초기화</button>
      </div>
      <div className="recordForm">
        {records.length === 0 ? (
          <h1 className="text-lg font-bold">기록이 없습니다.</h1>
        ) : (
          <>
            <h1 className="text-lg font-bold">기록</h1>
            <ul>
              {records.map((record, index) => (
                <li key={index}>
                  {index + 1}번 : {record}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
