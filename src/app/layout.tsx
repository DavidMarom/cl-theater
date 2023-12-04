"use client"
import React, { useEffect } from "react";
import { Inter } from 'next/font/google'
import { Header } from '@/components'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {

  useEffect(() => {
    document.title = "Code:Lovers - David Marom";
    const lsMovies = localStorage.getItem('movies');
    if (!lsMovies) {
      localStorage.setItem('movies', JSON.stringify([]));
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="page-container">
          {children}
        </div>
      </body>
    </html>
  )
}
