import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
import Header from '../components/layout/header'
import Navigation from '../components/layout/navigation'
import Footer from '../components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FreshGrocer - Fresh Groceries Delivered',
  description: 'Fresh groceries delivered to your doorstep',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
