import React, { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { environmentVariableConfig } from "../config/environmentVariableConfig";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  // The authentication token from env
  const token = environmentVariableConfig.apiToken;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // GraphQL API endpoint
  cache: new InMemoryCache(), // Cache is used for better performance and quick response
});

interface Props {
  children: ReactNode;
}

export const ApolloAppProvider: React.FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
