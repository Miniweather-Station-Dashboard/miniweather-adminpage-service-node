import './globals.css'
import { Poppins } from 'next/font/google'
import ReduxProvider from '@/components/ReduxProvider' 

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Miniweather Station Dashboard Panel',
  description: 'A mini weather station dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
