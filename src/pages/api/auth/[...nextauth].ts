
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { graphQLClient } from "../../../lib/graphql_client";
import { GQL_MUTATION_AUTHENTICATE_USER } from "../../../graphql/query/auth/authenticate_user";

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() { },
    // async decode() { },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Digite o seu e-mail', placeholder: 'Digite o seu e-mail' },
        password: { label: 'Digite sua senha', placeholder: 'Digite sua senha', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const { login } = await graphQLClient.request(GQL_MUTATION_AUTHENTICATE_USER, {
            email: credentials?.email,
            password: credentials?.password
          })


          const { jwt, user } = login;
          const { id, username, email } = user


          if (!jwt || !id || !username || !email) {

            return null
          }

          return {
            jwt, id, name: username, email
          }

        } catch (error) {
          console.log(error)
          return null
        }

      }
    })
  ],
  callbacks: {

    async jwt({ token, account }) {

      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {

      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
})

