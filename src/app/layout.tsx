import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "리액트 튜토리얼",
  description: "리액트 튜토리얼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
