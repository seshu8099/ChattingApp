// @ts-ignore - Quasar wrappers types are missing in this environment
import { boot } from 'quasar/wrappers';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default boot(({ app }: any) => {
  // 1. Tell Apollo where your NestJS backend lives
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  });

  // 2. The Interceptor: Grab the token from LocalStorage and add it to the headers
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('access_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  // 3. Create the actual client
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // 4. Give the client to your Vue app!
  app.provide(DefaultApolloClient, apolloClient);
});
