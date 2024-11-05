"use client"

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ContractorLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
        {children}
    </main>
  );
}





