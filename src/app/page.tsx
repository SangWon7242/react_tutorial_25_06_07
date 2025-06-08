"use client";

import { useState } from "react";

// 인터페이스 : 타입 정의
interface NumberRecordFormProps {
  count: number;
  increaseNumber: () => void;
  decreaseNumber: () => void;
  recordNumber: () => void;
  clearRecords: () => void;
}

const NumberRecordForm = ({
  count,
  increaseNumber,
  decreaseNumber,
  recordNumber,
  clearRecords,
}: NumberRecordFormProps) => {
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
    </>
  );
};

interface NumberRecordListProps {
  records: number[];
  removeRecord: (index: number) => void;
}

const NumberRecordList = ({ records, removeRecord }: NumberRecordListProps) => {
  return (
    <>
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
};

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
      <NumberRecordForm
        count={count}
        increaseNumber={increaseNumber}
        decreaseNumber={decreaseNumber}
        recordNumber={recordNumber}
        clearRecords={clearRecords}
      />
      <NumberRecordList records={records} removeRecord={removeRecord} />
    </>
  );
}
