import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevRev Guide — Learn DevRev from Official Sources",
  description:
    "A practical learning site based on official DevRev sources. Fourteen sessions from foundations to developer extensions.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
