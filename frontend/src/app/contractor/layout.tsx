"use client"
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import {store} from "../../redux/store";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";



export default function ContractorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ContractorHeader /> */}
   
          <Provider store={store}>
            {children}
          </Provider>
   
        {/* <ContractorFooter /> */}
        <script src="https://unpkg.com/flowbite@1.4.4/dist/flowbite.js"></script>
      </body> 
    </html>
  );
}
