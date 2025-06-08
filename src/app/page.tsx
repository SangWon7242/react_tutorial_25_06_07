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

interface NumberRecordItemProps {
  record: number;
  index: number;
  removeRecord: (index: number) => void;
  modifyRecord: (index: number, newNumber: number) => void;
}

const NumberRecordItem = ({
  record,
  index,
  removeRecord,
  modifyRecord,
}: NumberRecordItemProps) => {
  const [inputedNumber, setInputedNumber] = useState<number>(record);
  const [editModeStatus, setEditModeStatus] = useState<boolean>(false);

  const readView = (
    <>
      <span>{record}</span>
      &nbsp;
      <button onClick={() => removeRecord(index)}>삭제</button>
      &nbsp;
      <button onClick={() => setEditModeStatus(true)}>수정</button>
    </>
  );

  const editView = (
    <>
      {/* 입력값이 변경되면 setInputedNumber를 호출하여 inputedNumber를 변경 */}
      {/* e.target.value는 string이기 때문에 Number로 변환 */}
      <input
        onChange={(e) => setInputedNumber(Number(e.target.value))}
        type="number"
        value={inputedNumber}
      />
      &nbsp;
      <button
        onClick={() => {
          modifyRecord(index, inputedNumber);
          setEditModeStatus(false);
        }}
      >
        수정 완료
      </button>
      &nbsp;
      <button
        onClick={() => {
          setInputedNumber(record);
          setEditModeStatus(false);
        }}
      >
        수정 취소
      </button>
    </>
  );

  return <li>{editModeStatus ? editView : readView}</li>;
};

interface NumberRecordListProps {
  records: number[];
  removeRecord: (index: number) => void;
  modifyRecord: (index: number, newNumber: number) => void;
}

const NumberRecordList = ({
  records,
  removeRecord,
  modifyRecord,
}: NumberRecordListProps) => {
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
                <NumberRecordItem
                  key={index} // 식별하는 수단
                  record={record}
                  index={index}
                  removeRecord={removeRecord}
                  modifyRecord={modifyRecord}
                />
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

  const modifyRecord = (index: number, newNumber: number) => {
    const newNumbers = records.map((_number, _index) =>
      _index === index ? newNumber : _number
    );

    setRecords(newNumbers);
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
      <NumberRecordList
        records={records}
        removeRecord={removeRecord}
        modifyRecord={modifyRecord}
      />
    </>
  );
}
