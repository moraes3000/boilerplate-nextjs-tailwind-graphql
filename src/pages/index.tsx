
import Link from 'next/link';

const Home = () => {
  return (
    <div className='max-w-[900px] mx-auto'>
    <h1 className='text-3xl font-bold my-4'>Home</h1>
    <ul>
      <li> <Link href={`/modelo-axios/`}><a>Modelo Axios</a></Link></li>
      <li> <Link href={`/graphql_request/`}><a>GraphQL</a></Link></li>
    </ul>
    </div>
  )
}

export default Home;
