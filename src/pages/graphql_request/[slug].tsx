import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import { Get_All_PostsDocument, Get_Post_By_SlugDocument, Get_Post_By_SlugQuery } from "../../graphql/generated";
import { graphQLClient } from "../../lib/graphql_client";


export async function getStaticProps(context: any) {
  const { params } = context
  const slugPost = params.slug
  const dadoRequest = await graphQLClient.request(Get_Post_By_SlugDocument,
    { slugPost }
  )
  // console.log(`aqui vai a slug ---------------- ${slugPost}`)
  return { props: { dadoRequest } }
}

export async function getStaticPaths() {
  const { posts }: Get_Post_By_SlugQuery = await graphQLClient.request(Get_Post_By_SlugDocument)

  return {
    paths: posts?.data.map((post) => ({
      params: post.attributes
    })),
    fallback: true,
  }
}

const ModeloGraphQL: NextPage = (dadoRequest: any) => {


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
