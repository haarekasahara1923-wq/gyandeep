import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gyandeep Institute | Coaching Center Gwalior",
  description: "Gyandeep Institute — Gwalior ke best coaching center. Baijal Kothi, Near Girls College, In Front of Cantonment Office, Morar Gwalior (MP)-474006. Call: +917828499519",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>
        {children}
      </body>
    </html>
  );
}
