import type { AppProps } from 'next/app'


import Head from 'next/head'

import '../styles/globals.css'
import Link from 'next/link'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <li> <Link href={`/`}><a>HOME</a></Link></li>
        <li> <Link href={`/api/auth/signin`}><a>LO+GIN</a></Link></li>
        <li> <Link href={`/api/auth/signout`}><a>logout</a></Link></li>
        <Head >
          <title>boilerplate-nextjs-tailwind-graphql</title>
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
