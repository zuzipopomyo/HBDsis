import type { Metadata } from "next";
import { Pacifico, Quicksand } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });

export const metadata: Metadata = {
  title: "Happy Birthday 🎂",
  description: "A little birthday surprise",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${pacifico.variable} ${quicksand.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
