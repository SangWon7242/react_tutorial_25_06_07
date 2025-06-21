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
          <li className="flex gap-x-2 items-center">
            <span>{index + 1}번</span>
            <input
              type="text"
              defaultValue={todo}
              onChange={(e) => (newTodoContentRef.current = e.target.value)}
              className="input input-bordered"
              ref={inputRef}
            />
            <button onClick={modifyTodo} className="btn btn-primary">
              수정
            </button>
            <button
              onClick={cancelEditModeStatus}
              className="btn btn-secondary"
            >
              취소
            </button>
          </li>
        ) : (
          <li className="flex gap-x-2 items-center">
            <span>
              {index + 1}번 : {todo}
            </span>
            <div className="flex gap-x-2">
              <button
                onClick={changeEditModeStatus}
                className="btn btn-warning"
              >
                수정
              </button>
              <button onClick={removeTodo} className="btn btn-error">
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
  }
);

NewTodoList.displayName = "NewTodoList";

export default function Todo() {
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = useCallback(
    (newTodoContent: string) => {
      // const newTodos = [...todos, newTodoContent];

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
    },
    [todos]
  );

  const clearTodos = useCallback(() => {
    setTodos([]);
  }, []);

  const removeTodo = useCallback(
    (index: number) => {
      /*
    const newTodos = todos.filter((_, _index) => _index !== index);
    setTodos(newTodos);
    */

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
    },
    [todos]
  );

  const memoizedTodos = useMemo(() => todos, [todos]);

  return (
    <>
      <NewTodoForm addTodo={addTodo} clearTodos={clearTodos} />
      <NewTodoList
        todos={memoizedTodos}
        removeTodo={removeTodo}
        modifyTodo={modifyTodo}
      />
    </>
  );
}
