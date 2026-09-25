import type { Metadata } from "next";
import { ReactNode } from "react";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today's plan, and log every set.",
 icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="fitlog" className={oswald.variable}>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Toast notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#ccff00",
                color: "#0b0b0b",
                fontWeight: 600,
                fontSize: "14px",
                borderRadius: "9999px",
                padding: "12px 20px",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}