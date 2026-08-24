import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aamir Khan",
  description: "AI software engineer. Building AI systems and getting them into production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
