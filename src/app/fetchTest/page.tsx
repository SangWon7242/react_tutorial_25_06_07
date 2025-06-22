"use client";

import { useState, useEffect, useRef } from "react";

interface Article {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function FetchTest() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const changePage = () => {
    if (inputRef.current) {
      const page = Number(inputRef.current.value);

      setPageNo(page);
    }
  };

  // v1
  /*
  useEffect(() => {
    console.log("fetch 실행");

    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNo}&_limit=10`
    )
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.log(error.message));
  }, [pageNo]);
  */

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNo}&_limit=10`
      );

      if (!response.ok) {
        throw new Error("네트워크 응답이 실패했습니다.");
      }

      const data = await response.json();
      setArticles(data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  return (
    <>
      <div>fetchTest</div>
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
        <input className="input input-bordered" type="number" ref={inputRef} />
        <button type="submit" className="btn btn-primary" onClick={changePage}>
          전송
        </button>
      </form>
      <nav className="mt-4">
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.id}>
                <span>{article.id}번 :</span>
                <span>{article.title}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
