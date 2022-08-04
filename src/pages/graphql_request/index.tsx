import type { NextPage } from 'next'
import Link from "next/link";
import { Get_All_PostsDocument, Get_All_PostsQuery } from '../../graphql/generated';
import { graphQLClient } from '../../lib/graphql_client';


export async function getStaticProps() {
  const { posts } = await graphQLClient.request(Get_All_PostsDocument);
  return {
    props: { posts },
  };
}


const ModeloGraphQL: NextPage = ({posts}:Get_All_PostsQuery) => {

  return (
  <>
   <div className='max-w-[900px] mx-auto'>
    <h1 className='text-3xl font-bold my-4'>Modelo GraphQL</h1>
    <ul>
      {posts?posts.data.map((post) => (
      <li key={post.attributes?.slug} className='ml-5 list-disc'>
        <Link  passHref href={`${post.id}`}>
          <a >{post.id} {post.attributes?.title}  </a>
        </Link>
      </li>
      )): ''}
    </ul>
   </div>
  </>
  )
}

export default ModeloGraphQL
