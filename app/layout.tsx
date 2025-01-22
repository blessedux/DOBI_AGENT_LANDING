import "../styles/globals.css"  

export const metadata = {
  title: 'Dobi Agent dashboard',
  description: 'Description of Dobi Agent architecture',
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
