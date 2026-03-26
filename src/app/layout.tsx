import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevRev Guide - DevRev Learning Site",
  description: "DevRev公式情報をもとにした学習サイト。13セッションでDevRevの基礎から開発者向け拡張まで体系的に学ぶ。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
