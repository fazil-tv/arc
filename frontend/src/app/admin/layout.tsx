"use client"
import type { Metadata } from "next";

 const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin module of the application",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    <main>
      {children}
    </main>
    </div>

  );
}
