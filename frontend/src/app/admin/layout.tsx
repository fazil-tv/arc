"use client"
import { store } from "../../redux/store";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });


// export const metadata: Metadata = {
//   title: "Admin Dashboard",
//   description: "Admin module of the application",
// };



export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} admin-layout`}>
        <Provider store={store}>
          {children}
        </Provider>
        <script src="https://unpkg.com/flowbite@1.4.4/dist/flowbite.js" />
      </body>
    </html>
  );
}
