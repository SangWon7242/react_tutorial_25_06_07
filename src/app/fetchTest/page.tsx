"use client";

import { useState } from "react";

interface Article {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function FetchTest() {
  const [articles, setArticles] = useState<Article[]>([]);

  // fetch는 promise 객체를 반환한다,
  fetch("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10")
    .then((response) => response.json())
    .then((data) => setArticles(data))
    .catch((error) => console.log(error.message));

  return (
    <>
      <nav>
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
