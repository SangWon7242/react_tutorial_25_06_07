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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const changePage = () => {
    if (inputRef.current) {
      const page = Number(inputRef.current.value);

      if (page > 10) {
        alert("10이상의 페이지는 존재하지 않습니다.");
        inputRef.current.value = "";
        return;
      }

      if (page > 0) {
        setPageNo(page);
      }
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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-primary mb-6">게시물 목록</h1>

      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-lg mb-2">페이지 이동</h2>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              className="input input-bordered w-full max-w-xs"
              type="number"
              placeholder="페이지 번호 입력"
              min="1"
              max="10"
              ref={inputRef}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={changePage}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  로딩중
                </>
              ) : (
                "이동"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th className="w-24">번호</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                </td>
              </tr>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article.id} className="hover">
                  <td className="font-medium">{article.id}</td>
                  <td className="truncate max-w-md" title={article.title}>
                    {article.title}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-8">
                  게시물이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">현재 페이지: {pageNo}</div>
        <div className="join">
          <button
            className="join-item btn btn-sm"
            onClick={() => setPageNo((prev) => Math.max(1, prev - 1))}
            disabled={pageNo <= 1 || isLoading}
          >
            «
          </button>
          <button className="join-item btn btn-sm">페이지 {pageNo}</button>
          <button
            className="join-item btn btn-sm"
            onClick={() => setPageNo((prev) => prev + 1)}
            disabled={pageNo === 10 || isLoading}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
