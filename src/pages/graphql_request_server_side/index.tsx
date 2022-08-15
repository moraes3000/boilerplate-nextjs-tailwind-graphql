import { useSession } from "next-auth/react"
import Link from "next/link"
import { Get_All_PostsDocument, Get_All_PostsQuery } from "../../graphql/generated"
import { graphQLClient } from "../../lib/graphql_client"


export default function Page({ posts }: Get_All_PostsQuery) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {

    return (<>
      <div className='max-w-[900px] mx-auto'>
        <h1>Não autorizado</h1>
      </div>
    </>
    )
  }

  return (
    <>
      <div className='max-w-[900px] mx-auto'>
        <ul>
          {posts ? posts.data.map((post) => (
            <li key={post.attributes?.slug} className='ml-5 list-disc'>
              <Link passHref href={`/graphql_request_server_side/${post.attributes?.slug}`}>
                <a >{post.id} {post.attributes?.title}  </a>
              </Link>
            </li>
          )) : ''}
        </ul>
      </div>
    </>
  )

}

export async function getServerSideProps(context: any) {
  const { posts } = await graphQLClient.request(Get_All_PostsDocument);
  return {
    props: { posts },
  };
}
