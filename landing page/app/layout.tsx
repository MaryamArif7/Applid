import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Applid — Never lose track of an application again",
  description:
    "Applid silently captures every Google Form submission — your answers, timestamps, and status — so you never lose track of where you applied or what you wrote.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
