import '@/styles/globals.css'
import { Analytics } from "@vercel/analytics/react"
import { Montserrat } from '@next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '400',
})

export default function App({ Component, pageProps }) {
  return  (
    <main className={montserrat.className}>
      <Analytics />
      <Component {...pageProps} />
    </main>
  )
}
