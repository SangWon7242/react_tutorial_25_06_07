"use client";

import { useState, useRef, useEffect } from "react";
import { produce } from "immer";

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

  // input을 조작하기 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);

  // input의 value를 조작하기 위한 ref
  const newTodoContentRef = useRef<string>("");

  // 최초의 한번만 실행
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTodo = () => {
    const currentValue = newTodoContentRef.current;

    if (currentValue.trim() === "") {
      alert("할 일 내용을 입력해주세요.");
      return;
    }

    _addTodo(currentValue);

    if (inputRef.current) {
      inputRef.current.value = "";
      newTodoContentRef.current = "";
    }

    inputRef.current?.focus();
  };

  const clearTodos = () => {
    _clearTodos();

    if (inputRef.current) {
      inputRef.current.value = "";
      newTodoContentRef.current = "";
    }

    inputRef.current?.focus();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
      <input
        type="text"
        placeholder="새 할 일 추가를 입력해주세요."
        onChange={(e) => (newTodoContentRef.current = e.target.value)}
        className="input input-bordered"
        ref={inputRef}
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
  modifyTodo: (index: number, inputedTodo: string) => void;
}

interface TodoListItemProps {
  todo: string;
  index: number;
  removeTodo: (index: number) => void;
  modifyTodo: (index: number, inputedTodo: string) => void;
}

const TodoListItem = ({
  todo,
  index,
  removeTodo: _removeTodo,
  modifyTodo: _modifyTodo,
}: TodoListItemProps) => {
  const [editModeStatus, setEditModeStatus] = useState<boolean>(false);
  const [inputedTodo, setInputedTodo] = useState<string>(todo);

  const changeEditModeStatus = () => {
    setEditModeStatus(!editModeStatus);
  };

  const cancelEditModeStatus = () => {
    setInputedTodo(todo);
    setEditModeStatus(false);
  };

  const removeTodo = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      _removeTodo(index);
    }
  };

  const modifyTodo = () => {
    _modifyTodo(index, inputedTodo);
    setEditModeStatus(false);

    alert("수정이 완료되었습니다.");
  };

  return (
    <>
      {editModeStatus ? (
        <li className="flex gap-x-2 items-center">
          <span>{index + 1}번</span>
          <input
            type="text"
            value={inputedTodo}
            onChange={(e) => setInputedTodo(e.target.value)}
            className="input input-bordered"
          />
          <button onClick={modifyTodo} className="btn btn-primary">
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

const NewTodoList = ({ todos, removeTodo, modifyTodo }: NewTodoListProps) => {
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
                modifyTodo={modifyTodo}
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
    const newTodos = [...todos, newTodoContent];

    /*
    const newTodos = produce(todos, (draft) => {
      draft.push(newTodoContent);
    });

    setTodos(newTodos);
    */

    setTodos(
      produce(todos, (draft) => {
        draft.push(newTodoContent);
      })
    );
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const removeTodo = (index: number) => {
    /*
    const newTodos = todos.filter((_, _index) => _index !== index);
    setTodos(newTodos);
    */

    setTodos(
      produce(todos, (draft) => {
        draft.splice(index, 1);
      })
    );
  };

  const modifyTodo = (index: number, inputedTodo: string) => {
    /*
    const newTodos = todos.map((todo, _index) =>
      _index === index ? inputedTodo : todo
    );

    setTodos(newTodos);
    */

    setTodos(
      produce(todos, (draft) => {
        draft[index] = inputedTodo;
      })
    );
  };

  return (
    <>
      <NewTodoForm addTodo={addTodo} clearTodos={clearTodos} />
      <NewTodoList
        todos={todos}
        removeTodo={removeTodo}
        modifyTodo={modifyTodo}
      />
    </>
  );
}
