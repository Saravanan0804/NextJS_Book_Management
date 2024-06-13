import '../styles/globals.css'

export const metadata = {
  title: 'Book Management',
  description: 'A simple book management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
