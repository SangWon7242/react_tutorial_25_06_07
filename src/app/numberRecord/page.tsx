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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="text-2xl font-bold mb-4 text-center text-indigo-700">
        현재 값: {count}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={increaseNumber}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          증가
        </button>
        <button
          onClick={decreaseNumber}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          감소
        </button>
        <button
          onClick={recordNumber}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          기록
        </button>
        <button
          onClick={clearRecords}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          초기화
        </button>
      </div>
    </div>
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
    <div className="flex items-center justify-between">
      <span className="text-lg font-medium">{record}</span>
      <div className="flex gap-2">
        <button
          onClick={() => removeRecord(index)}
          className="bg-red-100 hover:bg-red-200 text-red-700 py-1 px-3 rounded-md text-sm transition-colors duration-200"
        >
          삭제
        </button>
        <button
          onClick={() => setEditModeStatus(true)}
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-3 rounded-md text-sm transition-colors duration-200"
        >
          수정
        </button>
      </div>
    </div>
  );

  const editView = (
    <div className="flex items-center justify-between">
      <input
        onChange={(e) => setInputedNumber(Number(e.target.value))}
        type="number"
        value={inputedNumber}
        className="border border-gray-300 rounded-md px-3 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button
          onClick={() => {
            modifyRecord(index, inputedNumber);
            setEditModeStatus(false);
          }}
          className="bg-green-100 hover:bg-green-200 text-green-700 py-1 px-3 rounded-md text-sm transition-colors duration-200"
        >
          완료
        </button>
        <button
          onClick={() => {
            setInputedNumber(record);
            setEditModeStatus(false);
          }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm transition-colors duration-200"
        >
          취소
        </button>
      </div>
    </div>
  );

  return (
    <li className="border-b border-gray-200 py-3 last:border-b-0">
      {editModeStatus ? editView : readView}
    </li>
  );
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
    <div className="bg-white rounded-lg shadow-md p-6">
      {records.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h1 className="text-xl font-bold">기록이 없습니다</h1>
          <p className="mt-1">숫자를 기록해보세요</p>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4 text-indigo-700 border-b pb-2">
            기록 목록
          </h1>
          <ul className="divide-y divide-gray-200">
            {records.map((record, index) => (
              <NumberRecordItem
                key={index}
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
  );
};

export default function NumberRecordPage() {
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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">
          숫자 기록 앱
        </h1>
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
      </div>
    </div>
  );
}
