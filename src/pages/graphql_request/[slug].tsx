import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import { Get_All_PostsDocument, Get_Post_By_SlugDocument, Get_Post_By_SlugQuery } from "../../graphql/generated";
import { graphQLClient } from "../../lib/graphql_client";


export async function getStaticProps(context: any) {
  const { params } = context
  const slugPost = params.slug
  const dadoRequest = await graphQLClient.request(`
      query ($slugPost: String) {
      posts(filters: { slug: { eq: $slugPost } }) {
        data {
          attributes {
            title
            slug
            content
          }
        }
      }
    }
    `,
    { slugPost }
  )
  // console.log(`aqui vai a slug ---------------- ${slugPost}`)
  return { props: { dadoRequest } }
}

export async function getStaticPaths() {
  const { posts }: Get_Post_By_SlugQuery = await graphQLClient.request(`
    query  {
      posts{
        data{
          attributes{
            slug
          }
        }
      }
    }
  `)
  // console.log(posts?.data[0].attributes?.slug)
  return {
    paths: posts?.data.map((post) => ({
      params: post.attributes
    })),
    fallback: true,
  }
}

const ModeloGraphQL: NextPage = (dadoRequest: any) => {
  console.log(dadoRequest.dadoRequest?.posts.data[0].attributes?.title)
  console.log(dadoRequest.dadoRequest?.posts.data[0].attributes?.title)

  return (
    <>
      <div className='max-w-[900px] mx-auto'>
        <h1 className='text-3xl font-bold my-4'>Modelo GraphQL --- {dadoRequest.dadoRequest?.posts.data[0].attributes?.title} </h1>
        {dadoRequest.dadoRequest?.posts.data[0].attributes?.slug}
        <p>
          {dadoRequest.dadoRequest?.posts.data[0].attributes?.content}
        </p>

      </div>
    </>
  )
}

export default ModeloGraphQL
