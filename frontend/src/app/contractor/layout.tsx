"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import {store} from "../../redux/store";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

// export const metadata: Metadata = {
//   title: "Contractor Dashboard",
//   description: "Contractor module of the application",
// };

export default function ContractorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ContractorHeader /> */}
        <main>
          <Provider store={store}>
            {children}
          </Provider>
        </main>
        {/* <ContractorFooter /> */}
        <script src="https://unpkg.com/flowbite@1.4.4/dist/flowbite.js"></script>
      </body>
    </html>
  );
}
