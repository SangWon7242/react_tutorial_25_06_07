import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "리액트 튜토리얼",
  description: "리액트 튜토리얼",
};

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 mb-6 sticky top-0 z-10">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <div className="logo">
          <Link
            href="/"
            className="text-xl font-bold text-indigo-700 hover:text-indigo-500 transition-colors duration-200"
          >
            리액트 튜토리얼
          </Link>
        </div>
        <nav className="menu-list flex gap-2">
          <Link
            href="/numberRecord"
            className="px-4 py-2 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200 font-medium"
          >
            숫자 기록 앱
          </Link>
          <Link
            href="/todo"
            className="px-4 py-2 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200 font-medium"
          >
            TODO 앱
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 pb-8">{children}</main>
      </body>
    </html>
  );
}
