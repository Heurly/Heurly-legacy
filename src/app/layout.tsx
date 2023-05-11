import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'Homepage for the website.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
    <nav>
      <Link href="/hub">Hub</Link>
      <Link href="/edt">Emploi du temps</Link>
    </nav>
      <body className={inter.className}>{children}</body>
    </>
  )
}
