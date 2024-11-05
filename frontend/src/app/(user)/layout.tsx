

"use client"
// import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "My Application",
//   description: "User module of the application",
// };

import UserHeader from "@/components/user/usernavbar/usernavbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (

        <div>
            <main>
                <UserHeader />
                {children}
                <Toaster />
                <script src="https://unpkg.com/flowbite@1.4.4/dist/flowbite.js" />
            </main>
        </div>


    );
}
