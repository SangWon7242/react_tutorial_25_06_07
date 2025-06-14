"use client";

import { useState } from "react";

interface NewTodoFormProps {
  addTodo: (newTodoContent: string) => void;
  clearTodos: () => void;
}

let NewTodoFormCount = 0;

const NewTodoForm = ({
  addTodo: _addTodo,
  clearTodos: _clearTodos,
}: NewTodoFormProps) => {
  console.log(`NewTodoFormCount 실행 : ${++NewTodoFormCount}`);

  const [newTodoContent, setNewTodoContent] = useState<string>("");

  const addTodo = () => {
    if (newTodoContent.trim() === "") {
      alert("할 일 내용을 입력해주세요.");
      return;
    }

    _addTodo(newTodoContent);
    setNewTodoContent("");
  };

  const clearTodos = () => {
    _clearTodos();
    setNewTodoContent("");
  };

  return (
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
      <button onClick={clearTodos} className="btn btn-secondary">
        초기화
      </button>
    </form>
  );
};

interface NewTodoListProps {
  todos: string[];
  removeTodo: (index: number) => void;
}

interface TodoListItemProps {
  todo: string;
  index: number;
  removeTodo: (index: number) => void;
}

const TodoListItem = ({
  todo,
  index,
  removeTodo: _removeTodo,
}: TodoListItemProps) => {
  const [editModeStatus, setEditModeStatus] = useState<boolean>(false);
  const [inputedTodo, setInputedTodo] = useState<string>(todo);

  const changeEditModeStatus = () => {
    setEditModeStatus(!editModeStatus);
  };

  const cancelEditModeStatus = () => {
    setEditModeStatus(false);
  };

  const removeTodo = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      _removeTodo(index);
    }
  };

  return (
    <>
      {editModeStatus ? (
        <li className="flex gap-x-2 items-center">
          <input
            type="text"
            value={inputedTodo}
            onChange={(e) => setInputedTodo(e.target.value)}
            className="input input-bordered"
          />
          <button onClick={changeEditModeStatus} className="btn btn-primary">
            수정
          </button>
          <button onClick={cancelEditModeStatus} className="btn btn-secondary">
            취소
          </button>
        </li>
      ) : (
        <li className="flex gap-x-2 items-center">
          <span>
            {index + 1}번 : {todo}
          </span>
          <div className="flex gap-x-2">
            <button onClick={removeTodo} className="btn btn-error">
              삭제
            </button>
            <button onClick={changeEditModeStatus} className="btn btn-warning">
              수정
            </button>
          </div>
        </li>
      )}
    </>
  );
};

const NewTodoList = ({ todos, removeTodo }: NewTodoListProps) => {
  return (
    <>
      {todos.length === 0 ? (
        <h1 className="text-xl font-bold">할 일이 없습니다.</h1>
      ) : (
        <>
          <h1 className="text-xl font-bold">할 일 목록</h1>
          <ul>
            {todos.map((todo, index) => (
              <TodoListItem
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

let TodoCount = 0;

export default function Todo() {
  console.log(`TodoCount 실행 : ${++TodoCount}`);

  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = (newTodoContent: string) => {
    setTodos([...todos, newTodoContent]);
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, _index) => _index !== index);
    setTodos(newTodos);
  };

  return (
    <>
      <NewTodoForm addTodo={addTodo} clearTodos={clearTodos} />
      <NewTodoList todos={todos} removeTodo={removeTodo} />
    </>
  );
}
