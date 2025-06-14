"use client";

import { useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState<string[]>([]);

  setTimeout(() => {
    setTodos([...todos, todos.length + 1 + ""]);
  }, 5000);

  return (
    <>
      <div>{JSON.stringify(todos)}</div>
    </>
  );
}
