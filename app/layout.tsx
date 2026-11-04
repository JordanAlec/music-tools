import "./globals.css";
import CoreLayout from "./components/layout/core-layout";

export { metadata, viewport } from "./lib/metadata";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <CoreLayout>{children}</CoreLayout>
      </body>
    </html>
  );
}
