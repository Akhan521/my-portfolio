import { ConsoleChrome } from "@/components/chrome/ConsoleChrome";

/**
 * Shared layout for inner "console" routes (the sections). Renders the
 * persistent ESC/wordmark chrome around each page; the paper background is
 * already global via the Chakra theme.
 */
export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsoleChrome />
      {children}
    </>
  );
}
