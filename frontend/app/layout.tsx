import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sohne",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-signifier",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TubarberApp",
  description: "Tu barberia, organizada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
