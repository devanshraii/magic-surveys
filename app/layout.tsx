import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magic Surveys",
  description: "Create surveys instantly with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <main className="flex-grow">{children}</main>

        
        <footer className="w-full bg-slate-100 text-center py-4 border-t text-sm">
          <p>
            Made by <span className="font-semibold">Devansh Rai</span> •{" "}
            <a
              href="https://github.com/devanshraii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>{" "}
            •{" "}
            <a
              href="https://www.linkedin.com/in/devanshraii/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </footer>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
