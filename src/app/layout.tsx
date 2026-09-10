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
        {/* Decides BEFORE first paint whether the boot sequence should play,
            so repeat visitors never see it flash, and gates the hero's typing
            animations (paused until data-booted is set) so they don't run to
            completion underneath the overlay.
            The decision is stashed on `window` as well as the attribute:
            React STRIPS unknown attributes off <html> during hydration, so the
            attribute only survives the pre-paint frame it is needed for, and
            BootOverlay reads the global instead. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var s=false;try{s=sessionStorage.getItem('ak-booted')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){s=true}window.__akSkipBoot=s;if(s){document.documentElement.setAttribute('data-booted','1')}})()",
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
