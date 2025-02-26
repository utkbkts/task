import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/layouts/Header";

const poppinsSans = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={` ${poppinsSans.variable} antialiased`}
      >
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow min-h-screen">{children}</div>
          </div>
      </body>
    </html>
  );
}
