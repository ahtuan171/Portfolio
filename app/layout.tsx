import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-anton",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Victor — Phạm Anh Tuấn",
  description:
    "Trang giới thiệu cá nhân của Victor (Phạm Anh Tuấn) — sinh viên Công nghệ Thông tin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${anton.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="film-grain">{children}</body>
    </html>
  );
}
