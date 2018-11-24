import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

const create = initialState =>
  new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: 'http://localhost:3001/graphql',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  })

export default function initApollo(initialState) {
  if (!process.browser) {
    return create(initialState)
  }

  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
