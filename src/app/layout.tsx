import type { Metadata } from "next";
import { Providers } from "./providers";
import { pixelFont, monoFont } from "./fonts";
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
    <html lang="en" suppressHydrationWarning className={`${pixelFont.variable} ${monoFont.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
