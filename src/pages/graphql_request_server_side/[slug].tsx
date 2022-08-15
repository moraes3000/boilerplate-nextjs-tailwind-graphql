import { NextPage } from "next"
import { graphQLClient } from "../../lib/graphql_client"

export async function getServerSideProps(context: any) {
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
  return { props: { dadoRequest } }

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
