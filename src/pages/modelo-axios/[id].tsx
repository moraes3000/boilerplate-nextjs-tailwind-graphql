
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { axios_api } from '../../lib/axios_api';

export const getStaticPaths = async () => {
  const res = await axios_api.get('/api/posts/')
  const dataResponse = await res.data
 // console.log(dataResponse)
  const paths = dataResponse.data.map(( post:any) => {
    return {
      params: { id: post.id.toString() },
    }
  })


  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context:any) => {
  const id = context.params.id
  const res = await axios_api.get(`/api/posts/${id}`)

  const data = await res.data
  // console.log(data)
  return {
    props: { postDetail: data.data.attributes },
  }
}

export default function Detail({ postDetail }:any) {
  // console.log(postDetail)
  return (
    <div>
      <div className='max-w-[900px] mx-auto'>
        <h1 className='text-3xl font-bold my-4'>Modelo Axios</h1>
        <h1> {postDetail.title}</h1>
        <p> {postDetail.slug}</p>
        <p> {postDetail.excerpt}</p>
        <p> {postDetail.content}</p>
        <p> {postDetail.createdAt}</p>
        <p> {postDetail.updatedAt}</p>
        <p> {postDetail.publishedAt}</p>
      </div>
    </div>
  )
}
