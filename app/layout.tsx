import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Tools",
  description: "Tools to aid musicians",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
