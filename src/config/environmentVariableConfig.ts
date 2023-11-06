import { EnvironmentConfig } from "./types";

export const environmentVariableConfig: EnvironmentConfig = {
  graphqlAPI:
    process.env.REACT_APP_GRAPHQL_API || "http://localhost:3001/graphql",
  apiToken:
    process.env.REACT_APP_AUTHORIZATION_API_TOKEN ||
    "ApiKeyca03na188ame03u1d78620de67282882a84",
};
