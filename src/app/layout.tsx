import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gyandeep Institute | Classes 1st-12th, NEET, IIT-JEE, Sainik & Navodaya Coaching Gwalior",
  description: "Gyandeep Institute — Morar, Gwalior ka premier coaching institute. Classes 1st to 12th (All Streams), NEET, IIT-JEE, Sainik School, Navodaya & Online Education. Baijal Kothi, Morar Gwalior. Call: +917828499519",
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
