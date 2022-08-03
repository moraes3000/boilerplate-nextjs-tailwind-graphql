import type { NextPage } from 'next'
import Link from "next/link";
import { Get_All_PostsDocument, Get_All_PostsQuery } from '../graphql/generated';
import { graphQLClient } from '../lib/graphql_client';

export async function getStaticProps() {
  const { posts } = await graphQLClient.request(Get_All_PostsDocument);
  return {
    props: { posts },
  };
}


const Home: NextPage = ({posts}:Get_All_PostsQuery) => {

  return (
  <>
   <h1 className="text-3xl font-bold underline">Hello World</h1>
   <div>
    {posts?posts.data.map((post) => (
    <li key={post.attributes?.slug}>
      <Link  passHref href={post.attributes?.slug}>
        <a>{post.attributes?.title}</a>
      </Link>
    </li>
    )): ''}
   </div>
  </>
  )
}

export default Home
