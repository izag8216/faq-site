import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'FAQ Site - Your Questions Answered',
  description: 'Find answers to frequently asked questions about our products and services.',
  keywords: 'FAQ, questions, answers, help, support',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className="h-full bg-gray-100">
      <body className="h-full">
        <div className="min-h-full">
          <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/" className="text-xl font-bold text-indigo-600">FAQ Site</Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link href="/" className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900">Home</Link>
                    <Link href="/admin" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Admin</Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}