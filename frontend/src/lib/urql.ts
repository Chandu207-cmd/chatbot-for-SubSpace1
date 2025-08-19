import { createClient, subscriptionExchange, fetchExchange, cacheExchange } from 'urql'
import { nhost } from './nhost'
import { createClient as createWS, Client } from 'graphql-ws'

let wsClient: Client | null = null

export const urqlClient = () => {
  if (!wsClient) {
    wsClient = createWS({
      url: import.meta.env.VITE_HASURA_GRAPHQL_WS,
      connectionParams: async () => {
        const session = nhost.auth.getSession()
        const token = session?.accessToken || (await nhost.auth.getAccessToken())
        return { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      },
    })
  }

  return createClient({
    url: import.meta.env.VITE_HASURA_GRAPHQL_URL,
    fetchOptions: async () => {
      const token = await nhost.auth.getAccessToken()
      return { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    },
    exchanges: [
      cacheExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(request) {
          return {
            subscribe: (sink) => ({ unsubscribe: wsClient!.subscribe(request, sink) }),
          }
        },
      }),
    ],
  })
}
