import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AustraTax",
  description:
    "AustraTax helps Australian residents and business owners calculate taxes easily. Get accurate tax estimates, deductions, and offsets in a user-friendly way.",
  keywords:
    "Australia tax calculator, PAYG tax, ABN tax calculator, GST, superannuation, tax offsets, deductions, income tax, tax refund estimator",
  icons: "/logo2.png",
  author: "AustraTax",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
