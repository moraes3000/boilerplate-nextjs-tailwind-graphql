import axios from 'axios';

export const axios_api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_AXIOS_API}`,
  headers:  {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN}`
  },
});


