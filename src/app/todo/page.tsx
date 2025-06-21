"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { produce } from "immer";

interface NewTodoFormProps {
  addTodo: (newTodoContent: string) => void;
  clearTodos: () => void;
}

const NewTodoForm = React.memo(
  ({ addTodo: _addTodo, clearTodos: _clearTodos }: NewTodoFormProps) => {
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
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row gap-3 mb-8 p-6 bg-white rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="새 할 일 추가를 입력해주세요."
          onChange={(e) => (newTodoContentRef.current = e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          ref={inputRef}
        />
        <div className="flex gap-2">
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            할 일 추가
          </button>
          <button
            onClick={clearTodos}
            className="px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            초기화
          </button>
        </div>
      </form>
    );
  }
);

// 명시적인 표시
NewTodoForm.displayName = "NewTodoForm";

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

const TodoListItem = React.memo(
  ({
    todo,
    index,
    removeTodo: _removeTodo,
    modifyTodo: _modifyTodo,
  }: TodoListItemProps) => {
    const [editModeStatus, setEditModeStatus] = useState<boolean>(false);

    // todo 값을 저장 하기 위해서 사용
    const newTodoContentRef = useRef<string>(todo);

    // input 요소에 접근하기 위해서 사용
    const inputRef = useRef<HTMLInputElement>(null);

    const changeEditModeStatus = () => {
      setEditModeStatus(!editModeStatus);
    };

    const cancelEditModeStatus = useCallback(() => {
      newTodoContentRef.current = todo;
      setEditModeStatus(false);
    }, [todo]);

    const removeTodo = useCallback(() => {
      if (confirm("정말 삭제하시겠습니까?")) {
        _removeTodo(index);
      }
    }, [_removeTodo, index]);

    const modifyTodo = useCallback(() => {
      if (newTodoContentRef.current.trim() === "") {
        alert("할 일 내용을 입력해주세요.");
        return;
      }

      _modifyTodo(index, newTodoContentRef.current);
      setEditModeStatus(false);

      alert("수정이 완료되었습니다.");
    }, [_modifyTodo, index]);

    // 수정 모드가 활성화 되면 input에 포커스
    useEffect(() => {
      if (editModeStatus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editModeStatus]);

    return (
      <>
        {editModeStatus ? (
          <li className="flex flex-col md:flex-row gap-3 items-center p-4 mb-3 bg-white rounded-lg shadow-sm border-l-4 border-yellow-400 transition-all">
            <span className="font-medium text-gray-700 min-w-[50px]">
              {index + 1}번
            </span>
            <input
              type="text"
              defaultValue={todo}
              onChange={(e) => (newTodoContentRef.current = e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              ref={inputRef}
            />
            <div className="flex gap-2 ml-auto">
              <button
                onClick={modifyTodo}
                className="px-3 py-1 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                수정
              </button>
              <button
                onClick={cancelEditModeStatus}
                className="px-3 py-1 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                취소
              </button>
            </div>
          </li>
        ) : (
          <li className="flex flex-col md:flex-row gap-3 items-center p-4 mb-3 bg-white rounded-lg shadow-sm border-l-4 border-blue-400 hover:shadow-md transition-all">
            <span className="font-medium text-gray-700">
              <span className="inline-block min-w-[50px]">{index + 1}번 :</span>{" "}
              {todo}
            </span>
            <div className="flex gap-2 ml-auto mt-2 md:mt-0">
              <button
                onClick={changeEditModeStatus}
                className="px-3 py-1 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                수정
              </button>
              <button
                onClick={removeTodo}
                className="px-3 py-1 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                삭제
              </button>
            </div>
          </li>
        )}
      </>
    );
  }
);

TodoListItem.displayName = "TodoListItem";

const NewTodoList = React.memo(
  ({ todos, removeTodo, modifyTodo }: NewTodoListProps) => {
    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <h1 className="text-xl font-bold text-gray-700">
              할 일이 없습니다.
            </h1>
            <p className="text-gray-500 mt-2">새로운 할 일을 추가해보세요!</p>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
              할 일 목록{" "}
              <span className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
                {todos.length}
              </span>
            </h1>
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
      </div>
    );
  }
);

NewTodoList.displayName = "NewTodoList";

export default function Todo() {
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = useCallback(
    (newTodoContent: string) => {
      setTodos(
        produce(todos, (draft) => {
          draft.push(newTodoContent);
        })
      );
    },
    [todos]
  );

  const clearTodos = useCallback(() => {
    setTodos([]);
  }, []);

  const removeTodo = useCallback(
    (index: number) => {
      setTodos(
        produce(todos, (draft) => {
          draft.splice(index, 1);
        })
      );
    },
    [todos]
  );

  const modifyTodo = useCallback(
    (index: number, inputedTodo: string) => {
      setTodos(
        produce(todos, (draft) => {
          draft[index] = inputedTodo;
        })
      );
    },
    [todos]
  );

  const memoizedTodos = useMemo(() => todos, [todos]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo 앱</h1>
        <p className="text-gray-600">할 일을 관리하고 계획하세요</p>
      </div>
      <NewTodoForm addTodo={addTodo} clearTodos={clearTodos} />
      <NewTodoList
        todos={memoizedTodos}
        removeTodo={removeTodo}
        modifyTodo={modifyTodo}
      />
    </div>
  );
}
