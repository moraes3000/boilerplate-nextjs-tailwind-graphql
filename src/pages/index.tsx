
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';



export default function Home() {
  // const { data: session } = useSession()
  const { data } = useSession()

  console.log(data)
  return (
    <div className='max-w-[900px] mx-auto'>
      <h1 className='text-3xl font-bold my-4'>Home</h1>

      <div>

        {/* <pre>{session && JSON.stringify(session, null, 2)}</pre> */}
        <pre>{data && JSON.stringify(data, null, 2)}</pre>
      </div>

      <ul>
        <li> <Link href={`/modelo-axios/`}><a>Modelo Axios</a></Link></li>
        <li> <Link href={`/graphql_request/`}><a>GraphQL</a></Link></li>
        <li> <Link href={`/graphql_request_server_side/`}><a>graphql_request_server_side</a></Link></li>
      </ul>
    </div>
  )
}
