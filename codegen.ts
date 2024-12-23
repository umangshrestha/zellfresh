import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/server/schema/schema.graphql',
  documents: ['packages/core-client-utils/src/**/*.{ts,tsx}'],
  generates: {
    'packages/core-client-utils/src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        useIndexSignature: true,
      },
      plugins: [],
    },
    'packages/core-client-utils/src/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
