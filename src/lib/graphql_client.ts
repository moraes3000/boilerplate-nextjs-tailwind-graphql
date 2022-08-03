import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient('http://localhost:1337/graphql', {
  headers: {
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN}`,
  },
});