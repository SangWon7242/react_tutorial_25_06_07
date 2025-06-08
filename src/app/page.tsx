"use client";

import { useState } from "react";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [records, setRecords] = useState<number[]>([10, 20, 30, 40, 50]);

  const increaseNumber = () => {
    setCount(count + 1);
  };

  const decreaseNumber = () => {
    setCount(count - 1);
  };

  const recordNumber = () => {
    if (count === 0) return;

    setCount(0);
    setRecords([...records, count]);
  };

  const clearRecords = () => {
    setCount(0);
    setRecords([]);
  };

  const removeRecord = (index: number) => {
    setRecords(records.filter((_, _index) => _index !== index));
  };

  return (
    <>
      <div>count : {count}</div>
      <div className="btn-group">
        <button onClick={increaseNumber}>증가</button>
        &nbsp;
        <button onClick={decreaseNumber}>감소</button>
        &nbsp;
        <button onClick={recordNumber}>기록</button>
        &nbsp;
        <button onClick={clearRecords}>초기화</button>
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
                  <span>{index + 1}번 : </span>
                  <span>{record}</span>
                  &nbsp;
                  <button onClick={() => removeRecord(index)}>삭제</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
