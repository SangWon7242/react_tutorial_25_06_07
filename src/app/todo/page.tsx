"use client";

import { useState } from "react";

export default function Todo() {
  const [newTodoContent, setNewTodoContent] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (newTodoContent.trim() === "") {
      alert("할 일 내용을 입력해주세요.");
      return;
    }

    setTodos([...todos, newTodoContent]);
    setNewTodoContent("");
  };

  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <input
            type="text"
            value={newTodoContent}
            placeholder="새 할 일 추가를 입력해주세요."
            onChange={(e) => setNewTodoContent(e.target.value)}
            className="input input-bordered"
          />
          <button onClick={addTodo} className="btn btn-primary">
            할 일 추가
          </button>
        </form>
      </div>
      <div>
        <>
          <h1>할 일 목록</h1>
          {JSON.stringify(todos)}
        </>
      </div>
    </>
  );
}
