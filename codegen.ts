import { CodegenConfig } from "@graphql-codegen/cli";

import { environmentVariableConfig } from "./src/config/environmentVariableConfig";

const config: CodegenConfig = {
  schema: [
    {
      [environmentVariableConfig.graphqlAPI]: {
        headers: {
          Authorization: environmentVariableConfig.apiToken,
        },
      },
    },
  ],
  overwrite: true,
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated_graphql__/": {
      preset: "client",
    },
  },
  // Activate the generation even when the scan of document in tsx does
  // NOT contain types (InputObject/types) in the component files
  ignoreNoDocuments: true,
};

export default config;
