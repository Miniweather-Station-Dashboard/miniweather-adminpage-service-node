'use client'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { Poppins } from "next/font/google";
import { loadTokensFromStorage } from '@/redux/slices/authSlice'
import { useEffect } from 'react'
import "./globals.css";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export default function RootLayout({ children }) {
  useEffect(() => {
    store.dispatch(loadTokensFromStorage())
  }, [])

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}