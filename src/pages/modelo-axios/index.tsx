import type { NextPage } from 'next'
import axios from 'axios';
import Link from 'next/link';
import { axios_api } from '../../lib/axios_api';
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

const ModeloAxios = ({ posts, error }:any) => {
  // console.log(posts)
  if (error) {
    return <div>Erro ao renderizar: {error.message}</div>;
  }
  return (
    <div className='max-w-[900px] mx-auto'>
      <h1 className='text-3xl font-bold my-4'>Modelo Axios</h1>
      <ul>
        {posts.data.map((post: { id: Key | null | undefined; attributes: { slug: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }; }) => (
          <li key={post.id} className='ml-5 list-disc'>
            <Link href={`/modelo-axios/${post.id}`}>
              <a>{post.attributes.slug}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

ModeloAxios.getInitialProps = async (ctx: any) => {
  const res = await axios_api.get('/api/posts');

  try {
     const posts = res.data;
    return { posts };
  } catch (error) {
    return { error };
  }
};

export default ModeloAxios;

