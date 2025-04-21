import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; // ✅ Import

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
    "AustraTax helps Australian residents and business owners estimate taxes return easily. Get accurate tax estimates, deductions, and offsets in a user-friendly way.",
  keywords:
    "Australia tax calculator, PAYG tax, ABN tax calculator, GST, superannuation, tax offsets, deductions, income tax, tax refund estimator",
  icons: "/logo2.png",
  authors: [{ name: "AustraTax", url: "https://austratax.com" }],
  metadataBase: new URL("https://austratax.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
