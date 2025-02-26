import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dobi Dashboard',
  description: 'Real-world asset management dashboard for EV charging infrastructure',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
  icons: [
    { rel: 'preload', url: '/icons/zap-icon1.svg', as: 'image' },
    { rel: 'preload', url: '/icons/zap-icon2.svg', as: 'image' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {children}
        
        {/* Twitter Conversion Tracking Base Code */}
        <Script id="twitter-pixel-base" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','p69la');
          `}
        </Script>

        {/* Twitter Conversion Tracking Event Code */}
        <Script id="twitter-pixel-event" strategy="afterInteractive">
          {`
            twq('event', 'tw-p69la-p69lc', {
              email_address: null // use this to pass a user's email address
            });
          `}
        </Script>
      </body>
    </html>
  )
}
