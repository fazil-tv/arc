// import type { Metadata } from "next";
"use client"
import { Provider } from 'react-redux';
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "../redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "My Application",
//   description: "User module of the application",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} user-layout`}>
        <GoogleOAuthProvider clientId="1009282809407-sh8h2kgmot2q295a503sl5530pldnaj9.apps.googleusercontent.com">
          <Provider store={store}>
            {children}
            <Toaster />
          </Provider>
          <script src="https://unpkg.com/flowbite@1.4.4/dist/flowbite.js" />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

