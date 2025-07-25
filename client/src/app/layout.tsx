/* eslint-disable @next/next/no-page-custom-font */
import { ErrorProvider } from "@/context/error.context";
import "@/styles/base/globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
  preload: true,
  fallback: ["Helvetica", "Arial", "sans-serif"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Okandev Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.className}>
      <body>
        <ErrorProvider>{children}</ErrorProvider>
      </body>
    </html>
  );
}
